import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";


export interface IAppStateResults extends IAppState {
  setWorkTrip: (data: TWorkTrip) => void;
}

export interface IAppState {
  workTrip: TWorkTrip;
}

type TWorkTrip = Array<string>;

export const AppStateContext = createContext<IAppStateResults | undefined>(
  undefined
);

const initialState: IAppState = {
  workTrip: [],
};

export const AppStateProvider = ({
  children,
}: {children: ReactNode}): ReactElement => {
  const [state, setState] = useState<IAppState>(initialState);

  const setWorkTrip = (workTrip: TWorkTrip) => {
    setState((prev) => ({
      ...prev,
      workTrip,
    }))
  }

  const appStateContextValue: IAppStateResults = {
    ...state,
    setWorkTrip,
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
