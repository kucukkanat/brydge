export type URLString = `http://${string}:${number}${string}` | `https://${string}:${number}${string}`
export type PeerID = string
export type SignalEvents = "offer" | "answer" | "iceCandidate" | "error" | "error" | "connect" | "disconnect"

export const SignalEvents = ["offer", "answer", "iceCandidate", "error", "error", "connect", "disconnect"]
// From property is added on the server side
export type SignalOffer = { to?: PeerID, from?: PeerID, offer: RTCSessionDescriptionInit }
export type SignalAnswer = { to?: PeerID, from?: PeerID, answer: RTCSessionDescriptionInit }
export type SignalIceCandidate = { to?: PeerID, from?: PeerID, iceCandidate: RTCIceCandidateInit }
export type SignalDataType = SignalAnswer | SignalOffer | SignalIceCandidate
