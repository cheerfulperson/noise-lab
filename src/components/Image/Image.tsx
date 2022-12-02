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
import image001 from "../../assets/materialImages/image001.jpg";
import image002 from "../../assets/materialImages/image002.jpg";
import image003 from "../../assets/materialImages/image003.jpg";
import image004 from "../../assets/materialImages/image004.jpg";
import image005 from "../../assets/materialImages/image005.png";
import image006 from "../../assets/materialImages/image006.gif";
import image007 from "../../assets/materialImages/image007.gif";
import image008 from "../../assets/materialImages/image008.gif";
import image009 from "../../assets/materialImages/image009.png";
import image0010 from "../../assets/materialImages/image0010.png";
import image0011 from "../../assets/materialImages/image0011.gif";
import image0012 from "../../assets/materialImages/image0012.gif";
import image0013 from "../../assets/materialImages/image0013.gif";
import image0014 from "../../assets/materialImages/image0014.gif";
import image0015 from "../../assets/materialImages/image0015.gif";
import image0016 from "../../assets/materialImages/image0016.png";
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
  | "image001"
  | "image002"
  | "image003"
  | "image004"
  | "image005"
  | "image006"
  | "image007"
  | "image008"
  | "image009"
  | "image0010"
  | "image0011"
  | "image0012"
  | "image0013"
  | "image0014"
  | "image0015"
  | "image0016";

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
  image001,
  image002,
  image003,
  image004,
  image005,
  image006,
  image007,
  image008,
  image009,
  image0010,
  image0011,
  image0012,
  image0013,
  image0014,
  image0015,
  image0016,
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
