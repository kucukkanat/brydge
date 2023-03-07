import { Emitter } from "subscribe"
import io, { Socket } from "socket.io-client"
import { PeerID, SignalAnswer, SignalDataType, SignalEvents, SignalIceCandidate, SignalOffer, URLString } from "./types"

type SignalingChannelOptions = {
    signalingServerURL: string
}
class SocketIOChannel extends Emitter<SignalEvents> {
    socket: Socket
    ready: boolean
    constructor(options: SignalingChannelOptions) {
        super()
        this.ready = false
        this.socket = io(options.signalingServerURL || "http://localhost:3000")

        this.socket.on("connect", () => {
            this.ready = true
            this.emit("connect")
            console.log(`Connected to signaling server`)
        })
        this.socket.on("disconnect", () => {
            this.ready = false
            this.emit("disconnect")
            console.log(`Disconnected from signaling server`)
        })
        this.socket.on("error", (err: any) => {
            this.ready = false
            console.log(`Error connecting to signaling server:`, err)
            this.emit("error", err)
        })

        // Incoming Signals
        this.socket.on("offer", (data: any) => {
            this.emit("offer", data)
        })
        this.socket.on("answer", (data: any) => {
            this.emit("answer", data)
        })
        this.socket.on("iceCandidate", (data: any) => {
            this.emit("iceCandidate", data)
        })

    }
    send(to: PeerID, event: SignalEvents, data: SignalDataType) {
        console.log(`Signalling: ${JSON.stringify(data)} to ${to}`)
        this.socket.emit(event, { ...data, to } as SignalDataType)
    }

}

export default class Peer extends Emitter {
    connectedPeers: {
        [key: string]: {
            RTCPeerConnection: RTCPeerConnection
            dataChannel: RTCDataChannel
        }
    }
    signalingChannel: SocketIOChannel
    id: string
    constructor(signalingServerURL?: URLString, signallingChannelPlugin?: SocketIOChannel) {
        super()
        this.connectedPeers = {}
        this.signalingChannel = signallingChannelPlugin ||
            new SocketIOChannel({ signalingServerURL: signalingServerURL || "http://localhost:3000" })
        this.addEventListeners()

        this.signalingChannel.on("connect", () => {
            this.id = this.signalingChannel.socket.id
            console.log(this)
        })
    }
    // Connects to a peer with given peerID
    async connect(peerID: PeerID) {
        // Wait for signaling channel connect
        if (this.signalingChannel.ready === false) {
            console.log(`Waiting for signaling channel to connect`)
            await new Promise((resolve) => {
                this.on("signalingChannelConnected", () => {
                    resolve(null)
                })
            })
        }

        const [connection, dataChannel] = Peer.CreateRTCConnectionWithDataChannel()
        this.connectedPeers[peerID] = {
            RTCPeerConnection: connection,
            dataChannel: dataChannel
        }

        connection.onconnectionstatechange = (event: any) => {
            console.log(`[${this.id}] Connection state changed `, event)
        }

        // Create an offer and send it to the peer
        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)
        console.log(`[${this.id}] offer`, offer, `to ${peerID}`)
        this.signalingChannel.send(peerID, "offer", { offer })
        const _this = this
        connection.onicecandidate = (event: any) => {
            if (event.candidate) {
                console.log(`[${_this.id}] ice candidate`, event.candidate)
                this.signalingChannel.send(peerID, "iceCandidate", { iceCandidate: event.candidate })
            }
        }
        connection.ondatachannel = (event: any) => {
            console.log(`[${this.id}] Data channel`, { event })
        }
        connection.oniceconnectionstatechange = (event: any) => {
            console.log(`[${this.id}] Ice connection state change`, { event })
        }
        connection.onicegatheringstatechange = (event: any) => {
            console.log(`[${this.id}] Ice gathering state change`, { event })
        }
        connection.onnegotiationneeded = (event: any) => {
            console.log(`[${this.id}] Negotiation needed`, { event })
        }
        connection.ontrack = (event: any) => {
            console.log(`[${this.id}] Track`, { event })
        }

        return this.connectedPeers[peerID]

    }

    addEventListeners() {
        // When a peer sends us an offer, 
        // Create a new RTCPeerConnection, create and send an answer
        this.signalingChannel.on("offer", async (data: SignalOffer) => {
            const [connection, dataChannel] = Peer.CreateRTCConnectionWithDataChannel()
            console.log(`[${this.id}] Received offer`, data.offer, `from ${data.from}`)
            await connection.setRemoteDescription(data.offer)

            const answer = await connection.createAnswer()
            await connection.setLocalDescription(answer)
            console.log(`[${this.id}] Answer`, answer, `to ${data.from}`)
            this.signalingChannel.send(data.from, "answer", { answer })

            this.connectedPeers[data.from] = {
                RTCPeerConnection: connection,
                dataChannel: dataChannel
            }
        })
        this.signalingChannel.on("answer", async (data: SignalAnswer) => {
            await this.connectedPeers[data.from].RTCPeerConnection.setRemoteDescription(data.answer)
        })
        this.signalingChannel.on("iceCandidate", async (data: SignalIceCandidate) => {
            await this.connectedPeers[data.from].RTCPeerConnection.addIceCandidate(data.iceCandidate)
        })
    }
    static CreateRTCConnectionWithDataChannel(opts?: RTCConfiguration, datachannelName: string = "peer-data-channel"): [RTCPeerConnection, RTCDataChannel] {
        const connection = new RTCPeerConnection(opts)
        const dataChannel = connection.createDataChannel(datachannelName)
        connection.ondatachannel = (event: any) => {
            console.log("Data channel", { event })
        }
        dataChannel.onopen = (event: any) => {
            console.log("Data channel opened", { event })
        }
        dataChannel.onerror = (event: any) => {
            console.log("Data channel error", { event })
        }
        dataChannel.onclose = (event: any) => {
            console.log("Data channel closed", { event })
        }
        function SpitState() {
            console.log(`Connection state = `, connection.connectionState)
            setTimeout(() => {
                SpitState()
            }, 1000)
        }
        SpitState()

        return [connection, dataChannel]
    }

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

// export class Peer extends Emitter {
//     ready: boolean
//     socket: Socket
//     errors: any[]
//     // todo: add a type for this
//     connectedPeers: {
//         [key: string]: RTCPeerConnection
//     }
//     constructor(options: PeerOptions) {
//         super()

//         this.ready = false
//         this.errors = []
//         this.connectedPeers = {}
//         this.socket = io(options.signalingServerURL || "http://localhost:3000")
//         this.socketHandler(this.socket)

//         // If a WebRTC Connection is attempted from another peer
//         this.on("remoteDescription", async ({ data, from }: { data: RTCSessionDescriptionInit, from: string }) => {
//             // Create an RTCPeerConnection
//             this.connectedPeers[from] = new RTCPeerConnection();
//             this.connectedPeers[from].createDataChannel("brydge")
//             this.connectedPeers[from].onconnectionstatechange = (event: any) => {
//                 console.log(`Connection state changed [${from}]`, event)
//             }
//             console.log("Got remote description", data)
//             this.connectedPeers[from].setRemoteDescription(data)

//             const answer = await this.connectedPeers[from].createAnswer()
//             this.connectedPeers[from].setLocalDescription(answer)
//             this.send(from, 'answer', answer)

//             // Start exchanging ICE candidates
//             this.connectedPeers[from].onicecandidate = (event: any) => {
//                 console.log("Ice candidate", { event })
//                 if (event.candidate) {
//                     console.log("ice candidate", event.candidate)
//                     this.send(from, 'remoteIceCandidate', event.candidate)
//                 }
//             }
//         })

//         this.on("remoteIceCandidate", ({ data, from }: { data: RTCIceCandidate, from: string }) => {
//             console.log("Got remote ice candidate", data)
//             this.connectedPeers[from].addIceCandidate(data)
//         })
//     }

//     async connectPeer(peerID: string) {
//         console.log(`Connecting to peer ${peerID}`)
//         this.connectedPeers[peerID] = new RTCPeerConnection();
//         this.connectedPeers[peerID].createDataChannel("brydge")
//         this.connectedPeers[peerID].onconnectionstatechange = (event: any) => {
//             console.log(`Connection state changed [${peerID}]`, event)
//         }
//         // Create offer
//         const offer = await this.connectedPeers[peerID].createOffer()
//         this.connectedPeers[peerID].setLocalDescription(offer)
//         console.log("Got local description. \nOffer:", offer)

//         // Send local description to the other peer
//         this.send(peerID, 'remoteDescription', offer)
//         // Wait for the answer
//         this.on("answer", async ({ data }: { data: RTCSessionDescriptionInit }) => {
//             console.log("Got answer", data)
//             this.connectedPeers[peerID].setRemoteDescription(data)
//         })

//         // Exchange ICE candidates
//         this.connectedPeers[peerID].onicecandidate = (event: any) => {
//             console.log({ event })
//             if (event.candidate) {
//                 console.log("ice candidate", event.candidate)
//                 this.send(peerID, 'remoteIceCandidate', event.candidate)
//             }
//         }

//     }

//     socketHandler(socket: Socket) {
//         // When a signal comes in, emit it as an event if allowed
//         this.socket.on("signal", ({ from, event, data }) => {
//             if (allowedRemoteTriggeredEvents.includes(event)) {
//                 this.emit(event, { from, data })
//             }
//         })

//         this.socket.on("connect", () => {
//             this.ready = true
//             console.log("Connected to signaling server")
//         })
//         this.socket.on("disconnect", () => {
//             this.ready = false
//             console.log("Disconnected from signaling server")
//         })
//         this.socket.on("error", (error) => {
//             this.ready = false
//             this.errors.push(error)
//             console.error(error)
//         })
//     }

//     // Emit an event remotely to another Peer
//     send(peerID: string, event: string, data: any) {
//         this.socket.emit("signal", { to: peerID, event, data })
//     }
//     p2pSend(peerID: string, data: any) {
//         this.connectedPeers[peerID].send(data)
//     }
// }