import { ReactElement } from "react";

import { AppInfo, Conclude, Main, Maket, Material, WorkTrip } from ".././pages";
import { EAppRoutes } from "../types";

type TRoutes = Record<string, ReactElement>;

export const appRoutes: TRoutes = {
  [EAppRoutes.MAIN]: <Main />,
  [EAppRoutes.APP_INFO]: <AppInfo />,
  [EAppRoutes.CONCLUDE]: <Conclude />,
  [EAppRoutes.WORK_TRIP]: <WorkTrip />,
  [EAppRoutes.MATERIAL]: <Material />,
  [EAppRoutes.MAKET]: <Maket />,
  [EAppRoutes.ANY]: <Main />,
};
