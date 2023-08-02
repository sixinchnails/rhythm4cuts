// connectionInitialization.js

import axios from "axios";

const OPENVIDU_SERVER_URL = "https://i9b109.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "zlwhsalsrnrWid1234";

export const createConnection = async (sessionId) => {
  try {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
      {},
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
