// sessionInitialization.js
import axios from "axios";

const OPENVIDU_SERVER_URL = "https://i9b109.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "zlwhsalsrnrWid1234";

export const createSession = async (roomId) => {
    try {
        const response = await axios.post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
            { customSessionId: roomId },
            {
                headers: {
                    Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
                    "Content-Type": "application/json",
                },
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
