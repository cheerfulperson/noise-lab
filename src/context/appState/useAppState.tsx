import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

import {
  initialMaketValues,
  TNoiseType,
  TScreenImages,
  TSignalType,
} from "../maket";

interface ISignal {
  image: TScreenImages;
  ampl: number;
  frequency: number;
  type: TSignalType;
}

interface INoise {
  ampl: number;
  frequency: number;
  type: TNoiseType;
}

export interface IAppStateResults extends IAppState {
  setWorkTrip: (data: TWorkTrip) => void;
  getPrevSignal: () => ISignal;
  pushSignal: (data: ISignal) => void;
  getPrevNoise: () => INoise;
  pushNoise: (data: INoise) => void;
}

export interface IAppState {
  workTrip: TWorkTrip;
  signalHistory: Array<ISignal>;
  noiseHistory: Array<INoise>;
}

type TWorkTrip = Array<string>;

export const AppStateContext = createContext<IAppStateResults | undefined>(
  undefined
);

const initialState: IAppState = {
  workTrip: [],
  signalHistory: [
    { ...initialMaketValues.signal, image: initialMaketValues.image },
  ],
  noiseHistory: [
    {
      ampl: (initialMaketValues.noise.maxN + initialMaketValues.noise.minA) / 2,
      frequency:
        (initialMaketValues.noise.maxF + initialMaketValues.noise.minF) / 2,
      type: initialMaketValues.noise.type,
    },
  ],
};

export const AppStateProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [state, setState] = useState<IAppState>(initialState);

  const setWorkTrip = (workTrip: TWorkTrip) => {
    setState((prev) => ({
      ...prev,
      workTrip,
    }));
  };

  const getPrevSignal = (): ISignal => {
    if (state.signalHistory.length === 1) {
      return state.signalHistory[0];
    }
    state.signalHistory.pop();

    setState((prev) => ({
      ...prev,
      signalHistory: state.signalHistory,
    }));

    return state.signalHistory.at(-1)!;
  };

  const pushSignal = (signal: ISignal): void => {
    setState((prev) => ({
      ...prev,
      signalHistory: [...prev.signalHistory, signal],
    }));
  };

  const getPrevNoise = (): INoise => {
    if (state.noiseHistory.length === 1) {
      return state.noiseHistory[0];
    }
    state.noiseHistory.pop();

    setState((prev) => ({
      ...prev,
      noiseHistory: state.noiseHistory,
    }));

    return state.noiseHistory.at(-1)!;
  };

  const pushNoise = (signal: INoise): void => {
    setState((prev) => ({
      ...prev,
      noiseHistory: [...prev.noiseHistory, signal],
    }));
  };

  const appStateContextValue: IAppStateResults = {
    ...state,
    setWorkTrip,
    getPrevSignal,
    pushSignal,
    getPrevNoise,
    pushNoise,
  };

  return (
    <AppStateContext.Provider value={appStateContextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = (): IAppStateResults => {
  const appContext = useContext(AppStateContext);

  if (!appContext) {
    throw Error("You can use appContext only with AppStateProvider");
  }

  return appContext;
};
