// https://github.com/divanov11/PeerChat
import { Emitter } from "subscribe"
import io, { Socket } from "socket.io-client"
import { PeerID } from "./types"

export class Peer extends Emitter {
    rtcConnections: { [key: string]: { connection: RTCPeerConnection, dataChannel: RTCDataChannel } }
    id: string
    socket: Socket
    ready: boolean
    constructor(signalingServerURL:string) {
        super()
        this.ready = false

        // Connect to signaling server
        this.socket = io(signalingServerURL || "http://localhost:3000")
        this.socket.on("connect", () => {
            // Acquire ID
            this.id = this.socket.id
            this.emit("ready")
            this.ready = true
        })
        this.addEventListeners()
    }
    async connect(peerID: PeerID) {
        // Wait until ready if note ready
        if (!this.ready) {
            await new Promise(resolve => this.once("ready", () => {
                console.log(`Peer not ready yet, waiting for ready event`)
                resolve(null)
            }))
        }

        // Create a new RTCPeerConnection        
        const connection = new RTCPeerConnection()
        connection.addEventListener("open", () => {
            console.log(`Connection opened for ${peerID}`)
        })
        const dataChannel = connection.createDataChannel("dataChannel")

        // Create an offer 
        console.log(`Creating offer for ${peerID}`)
        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)
        
        // Start collecting ICE Candidates (NO Trickle because trickle is Tricky!)
        const iceCandidates: RTCIceCandidate[] = []
        connection.onicecandidate = (event) => {
            if (event.candidate) {
                iceCandidates.push(event.candidate)
            } else {
                console.log(`All ice candidates for ${peerID} collected`)
                this.signal(peerID, { iceCandidates, offer })
            }
        }

        // Wait for answer
        console.log(`Waiting for answer from ${peerID}`)
        this.socket.on("answer", async (data: any) => {
            const { to, from, answer } = data
            if (to === this.id) {
                console.log(`Answer received from ${peerID}. Setting remote description.`)
                await connection.setRemoteDescription(answer)
            }
        })

        connection.ondatachannel = (event) => {
            event.channel.onmessage = (event) => {
                console.log(`Received message from ${peerID}: ${event.data}`)
                this.emit(`Hi we have an established connection! I am ${this.id}`, event.data)
            }
        }

        // Add to this.rtcConnections if successful
        this.rtcConnections[peerID] = {
            connection,
            dataChannel
        }
    }
    addEventListeners() {
        // Listen for incoming signals
        console.log(`Listening for incoming signals`)
        this.socket.on("signal", async (data: any) => {
            const { to, from, offer, answer, iceCandidate } = data
            if (to === this.id) {
                if (offer) {
                    await this.handleOffer(from, offer)
                } else if (answer) {
                    await this.handleAnswer(from, answer)
                } else if (iceCandidate) {
                    await this.handleIceCandidate(from, iceCandidate)
                }
            }
        })
    }
    async handleOffer(peerID: PeerID, offer: RTCSessionDescriptionInit) {
        const connection = new RTCPeerConnection()
        const dataChannel = connection.createDataChannel("dataChannel")
        console.log(`Offer received from ${peerID}. Creating answer.`)
        await connection.setRemoteDescription(offer)
        const answer = await connection.createAnswer()
        await connection.setLocalDescription(answer)
        this.signal(peerID, { answer })

        connection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(`Sending ice candidate to ${peerID}`)
                this.signal(peerID, { iceCandidate: event.candidate })
            }
        }
        connection.ondatachannel = (event) => {
            event.channel.onmessage = (event) => {
                console.log(`Datachannel created and message received from ${peerID}: ${event.data}`)
            }
        }

        // Add to this.rtcConnections if successful
        this.rtcConnections[peerID] = {
            connection,
            dataChannel
        }
    }
    async handleAnswer(peerID: PeerID, answer: RTCSessionDescriptionInit) {
        console.log(`Answer received from ${peerID}. Setting remote description.`)
        await this.rtcConnections[peerID].connection.setRemoteDescription(answer)
    }

    async handleIceCandidate(peerID: PeerID, iceCandidate: RTCIceCandidate) {
        console.log(`Ice candidate received from ${peerID}. Adding ice candidate.`)
        await this.rtcConnections[peerID].connection.addIceCandidate(iceCandidate)
    }

    signal(peerID: PeerID, data: any) {
        this.socket.emit("signal", { to: peerID, ...data })
    }

}