import React, { createContext, useContext, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { userInfo } from "../../apis/userInfo";

const WebSocketContext = createContext();

export function useWebSocket() {
  return useContext(WebSocketContext);
}

export function WebSocketProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  let socket = null;
  let reconnectInterval;

  const connectWebSocket = useCallback(() => {
    if (!socket) {
      // 먼저 사용자 정보를 가져옵니다.
      userInfo()
        .then(res => {
          console.log(res.data.user_seq);
          // 사용자 정보가 존재하면 웹소켓을 연결합니다.
          if (res.data.user_seq !== null) {
            socket = new SockJS("https://i9b109.p.ssafy.io:8443/stomp/chat");
            const stomp = Stomp.over(socket);

            socket.onclose = () => {
              console.error("웹소켓 연결이 끊어졌습니다. 재연결을 시도합니다.");
              if (!reconnectInterval) {
                reconnectInterval = setInterval(connectWebSocket, 2000);
              }
            };

            stomp.connect({}, () => {
              if (reconnectInterval) {
                clearInterval(reconnectInterval);
                reconnectInterval = null;
              }
              const fromUser = res.data.user_seq;
              if (fromUser) {
                stomp.subscribe(`/subscribe/friend/${fromUser}`, message => {
                  setMessages(prev => [...prev, message.body]);
                  window.alert("친추옴");
                });
                stomp.subscribe(`/subscribe/game/${fromUser}`, message => {
                  setMessages(prev => [...prev, message.body]);
                  window.alert("게임 초대 옴");
                });
                stomp.subscribe(`/subscribe/startSong/${fromUser}`, message => {
                  const songData = JSON.parse(message.body);
                  startSongAt(songData.song, songData.timestamp);
                });
              }
            });

            setConnected(true);
          } else {
            console.warn("로그인된 사용자 정보가 없습니다.");
          }
        })
        .catch(error => {
          console.error("Failed to fetch user info:", error);
        });
    }
  }, []);

  // 노래 시작 함수
  const startSongAt = (song, timestamp) => {
    const currentTime = new Date().getTime();
    const delay = timestamp - currentTime; // 서버가 지정한 시작 시간과 현재 시간의 차이를 계산

    if (delay > 0) {
      setTimeout(() => {
        // playSong(song); // 노래 재생 로직 (이 부분은 별도로 구현해야 함)
      }, delay);
    } else {
      // playSong(song); // 이미 시작 시간이 지났으면 즉시 노래 재생
    }
  };

  const disconnectWebSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = null;
      setConnected(false);
    }
    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
  }, []);

  const contextValue = {
    connected,
    messages,
    connectWebSocket,
    disconnectWebSocket,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}