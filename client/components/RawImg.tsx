import React from "react";

type RawImgProps = {
  image: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const RawImg: React.FC<RawImgProps> = ({ image, alt = "", className, style }) => {
  return <img src={image} alt={alt} className={className} style={style} />;
};

export default RawImg;
