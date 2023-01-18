import { IElectronType } from "./preload";

declare module "*.module.scss";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "*.pdf";
declare module "*.html";


declare global {
  interface Window {
    electron?: IElectronType;
  }
}
