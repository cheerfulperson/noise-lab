import { ReactElement } from "react";
import { Routes, Route } from 'react-router-dom';

import { appRoutes } from "./router.config";

export const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      {Object.entries(appRoutes).map(([path, component]) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};
