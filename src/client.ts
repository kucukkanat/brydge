// https://github.com/divanov11/PeerChat
import { Emitter } from "subscribe"
import io, { Socket } from "socket.io-client"
import { PeerID } from "./types"

export class Peer extends Emitter {
    rtcConnections: { [key: string]: { connection: RTCPeerConnection, dataChannel: RTCDataChannel } }
    id: string
    socket: Socket
    ready: boolean
    peerConnections: { [key: string]: RTCPeerConnection }
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
        this.waitForOffers()
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
        const dataChannel = connection.createDataChannel("dataChannel")

        // Create an offer 
        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)
        // Collect ice candidates
        const iceCandidates: RTCIceCandidate[] = []
        connection.addEventListener("icecandidate", (event) => {
            if (event.candidate) {
                iceCandidates.push(event.candidate)
            } else {
                console.log(`All ice candidates for ${peerID} collected sending offer`)
                this.socket.emit("offer", { to: peerID, offer, iceCandidates })
            }
        })
        dataChannel.onmessage = (event) => {
            console.log(`Received message from ${peerID}: ${event.data}`)
        }

        connection.addEventListener("open", () => {
            console.log(`Connection opened for ${peerID}`)
        })

        dataChannel.addEventListener("open", () => {
            console.log(`Data channel opened for ${peerID}`)
            dataChannel.send("Hello from " + this.id)
        })
        
        // Wait for answer
        let _this = this
        function waitForAnswer(){
            console.log(`Waiting for answer from ${peerID}`)
            _this.socket.once("answer", async (data: any) => {
                const { from, answer, iceCandidates } = data
                if (from === peerID) {
                    console.log(`Answer received from ${peerID}. Setting remote description.`)
                    await connection.setRemoteDescription(answer)
                    iceCandidates.forEach( (iceCandidate: RTCIceCandidate) => {
                        console.log(`Adding ice candidate from ${peerID}`)
                        connection.addIceCandidate(iceCandidate)
                    })
                } else {
                    waitForAnswer()
                }
            })
        }
        waitForAnswer()

    }
    waitForOffers() {
        // Listen for incoming signals
        console.log(`Listening for incoming signals`)
        this.socket.on("offer", async (data: any) => {
            const { from, offer, iceCandidates } = data
            console.log(`Received offer from ${from}`, {data})
            const connection = new RTCPeerConnection()
            
            await connection.setRemoteDescription(offer)
            const answer = await connection.createAnswer()
            await connection.setLocalDescription(answer)
            console.log(`Answer created for ${from}`)

            const myIceCandidates: RTCIceCandidate[] = []
            // Collect ice candidates
            connection.onicecandidate = (event) => {
                if (event.candidate) {
                    myIceCandidates.push(event.candidate)
                } else {
                    console.log(`All ice candidates for ${from} collected sending answer`)
                    this.socket.emit("answer", {to: from, iceCandidates:myIceCandidates, answer })
                }
            }

            // Event listeners
            connection.ondatachannel = (event) => {
                console.log(`Data channel opened for ${from}`)
                event.channel.onmessage = (event) => {
                    console.log(`Received message from ${from}: ${event.data}`)
                }
            }
            connection.addEventListener("open", () => {
                console.log(`Connection opened for ${from}`)
            }
            )
            iceCandidates.forEach( (iceCandidate: RTCIceCandidate) => {
                console.log(`Adding ice candidate from ${from}`)
                connection.addIceCandidate(iceCandidate)
            }
            )
            
            
        })
    }
    

}