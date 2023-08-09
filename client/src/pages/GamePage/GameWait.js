import { OpenVidu } from 'openvidu-browser';

import React, { Component, useState, useEffect } from 'react';
import UserVideoComponent from '../../components/Game/UserVideoComponent';

import { createConnection } from '../../openvidu/connectionInitialization';
import { useDispatch, useSelector } from "react-redux";
import { setSession, resetRoomState } from "../../store";
import { useParams } from "react-router-dom";
import { getCookie } from "../../utils/cookie";


import axios from "axios";



function GameWait() {
    var { gameSeq } = useParams();
    var dispatch = useDispatch();

    const session = useSelector(state => state.roomState.session);
    const token_ub = useSelector(state => state.roomState.connectionToken);
    
    const [mySessionId, setMySessionId] = useState('SessionA');
    const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
        };
    }, []);

    const onBeforeUnload = () => {
        leaveSession();
    };

    const handleChangeSessionId = (e) => {
        setMySessionId(e.target.value);
    };

    const handleChangeUserName = (e) => {
        setMyUserName(e.target.value);
    };

    const handleMainVideoStream = (stream) => {
        if (mainStreamManager !== stream) {
            setMainStreamManager(stream);
        }
    };

    const deleteSubscriber = (streamManager) => {
        const newSubscribers = subscribers.filter(sub => sub !== streamManager);
        setSubscribers(newSubscribers);
    };

    const joinSession = async () => {
        try {
            const ov = new OpenVidu();
            const newSession = ov.initSession();
            setSession(newSession);

            newSession.on('streamCreated', (event) => {
                const subscriber = newSession.subscribe(event.stream, undefined);
                setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
            });

            newSession.on('streamDestroyed', (event) => {
                deleteSubscriber(event.stream.streamManager);
            });

            newSession.on('exception', (exception) => {
                console.warn(exception);
            });

            const token = await getToken(); // Implement getToken function

            console.log("-----------------token : " + token);
            newSession.connect(token, { clientData: myUserName })
                .then(async () => {
                    const newPublisher = await ov.initPublisherAsync(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: true,
                        publishVideo: true,
                        resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    });

                    newSession.publish(newPublisher);

                    const devices = await ov.getDevices();
                    const videoDevices = devices.filter(device => device.kind === 'videoinput');
                    const currentVideoDeviceId = newPublisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                    const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                    setMainStreamManager(newPublisher);
                    setPublisher(newPublisher);
                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error.code, error.message);
                });
        } catch (error) {
            console.error('Error joining session:', error);
        }
    };

    async function getToken() {
        let res = await fetchConnectionToken()
        console.log(res);
        console.log(res["connectionToken"])
        return res["connectionToken"]
    }

    async function fetchConnectionToken() {
        try {
            await fetchSession();

            return await createConnection();
        } catch(error) {
            console.error("연결 토큰을 가져오는데 실패하였습니다:", error);
        }
    }

    async function fetchSession() {
        try {
            const access = getCookie("access");
            
            const response = await axios.get(
                `https://i9b109.p.ssafy.io:8443/wait/info/${gameSeq}`,
                {
                    headers: {
                        Authorization: "Bearer " + access,
                    },
                }
            )
            console.log("-----------------"+response.data.data.sessionId);
            dispatch(setSession(response.data.data.sessionId));
        } catch(error) {
            console.error("DB에서 세션 id 불러오기 실패:", error);
        }
    }

    const leaveSession = () => {
        if (session) {
            session.disconnect();
        }

        setSession(undefined);
        setSubscribers([]);
        setMySessionId('SessionA');
        setMyUserName('Participant' + Math.floor(Math.random() * 100));
        setMainStreamManager(undefined);
        setPublisher(undefined);
    };

    return (
        <div className="container">
            {!session ? (
                <div>
                    <button onClick={joinSession}>Join Session</button>
                </div>
            ) : null}
            {session ? (
                <div id="session">
                    <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="Leave session"
                        />
                        {/* <input
                            className="btn btn-large btn-success"
                            type="button"
                            id="buttonSwitchCamera"
                            onClick={switchCamera}
                            value="Switch Camera"
                        /> */}
                    </div>

                    {mainStreamManager ? (
                        <div id="main-video" className="col-md-6">
                            <UserVideoComponent streamManager={mainStreamManager} />
                        </div>
                    ) : null}
                    <div id="video-container" className="col-md-6">
                        {publisher ? (
                            <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                                <UserVideoComponent streamManager={publisher} />
                            </div>
                        ) : null}
                        {subscribers.map((sub, i) => (
                            <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                                <span>{sub.id}</span>
                                <UserVideoComponent streamManager={sub} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default GameWait;






