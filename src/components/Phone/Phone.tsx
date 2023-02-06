import { Button, Slider } from "@mui/material";
import { ReactElement, useMemo, useCallback } from "react";
import { useResizeDetector } from "react-resize-detector";

import { ISignalCoords } from "../../modules";
import {
  TNoiseType,
  TScreenImages,
  useMaketContext,
} from "../../context/maket/useMaket";
import { Image } from "../Image";
import { getCoff } from "../../utils/filter";
import styles from "./Phone.module.scss";

interface IPhoneProps {
  phoneType?: "in" | "out";
  image: TScreenImages;
  className?: string;
  onClickSettings?: () => void;
}

const marks = Array.from({ length: 10 }, (_, i) => ({
  value: i * 10,
}));

export const Phone = ({
  className,
  phoneType = "in",
  image,
  onClickSettings,
}: IPhoneProps): ReactElement => {
  const { width, height, ref } = useResizeDetector();
  const { chartsData, signal, noise, brightness, lines, setBrightness } =
    useMaketContext();
  const frqAvarage = useMemo(() => (noise.maxF + noise.minF) / 2, [noise]);

  const getMaxAnalogNoise = useCallback(
    (type: TNoiseType, chartsData: ISignalCoords, ampl: number): number => {
      const k = getCoff(signal.type, signal.ampl, noise.maxN);
      switch (type) {
        case "fluct":
          return Math.max(...chartsData.y.map((el) => el * k)) * 1.5;
        case "impuls":
          return ampl;
        case "period":
          return ampl * 1.5;
      }
    },
    [signal, noise]
  );

  // const getMaxDigNoise = useCallback(
  //   (type: TNoiseType, chartsData: ISignalCoords, ampl: number): number => {
  //     const k = getCoff(signal.type, signal.ampl, noise.maxN);
  //     const { abs } = Math;
  //     switch (type) {
  //       case "fluct":
  //         return (
  //           chartsData.y.reduce((a, b) => abs(a * k) + abs(b * k)) /
  //           chartsData.y.length
  //         );
  //       case "impuls":
  //         return ampl;
  //       case "period":
  //         return ampl / 2;
  //     }
  //   },
  //   [signal, noise]
  // );

  const COEFFICIENT = useMemo(() => {
    if (signal.type !== "analog") return 0;

    const k = getCoff(signal.type, signal.ampl, noise.maxN);
    const noiseData = {
      ...noise,
      maxN: noise.maxN * k,
      minA: noise.minA * k,
    };
    const maxSignal = signal.ampl;
    const maxNoise = getMaxAnalogNoise(
      noise.type,
      chartsData.noise,
      (noiseData.maxN + noiseData.minA) / 2
    );
    const delta = maxSignal / maxNoise;
    const results = Math.round(Math.log(delta) * -20 + 16) / 50;
    return results;
  }, [chartsData, noise, signal, getMaxAnalogNoise]);

  const digitalCoff = useMemo<number>(() => {
    const signalAmpl = signal.ampl;
    return (signalAmpl / (noise.maxN + noise.minA)) * 2;
  }, [noise, signal]);

  const expK = useMemo<number>(() => {
    if (COEFFICIENT < -0.5) return 0;
    if (COEFFICIENT >= -0.5 && COEFFICIENT < 0) {
      return Math.abs(0.5 + COEFFICIENT) * 0.5;
    }
    return COEFFICIENT * 1.2;
  }, [COEFFICIENT]);

  const expImpl = useMemo<number>(() => {
    if (COEFFICIENT < -0.76) return 0;
    if (COEFFICIENT >= -0.76 && COEFFICIENT < 0) {
      return Math.abs(0.76 + COEFFICIENT) * 0.4;
    }
    if (COEFFICIENT > 0 && COEFFICIENT < 0.05) {
      return COEFFICIENT * 8;
    }
    if (COEFFICIENT >= 0.05 && COEFFICIENT < 0.1) {
      return COEFFICIENT * 4;
    }
    if (COEFFICIENT >= 0.1 && COEFFICIENT < 0.25) {
      return COEFFICIENT * 3;
    }
    return COEFFICIENT === 0 ? 0.5 : COEFFICIENT * 1.5;
  }, [COEFFICIENT]);

  const expPeriod = useMemo<number>(() => {
    if (COEFFICIENT < -0.3) return 0;
    if (COEFFICIENT >= -0.3 && COEFFICIENT < 0) {
      return Math.abs(0.3 + COEFFICIENT) * 0.32;
    }
    return COEFFICIENT;
  }, [COEFFICIENT]);

  const digLines = useMemo<ReactElement | null>(() => {
    console.log(digitalCoff);
    if (digitalCoff > 1 || signal.type !== "digital") return null;

    const maxHeight = Math.floor((height - 15) / 15);
    const maxWidth = Math.floor((width - 25) / 25);

    return (
      <>
        {Array.from(
          { length: 200 - Math.abs(Math.round(digitalCoff * 100)) },
          () => Math.floor(Math.random() * 16777215).toString(16)
        ).map((randomColor) => (
          <div
            key={randomColor}
            className={styles.phone__line}
            style={{
              background: `#${randomColor}`,
              opacity: Math.random(),
              top: Math.round(Math.random() * maxHeight) * 15 + 4,
              left: Math.round(Math.random() * maxWidth) * 25 + 8,
              height: "15px",
              width: "25px",
            }}
          ></div>
        ))}
      </>
    );
  }, [digitalCoff, height, width, signal.type]);

  return (
    <div className={[styles.phone, className].join(" ")}>
      {phoneType === "in" && (
        <>
          <Image imageType="phoneImage" className={styles.phone__image} />
          <div className={styles.phone__screen}>
            <div className={styles.phone__screen_view}>
              <Image
                imageType={image}
                className={[
                  styles.phone__screen_image,
                  signal.type === "analog" ? styles.phone__image_analog : "",
                ].join(" ")}
              />
            </div>
            <div className={styles.phone__button}>
              <Button variant="contained" onClick={onClickSettings}>
                настройка сигнала
              </Button>
            </div>
          </div>
        </>
      )}

      {phoneType === "out" && (
        <>
          <>
            <Image imageType="phoneImage" className={styles.phone__image} />
            <div className={styles.phone__screen}>
              <div className={styles.phone__screen_view}>
                {signal.type === "analog" && (
                  <>
                    {noise.type === "fluct" && (
                      <>
                        <Image
                          imageType={image}
                          className={styles.phone__screen_image}
                          styles={{
                            filter: `blur(${expK * 10}px) contrast(${
                              expK * 20 < 1 ? 1 : expK * 20
                            }) brightness(${1 - expK})`,
                          }}
                        />
                        <div ref={ref} className={styles.phone__noise}>
                          {width &&
                            height &&
                            Array.from({ length: 6 }).map((_, i) => (
                              <Image
                                key={i}
                                className={styles.phone__noise_image}
                                styles={{
                                  opacity: expK,
                                  width: width / 2,
                                  height: height / 3,
                                }}
                                imageType="brightnessScreen"
                              />
                            ))}
                        </div>
                      </>
                    )}

                    {noise.type === "impuls" && (
                      <>
                        <Image
                          imageType={image}
                          className={styles.phone__screen_image}
                          styles={{
                            opacity: 1 - expImpl,
                          }}
                        />
                        <div ref={ref} className={styles.phone__noise}>
                          <Image
                            className={styles.phone__impuls_image}
                            styles={{
                              filter: `contrast(${
                                expImpl * 10 < 1 ? 1 : expImpl * 10
                              })`,
                              opacity: expImpl,
                            }}
                            imageType="impulsNoise"
                          />
                        </div>
                      </>
                    )}

                    {noise.type === "period" && (
                      <>
                        <Image
                          imageType={image}
                          className={styles.phone__screen_image}
                          styles={{
                            opacity: 1 - expPeriod,
                          }}
                        />
                        {frqAvarage < lines ? (
                          <div ref={ref} className={styles.phone__noise}>
                            <Image
                              className={styles.phone__impuls_image}
                              styles={{
                                opacity: expPeriod,
                              }}
                              imageType="periodNoise"
                            />
                          </div>
                        ) : (
                          <div ref={ref} className={styles.phone__noise}>
                            <Image
                              className={styles.phone__impuls_image}
                              styles={{
                                opacity: expPeriod,
                                transform: `rotate(-${
                                  35 - (32 * lines) / frqAvarage
                                }deg) scale(1.5)`,
                              }}
                              imageType="periodNoise"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                {signal.type === "digital" && (
                  <>
                    <Image
                      imageType={image}
                      className={styles.phone__screen_image}
                    />
                    <div ref={ref} className={styles.phone__noise_dig}>
                      {digLines}
                    </div>
                  </>
                )}
                <div
                  className={styles.phone__brightness}
                  style={{ opacity: brightness / 100 }}
                ></div>
              </div>

              <div className={styles.phone__button}>
                <Slider
                  defaultValue={50}
                  onChangeCommitted={(_, value) => {
                    const bright = Array.isArray(value) ? value[0] : value;
                    setBrightness(100 - bright);
                  }}
                  step={10}
                  marks={marks}
                  color="primary"
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
                <p className={styles.phone__text}>Яркость</p>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
};
