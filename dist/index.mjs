// src/RenderTrace.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactNative from "react-native";
var OriginalView = ReactNative.View;
var OriginalTouchableOpacity = ReactNative.TouchableOpacity;
var COLOR_MAP = [
  "transparent" /* transparent */,
  "#2ecc71" /* green */,
  "#f1c40f" /* yellow */,
  "#f39c12" /* amber */
];
var TIMEOUT_MS = 500;
function RenderTrace() {
  const [, forceRender] = useState({});
  const isCountingRef = useRef(true);
  const renderCountRef = useRef(0);
  const timeoutRef = useRef();
  const getColor = useCallback(() => {
    const count = renderCountRef.current;
    return COLOR_MAP[count] || "#e74c3c" /* red */;
  }, []);
  const renderWithoutCount = useCallback(() => {
    isCountingRef.current = false;
    forceRender({});
    isCountingRef.current = true;
  }, []);
  const handleTimeout = useCallback(() => {
    if (renderCountRef.current > 0) {
      renderCountRef.current = 0;
      renderWithoutCount();
    }
  }, []);
  const maybeIncrementCount = useCallback(() => {
    if (isCountingRef.current) {
      renderCountRef.current = renderCountRef.current + 1;
    }
  }, []);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleTimeout, TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  });
  maybeIncrementCount();
  return /* @__PURE__ */ React.createElement(
    OriginalView,
    {
      style: [styles.colorLayer, { borderColor: getColor() }],
      pointerEvents: "box-none"
    }
  );
}
var styles = ReactNative.StyleSheet.create({
  colorLayer: {
    borderWidth: 3,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  }
});
function traceFor(OriginalComponent) {
  const TraceComponent = ({
    children,
    ...props
  }) => {
    return /* @__PURE__ */ React.createElement(OriginalComponent, { ...props }, /* @__PURE__ */ React.createElement(RenderTrace, null), children);
  };
  Object.assign(TraceComponent, OriginalComponent);
  return TraceComponent;
}
function renderTrace() {
  Object.defineProperty(ReactNative, "View", {
    value: traceFor(OriginalView)
  });
  Object.defineProperty(ReactNative, "TouchableOpacity", {
    value: traceFor(OriginalTouchableOpacity)
  });
}
export {
  renderTrace
};
//# sourceMappingURL=index.mjs.map