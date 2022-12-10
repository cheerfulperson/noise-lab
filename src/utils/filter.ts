import { TSignalType } from "../context";

export const getCoff = (
  signalT: TSignalType,
  ampl: number,
  noise: number
): number => {
  if (signalT === "digital") {
    return ampl - noise * 0.75 > 0 ? 0.2 : 1;
  }
  return 0.5;
};