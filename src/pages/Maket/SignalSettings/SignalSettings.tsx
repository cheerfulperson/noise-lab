import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactElement, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import {
  initialMaketValues,
  TScreenImages,
  TSignalType,
  useMaketContext,
  signalsNaming,
} from "../../../context/maket/useMaket";
import { Image } from "../../../components";
import styles from "./SignalSettings.module.scss";

interface ISignalSettingsProps {
  setOpen: Dispatch<boolean>;
}

interface ISignalFormFields {
  image: TScreenImages;
  type: TSignalType;
  frequency: number;
  ampl: number;
}

const signalSchema = z.object({
  image: z.string(),
  type: z.string(),
  ampl: z.preprocess(
    (value) => Number(z.union([z.string(), z.number()]).parse(value)),
    z
      .number({
        errorMap: () => ({ message: "Значение должно быть числом" }),
      })
      .min(0.1, "Минимальное значение 0.1")
      .max(15, "Максимальное значение 15")
  ),
  frequency: z.preprocess(
    (value) => Number(z.union([z.string(), z.number()]).parse(value)),
    z
      .number({
        errorMap: () => ({ message: "Значение должно быть числом" }),
      })
      .min(800, "Минимальное значение 800")
      .max(2600, "Максимальное значение 2600")
  ),
});

export const SignalSettings = ({
  setOpen,
}: ISignalSettingsProps): ReactElement => {
  const images: Array<TScreenImages> = ["image1", "image2", "image3"];
  const defaultValues = {
    image: initialMaketValues.image,
    ...initialMaketValues.signal,
  };
  const { setSignal, image: currentImage, signal } = useMaketContext();
  const { register, handleSubmit, control, reset, setValue, formState } =
    useForm<ISignalFormFields>({
      mode: "all",
      reValidateMode: "onChange",
      resolver: zodResolver(signalSchema),
      defaultValues: {
        ...signal,
        image: currentImage,
      },
    });
  const [selectedImage, setSelectedImage] =
    useState<TScreenImages>(currentImage);

  const submit = (data: ISignalFormFields): void => {
    setSignal(data);
    setOpen(false);
  };

  return (
    <div className={styles.signal_settings}>
      <h2 className={styles.signal_settings__title}>
        Найстройка полезного сигнала
      </h2>
      <form
        className={styles.signal_settings__image_choose}
        onSubmit={handleSubmit(submit, console.log)}
      >
        <h3 className={styles.signal_settings__pretitle}>Выбор изображения</h3>
        <div className={styles.signal_settings__images}>
          {images.map((image) => {
            return (
              <div
                key={image}
                className={styles.signal_settings__image_block}
                onClick={() => {
                  setValue("image", image);
                  setSelectedImage(image);
                }}
              >
                <Image
                  imageType={image}
                  className={[
                    styles.signal_settings__image,
                    image === selectedImage &&
                      styles.signal_settings__image_selected,
                  ].join(" ")}
                />
                <p className={styles.signal_settings__image_text}>
                  изображение
                </p>
              </div>
            );
          })}
        </div>

        <div className={styles.signal_settings__selects}>
          <h3 className={styles.signal_settings__pretitle}>
            Выбор типа сигнала
          </h3>

          <FormControl
            fullWidth
            className={styles.signal_settings__signal_type}
          >
            <InputLabel id="demo-simple-select-label">Тип сигнала</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="select-signal"
                  value={value}
                  label="Тип сигнала"
                  onChange={onChange}
                >
                  {Object.entries(signalsNaming).map(([key, text]) => (
                    <MenuItem key={key} value={key}>
                      {text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div className={styles.signal_settings__inputs}>
          <div className={styles.signal_settings__input_block}>
            <TextField
              id="signal_settings_a"
              label="Амплитуда"
              variant="outlined"
              color={formState.errors.ampl ? "error" : "info"}
              className={styles.signal_settings__input}
              {...register("ampl")}
            />
            <span className={styles.signal_settings__input_info}>В</span>
          </div>
          {formState.errors.ampl && (
            <p className={styles.signal_settings__error}>
              {formState.errors.ampl.message}
            </p>
          )}
        </div>
          <div className={styles.signal_settings__input_block}>
            Частота сигнала 800 МГц
            {/* <TextField
              id="signal_settings_gz"
              label="Частота"
              variant="outlined"
              color={formState.errors.frequency ? "error" : "info"}
              className={styles.signal_settings__input}
              {...register("frequency")}
            /> */}
            {/* <span className={styles.signal_settings__input_info}></span> */}
          </div>
          {formState.errors.frequency && (
            <p className={styles.signal_settings__error}>
              {formState.errors.frequency.message}
            </p>
          )}
        <div className={styles.signal_settings__buttons}>
          <Button
            variant="contained"
            color="error"
            className={styles.signal_settings__button}
            onClick={() => setOpen(false)}
          >
            отмена
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={styles.signal_settings__button}
            onClick={() => reset(defaultValues)}
          >
            сбросить
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            className={styles.signal_settings__button}
          >
            применить
          </Button>
        </div>
      </form>
    </div>
  );
};
