import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ReactElement, useState } from "react";

import styles from "./OutPut.module.scss";
import {
  DigitalInputChart,
  FilterChart,
  Garmonics,
  InputChart,
  NoiseChart,
  OutputChart,
} from "./charts";
import { useMaketContext } from "../../../context";
import { Link } from "react-router-dom";

export const OutPut = (): ReactElement => {
  const { signal, chartsData } = useMaketContext();
  const [isGarmonicOpen, setIsGarmonicOpen] = useState<boolean>(false);

  return (
    <div className={styles.signal_settings}>
      <h2 className={styles.signal_settings__title}>Осциллоргаф</h2>
      {signal.type === "analog" && (
        <>
          {!isGarmonicOpen && (
            <div className={styles.signal_settings__chart_block}>
              <div className={styles.signal_settings__chart}>
                <Paper style={{ justifyContent: "center" }}>
                  <h2 className={styles.signal_settings__title}>
                    Полезный сигнал
                  </h2>
                  <Button
                    variant="outlined"
                    style={{ margin: "auto", display: "block" }}
                    onClick={() => setIsGarmonicOpen(true)}
                  >
                    Показать гармоники
                  </Button>
                  <h2 className={styles.signal_settings__chart_title}>
                    U(t) = A · (3 · sin(t) + 2 · sin(3t) + 0.5 · sin(5t)).{" "}
                    <Link to={"/material#signal-model-material"}>
                      Узнать больше!!!
                    </Link>
                  </h2>
                  <p className={styles.signal_settings__chart_subtitle}>
                    Где A - амплитуда, которую вы задаете, t - промежуток
                    времени.
                  </p>

                  <InputChart signalCoords={chartsData.analog} />
                </Paper>
              </div>
              <div className={styles.signal_settings__chart}>
                <NoiseChart signalCoords={chartsData.noise} />
              </div>
              <div className={styles.signal_settings__chart}>
                <OutputChart signalCoords={chartsData.output} />
              </div>
              <div className={styles.signal_settings__chart}>
                <FilterChart signalCoords={chartsData.filter} />
              </div>
            </div>
          )}
          {isGarmonicOpen && (
            <div className={styles.signal_settings__chart_block}>
              <Button
                variant="outlined"
                onClick={() => setIsGarmonicOpen(false)}
              >
                Вернуться назад
              </Button>
              <div className={styles.signal_settings__chart}>
                <Garmonics signalCoords={chartsData.analog} />
              </div>
            </div>
          )}
        </>
      )}
      {signal.type === "digital" && (
        <div className={styles.signal_settings__chart_block}>
          <div className={styles.signal_settings__chart}>
            <DigitalInputChart signalCoords={chartsData.digital} />
          </div>
          <div className={styles.signal_settings__chart}>
            <NoiseChart signalCoords={chartsData.noise} />
          </div>
          <div className={styles.signal_settings__chart}>
            <OutputChart signalCoords={chartsData.output} />
          </div>
          <div className={styles.signal_settings__chart}>
            <FilterChart signalCoords={chartsData.filter} />
          </div>
        </div>
      )}
    </div>
  );
};
