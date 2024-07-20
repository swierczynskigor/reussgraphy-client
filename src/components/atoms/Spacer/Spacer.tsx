import "./Spaces.scss";
import React from "react";

export const Spacer = (props: { width?: string }) => {
  return (
    <div className="spacer-container">
      <div
        className="spacer-line"
        style={{ ...(props.width && { width: props.width }) }}
      />
    </div>
  );
};
