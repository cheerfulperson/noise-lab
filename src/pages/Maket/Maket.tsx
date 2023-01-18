import { Alert, Button } from "@mui/material";
import { ReactElement, useState } from "react";
import { Settings } from "@mui/icons-material";

import { Image, Modal, Phone } from "../../components";
import styles from "./Maket.module.scss";
import { SignalSettings } from "./SignalSettings";
import { NoiseSettings } from "./NoiseSettings";
import { OutPut } from "./OutPut";
import { useMaketContext } from "../../context/maket/useMaket";

type TModalType = "noise" | "signal" | "output";

export const Maket = (): ReactElement => {
  const { noise, signal, image } = useMaketContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<TModalType>("signal");

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hideClose={modalType !== "output"}
        className={styles[`maket__modal_${modalType}`]}
      >
        {modalType === "signal" && <SignalSettings setOpen={setIsModalOpen} />}
        {modalType === "noise" && <NoiseSettings setOpen={setIsModalOpen} />}
        {modalType === "output" && <OutPut />}
      </Modal>
      <div className={styles.maket}>
        <div className={styles.maket__container}>
          <div className={styles.maket__wrapper}>
            <Phone
              image={image}
              onClickSettings={() => {
                setModalType("signal");
                setIsModalOpen(true);
              }}
            />
            <Alert severity="info">
              На этом устройстве отображается полезный сигнал.
            </Alert>
          </div>
          <div className={styles.maket__wrapper_middle}>
            <h2 className={styles.maket__title}>
              Выполнение экспериментальной части работы
            </h2>
            <div>
              <h3>В данный момент:</h3>
              <p>
                <strong>Вид сигнала:</strong> {signal.name}
              </p>
              <p>
                <strong>Вид помехи:</strong> {noise.name}
              </p>
            </div>
            <Image
              imageType="channelImage"
              className={styles.maket__image_signal}
            />
            <div className={styles.maket__button_group}>
              <Button
                variant="contained"
                className={styles.maket__button}
                onClick={() => {
                  setModalType("noise");
                  setIsModalOpen(true);
                }}
              >
                <Settings />
                Настройка помех
              </Button>
              <Button
                variant="contained"
                className={styles.maket__button}
                onClick={() => {
                  setModalType("output");
                  setIsModalOpen(true);
                }}
              >
                осциллограф
              </Button>
            </div>
          </div>
          <div className={styles.maket__wrapper}>
            <Phone image={image} phoneType="out" />
            <Alert severity="info">
              На этом устройстве отображается результат действия помех на
              полезный сигнал.
            </Alert>
          </div>
        </div>
      </div>
    </>
  );
};
