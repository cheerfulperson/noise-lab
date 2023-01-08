import { ReactElement } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { Header } from "./components";
import { AppRoutes } from "./router";
import { AppStateProvider, MaketProvider } from "./context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

const App = (): ReactElement => {
  return (
    <div>
      <Header />
      <AppRoutes />
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error('Please provide root');
}

const root = createRoot(container);

function render() {
  root.render(
    <HashRouter>
      <AppStateProvider>
        <MaketProvider>
          <App />
        </MaketProvider>
      </AppStateProvider>
    </HashRouter>
  );
}

render();
