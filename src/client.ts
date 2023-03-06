import { Emitter } from "./utils"
import io, { Socket } from "socket.io-client"

type PeerOptions = {
    signalingServerURL: `http://${string}:${number}` | `https://${string}:${number}`
}
type ConnectedPeerMap = {
    [key: string]: any
}

// These are the events that can be triggered by the remote peer
const allowedRemoteTriggeredEvents = [
    "answer",
    "remoteDescription",
    "remoteIceCandidate"
]

export class Peer extends Emitter {
    ready: boolean
    socket: Socket
    errors: any[]
    // todo: add a type for this
    connectedPeers: ConnectedPeerMap
    constructor(options: PeerOptions) {
        super()

        this.ready = false
        this.errors = []
        this.connectedPeers = []
        this.socket = io(options.signalingServerURL || "http://localhost:3000")
        this.socketHandler(this.socket)

        // If a WebRTC Connection is attempted from another peer
        this.on("remoteDescription", async ({ data, from }: { data: RTCSessionDescriptionInit, from: string }) => {
            // Create an RTCPeerConnection
            this.connectedPeers[from] = new RTCPeerConnection();
            this.connectedPeers[from].createDataChannel("brydge")
            this.connectedPeers[from].onconnectionstatechange = (event: any) => {
                console.log(`Connection state changed [${from}]`, event)
            }
            console.log("Got remote description", data)
            this.connectedPeers[from].setRemoteDescription(data)

            const answer = await this.connectedPeers[from].createAnswer()
            this.connectedPeers[from].setLocalDescription(answer)
            this.send(from, 'answer', answer)

            // Start exchanging ICE candidates
            this.connectedPeers[from].onicecandidate = (event: any) => {
                console.log("Ice candidate", { event })
                if (event.candidate) {
                    console.log("ice candidate", event.candidate)
                    this.send(from, 'remoteIceCandidate', event.candidate)
                }
            }
        })

        this.on("remoteIceCandidate", ({ data, from }: { data: RTCIceCandidate, from: string }) => {
            console.log("Got remote ice candidate", data)
            this.connectedPeers[from].addIceCandidate(data)
        })
    }

    async connectPeer(peerID: string) {
        console.log(`Connecting to peer ${peerID}`)
        this.connectedPeers[peerID] = new RTCPeerConnection();
        this.connectedPeers[peerID].createDataChannel("brydge")
        this.connectedPeers[peerID].onconnectionstatechange = (event: any) => {
            console.log(`Connection state changed [${peerID}]`, event)
        }
        // Create offer
        const offer = await this.connectedPeers[peerID].createOffer()
        this.connectedPeers[peerID].setLocalDescription(offer)
        console.log("Got local description. \nOffer:", offer)

        // Send local description to the other peer
        this.send(peerID, 'remoteDescription', offer)
        // Wait for the answer
        this.on("answer", async ({ data }: { data: RTCSessionDescriptionInit }) => {
            console.log("Got answer", data)
            this.connectedPeers[peerID].setRemoteDescription(data)
        })

        // Exchange ICE candidates
        this.connectedPeers[peerID].onicecandidate = (event: any) => {
            console.log({ event })
            if (event.candidate) {
                console.log("ice candidate", event.candidate)
                this.send(peerID, 'remoteIceCandidate', event.candidate)
            }
        }

    }

    socketHandler(socket: Socket) {
        // When a signal comes in, emit it as an event if allowed
        this.socket.on("signal", ({ from, event, data }) => {
            if (allowedRemoteTriggeredEvents.includes(event)) {
                this.emit(event, { from, data })
            }
        })

        this.socket.on("connect", () => {
            this.ready = true
            console.log("Connected to signaling server")
        })
        this.socket.on("disconnect", () => {
            this.ready = false
            console.log("Disconnected from signaling server")
        })
        this.socket.on("error", (error) => {
            this.ready = false
            this.errors.push(error)
            console.error(error)
        })
    }

    // Emit an event remotely to another Peer
    send(peerID: string, event: string, data: any) {
        this.socket.emit("signal", { to: peerID, event, data })
    }
    p2pSend(peerID: string, data: any) {
        this.connectedPeers[peerID].send(data)
    }
}