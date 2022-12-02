import { ReactElement } from "react";

import { IAnalogSignalData } from "../../../../../modules/signal/signal";
import { FirstGarmonic } from "./FirstGarmonic";
import { SeconedGarmonic } from "./SeconedGarmonic";
import { ThirdGarmonic } from "./ThirdGarmonic";

interface IGarmonicsProps {
  signalCoords: IAnalogSignalData;
}

export const Garmonics = ({ signalCoords }: IGarmonicsProps): ReactElement => {
  return (
    <>
      <FirstGarmonic signalCoords={signalCoords} />
      <SeconedGarmonic signalCoords={signalCoords} />
      <ThirdGarmonic signalCoords={signalCoords} />
    </>
  );
};
