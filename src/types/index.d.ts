import { IElectronType } from "../preload";

export {};

declare global {
  interface Window {
    electron?: IElectronType;
  }
}
