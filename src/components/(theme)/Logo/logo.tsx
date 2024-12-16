import Image from "next/image";
import React from "react";

interface Props {
  width?: string;
}

const Logo = ({ width }: Props) => {
  return (
    <Image
      className={`${width ? width : "w-20"} h-auto`}
      src={`/images/logo.png`}
      width={200}
      height={200}
      alt="Logo Autopartes SA"
    />
  );
};

export default Logo;
