// sessionInitialization.js
import axios from "axios";

const OPENVIDU_SERVER_URL = "https://i9b109.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "zlwhsalsrnrWid1234";

export const createSession = async (gameSeq) => {
    try {
        const response = await axios.post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
            { customSessionId: gameSeq },
            {
                headers: {
                    Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
                    "Content-Type": "application/json",
                },
                body: {
                    "mediaMode": "ROUTED",
                    "recordingMode": "MANUAL",
                    // "customSessionId": session,
                    "forcedVideoCodec": "VP8",
                    "allowTranscoding": false,
                    "defaultRecordingProperties": {
                        "name": gameSeq,
                        "hasAudio": true,
                        "hasVideo": true,
                        "outputMode": "COMPOSED",
                        "recordingLayout": "BEST_FIT",
                        "resolution": "1280x720",
                        "frameRate": 25,
                        "shmSize": 536870912,
                        "mediaNode": {
                            "id": "media_i-0c58bcdd26l11d0sd"
                        }
                    },
                    "mediaNode": {
                        "id": "media_i-0c58bcdd26l11d0sd"
                    }
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 흐름을 일시적으로 중단시킬 가능성 있으니 조심.
console.log(atob(btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)))
