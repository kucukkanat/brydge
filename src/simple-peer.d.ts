type SimplePeerOptions = {
    initiator?: boolean;
    trickle?: boolean;
    channelConfig?: RTCConfiguration;
    channelName?: string;
    config?: RTCConfiguration;
    offeroptions?: RTCOfferOptions;
    sdpTransform?: (sdp: string) => string;
    stream?: MediaStream | boolean;
    streams?: MediaStream[];
    allowHalfTrickle?: boolean;
    objectMode?: boolean;
    wrtc?: any;
}

type SimplePeerEvents = "connect" | "signal" | "data" | "stream" | "close" | "error" | "track";

declare module "simple-peer" {
    export default class SimplePeer {
        WEBRTC_SUPPORT: boolean;
        constructor(options: SimplePeerOptions);
        on(event: SimplePeerEvents, callback: (...args: any[]) => void): void;
        signal(data: any): void;
        send(data: any): void;
        destroy(err?: any[]): void;
        addStream(stream: MediaStream): void;
        removeStream(stream: MediaStream): void;
        addTrack(track: MediaStreamTrack, stream: MediaStream): void;
        removeTrack(track: MediaStreamTrack, stream: MediaStream): void;
        replaceTrack(oldTrack: MediaStreamTrack, newTrack: MediaStreamTrack, stream: MediaStream): void;
        addTransceiver(trackOrKind: MediaStreamTrack | string, init?: RTCRtpTransceiverInit): RTCRtpTransceiver;
        removeAllListeners(event?: SimplePeerEvents): void;

    }
}