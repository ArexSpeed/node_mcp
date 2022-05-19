import { useState, useEffect } from 'react';
import styled from "styled-components";
import './App.css';
import { io } from "socket.io-client";
import socketService from './services/socketService';
import JoinRoom from './components/joinRoom';
import GameContext, { IGameContextProps } from './gameContext';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;
const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);

  const connectSocket = async () => {
    const socket = socketService
    .connect("http://localhost:9000")
    .catch((err) => {
      console.log("Error: ", err)
    });

    console.log("socket: ", socket);
  }

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Welcome to Tic-Tac-Toe</WelcomeText>
        <MainContainer>
          <JoinRoom />
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
