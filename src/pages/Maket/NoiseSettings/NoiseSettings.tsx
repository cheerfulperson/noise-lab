import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  noiseNaming,
  TNoiseType,
  useMaketContext,
} from "../../../context/maket/useMaket";
import styles from "./NoiseSettings.module.scss";
import { z } from "zod";
import { useAppStateContext } from "../../../context";

interface INoiseSettingsProps {
  setOpen: Dispatch<boolean>;
}

interface INoiseFormFields {
  type: TNoiseType;
  averageA: number;
  averageF: number;
}

const noiseSettingsSchema = z.object({
  type: z.string(),
  averageA: z.preprocess(
    (value) => Number(z.union([z.string(), z.number()]).parse(value)),
    z
      .number({
        errorMap: () => ({ message: "Значение должно быть числом" }),
      })
      .min(0.1, "Минимальное значение 0.1В")
      .max(15, "Максимальное значение 15В")
  ),
  averageF: z.preprocess(
    (value) => Number(z.union([z.string(), z.number()]).parse(value)),
    z
      .number({
        errorMap: () => ({ message: "Значение должно быть числом" }),
      })
      .min(0.15, "Минимальное значение 0.15Мгц")
      .max(1000, "Максимальное значение 1000Мгц")
  ),
});

export const NoiseSettings = ({
  setOpen,
}: INoiseSettingsProps): ReactElement => {
  const { getPrevNoise, pushNoise } = useAppStateContext();
  const {
    setNoise,
    noise: { maxF, maxN, minA, minF, type },
  } = useMaketContext();
  const { register, handleSubmit, control, reset, formState } =
    useForm<INoiseFormFields>({
      mode: "onTouched",
      reValidateMode: "onChange",
      resolver: zodResolver(noiseSettingsSchema),
      defaultValues: {
        averageA: (minA + maxN) / 2,
        averageF: (minF + maxF) / 2,
        type,
      },
    });
  const submit = (data: INoiseFormFields): void => {
    data.averageA = parseFloat(`${data.averageA}`);
    data.averageF = parseFloat(`${data.averageF}`);
    setNoise({
      maxF: data.averageF * 1.5,
      minF: data.averageF * 0.5,
      maxN: data.averageA * 1.5,
      minA: data.averageA * 0.5,
      type: data.type,
    });
    pushNoise({
      ampl: data.averageA,
      frequency: data.averageF,
      type: data.type,
    });
    setOpen(false);
  };

  const prevStep = (): void => {
    const prev = getPrevNoise();
    reset({
      averageA: prev.ampl,
      averageF: prev.frequency,
      type: prev.type,
    });
  };

  return (
    <div className={styles.noise_settings}>
      <h2 className={styles.noise_settings__title}>Найстройка помех</h2>
      <form
        className={styles.noise_settings__image_choose}
        onSubmit={handleSubmit(submit)}
      >
        <div className={styles.noise_settings__selects}>
          <h3 className={styles.noise_settings__pretitle}>Выбор типа помех</h3>

          <FormControl fullWidth className={styles.noise_settings__signal_type}>
            <InputLabel id="demo-simple-select-label">Тип помехи</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Тип помехи"
                  onChange={onChange}
                >
                  {Object.entries(noiseNaming).map(([value, text]) => (
                    <MenuItem key={value} value={value}>
                      {text}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div className={styles.noise_settings__inputs}>
          <div className={styles.noise_settings__input_block}>
            <TextField
              id="noise_settings_max_gz"
              label="Средняя амплитуда"
              variant="outlined"
              color={formState.errors.averageA ? "error" : "info"}
              helperText={formState.errors.averageA ? (
                <p className={styles.noise_settings__error}>
                  {formState.errors.averageA.message}
                </p>
              ) : 'Диапазон значений от 0.1В до 15В'}
              className={styles.noise_settings__input}
              {...register("averageA")}
            />
            <span className={styles.noise_settings__input_info}>В</span>
          </div>
          <div className={styles.noise_settings__input_block}>
            <TextField
              id="noise_settings_min_gz"
              label="Средняя частота"
              variant="outlined"
              color={formState.errors.averageF ? "error" : "info"}
              helperText={formState.errors.averageF ? (
                <p className={styles.noise_settings__error}>
                  {formState.errors.averageF.message}
                </p>
              ) : 'Диапазон значений от 0.15Мгц до 1000Мгц'}
              className={styles.noise_settings__input}
              {...register("averageF")}
            />
            <span className={styles.noise_settings__input_info}>МГц</span>
          </div>
        </div>
        <div className={styles.noise_settings__buttons}>
          <Button
            type="button"
            variant="contained"
            color="error"
            className={styles.noise_settings__button}
            onClick={() => setOpen(false)}
          >
            отмена
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={styles.noise_settings__button}
            onClick={prevStep}
          >
            шаг назад
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="info"
            className={styles.noise_settings__button}
          >
            применить
          </Button>
        </div>
      </form>
    </div>
  );
};
