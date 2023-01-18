// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

export interface IElectronType {
  openTrip: () => void;
  openMaterial: () => void;
  openMeth: () => void;
}

contextBridge.exposeInMainWorld("electron", {
  openTrip: () => {
    ipcRenderer.send("openWorkTrip");
  },
  openMaterial: () => {
    ipcRenderer.send("openMaterial");
  },
  openMeth: () => {
    ipcRenderer.send("openMeth");
  }
});
