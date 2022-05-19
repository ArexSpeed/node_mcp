import { createContext } from "react";

export interface IGameContextProps {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
};

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {}
};

export default createContext(defaultState);