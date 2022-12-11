import { CSSProperties, ReactElement } from "react";

import phoneImage from "../../assets/images/phone.png";
import channelImage from "../../assets/images/channel_scan.gif";
import impulsNoise from "../../assets/images/impulsNoise.gif";
import periodNoise from "../../assets/images/period.gif";
import brightnessScreen from "../../assets/images/brightness_point.gif";
import image1 from "../../assets/images/image_1.png";
import image2 from "../../assets/images/image4.jpg";
import image3 from "../../assets/images/image3.gif";
import book from "../../assets/images/book.png";
import info1 from "../../assets/images/info1.png";
import info2 from "../../assets/images/info2.png";
import info3 from "../../assets/images/info3.png";
import info4 from "../../assets/images/info4.png";
import info5 from "../../assets/images/info5.png";
import info6 from "../../assets/images/info6.png";
import info7 from "../../assets/images/info7.png";
import info8 from "../../assets/images/info9.png";
import stopPeriodNoise from '../../assets/images/periodNoise.png';

export type TImageType =
  | "phoneImage"
  | "channelImage"
  | "brightnessScreen"
  | "impulsNoise"
  | "periodNoise"
  | "stopPeriodNoise"
  | "image1"
  | "image2"
  | "image3"
  | "book"
  | "info1"
  | "info2"
  | "info3"
  | "info4"
  | "info5"
  | "info6"
  | "info7"
  | "info8";

interface IImageProps {
  imageType: TImageType;
  className?: string;
  draggable?: boolean;
  styles?: CSSProperties;
}

const images: Record<TImageType, string> = {
  brightnessScreen,
  periodNoise,
  impulsNoise,
  phoneImage: phoneImage,
  channelImage: channelImage,
  stopPeriodNoise,
  image1,
  image2,
  image3,
  book,
  info1,
  info2,
  info3,
  info4,
  info5,
  info6,
  info7,
  info8,
};

export const Image = ({
  imageType,
  className,
  styles,
  draggable = false,
}: IImageProps): ReactElement => {
  return (
    <img
      style={styles}
      src={images[imageType]}
      className={className}
      alt=""
      draggable={draggable}
    />
  );
};
