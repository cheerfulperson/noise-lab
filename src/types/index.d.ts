import { IElectronType } from "../preload";

declare global {
  interface Window {
    electron?: IElectronType;
  }
}
