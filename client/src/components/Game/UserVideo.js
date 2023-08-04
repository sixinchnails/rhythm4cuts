import React, { useEffect, useRef } from "react";
import { Session } from "openvidu-browser";

function UserVideo({ token, streamId }) {
    const videoRef = useRef(null);
    const sessionRef = useRef(null);
    const subscriberRef = useRef(null);

    useEffect(() => {
        const session = new Session();
        sessionRef.current = session;

        session.connect(token)
            .then(() => {
                const subscriber = session.subscribe(streamId, videoRef.current);
                subscriberRef.current = subscriber;
            })
            .catch((error) => {
                console.error("오픈비두 연결 실패:", error);
            });

        return () => {
            if (subscriberRef.current) {
                sessionRef.current.unsubscribe(subscriberRef.current);
            }
            if (sessionRef.current) {
                sessionRef.current.disconnect();
            }
        };
    }, [token, streamId]);

    return <video ref={videoRef} autoPlay playsInline />;
}

export default UserVideo;
