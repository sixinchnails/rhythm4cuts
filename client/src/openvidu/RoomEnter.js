import axios from "axios";

// OpenVidu 서버 정보
const OPENVIDU_SERVER_URL = "https://i9b109.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "zlwhsalsrnrWid1234";

// OpenVidu 세션 생성 및 토큰 발급
export const createSessionAndToken = async sessionId => {
  try {
    // 세션 생성
    const responseSession = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
      { customSessionId: sessionId },
      {
        //
        headers: {
          "Authorization": `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 토큰 발급
    const responseToken = await axios.post(
      `${OPENVIDU_SERVER_URL}/api/tokens`,
      { session: responseSession.data.id },
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    return responseToken.data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
};
