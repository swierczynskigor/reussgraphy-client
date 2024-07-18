import React, { useEffect, useRef } from "react";

const useDidMountEffect = (fn: () => unknown, inputs: Array<unknown>) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, inputs);
};

export default useDidMountEffect;
