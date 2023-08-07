import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';

function UserVideo({ roomSession, userToken }) {


    const videoRef = useRef();
    // const roomSession = useSelector(state => state.roomState.session);
    // const userToken = useSelector(state => state.roomState.connectionToken);

    console.log('Props로 전달받은 roomSession:', roomSession);
    console.log('Props로 전달받은 userToken:', userToken);
    // console.log('리덕스에 담긴 roomSession:', roomSession);
    // console.log('리덕스에 담긴 userToken:', userToken);

    useEffect(() => {
        if (!roomSession || !userToken) {
            return;
        }

        const OV = new OpenVidu();
        const session = OV.initSession();

        session.on('streamCreated', (event) => {
            console.log('Stream created:', event.stream);
            session.subscribe(event.stream, videoRef.current);
        });

        session.on('streamDestroyed', (event) => {
            console.log('Stream destroyed:', event.stream);
        });

        session.connect(userToken)
            .then(() => {
                let publisher;
                try {
                    publisher = OV.initPublisher(videoRef.current);
                    session.publish(publisher);
                } catch (error) {
                    console.error('퍼블리셔 초기화 실패:', error);
                    return;
                }

                publisher.on('streamCreated', (event) => {
                    console.log('Publisher stream created:', event.stream);
                });

                publisher.on('streamDestroyed', (event) => {
                    console.log('Publisher stream destroyed:', event.stream);
                });
            })
            .catch(error => {
                console.error('OpenVidu 세션 연결 실패: ', error);
            });

        return () => {
            session.disconnect();
        };
    }, [roomSession, userToken]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <video ref={videoRef} autoPlay={true} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default UserVideo;
