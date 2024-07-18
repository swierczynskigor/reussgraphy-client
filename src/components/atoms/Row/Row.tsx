import React from "react";
import "./Row.scss";

type Props = {
  children?: React.ReactNode | string;
  style?: React.CSSProperties;
  className?: string;
};

export const Row = (props: Props) => {
  return (
    <div className={`row ${props.className}`} style={{ ...props.style }}>
      {props.children}
    </div>
  );
};
