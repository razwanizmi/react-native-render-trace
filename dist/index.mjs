// src/RenderTrace.tsx
import React, { useEffect, useRef, useState } from "react";
import ReactNative from "react-native";
var OriginalView = ReactNative.View;
var OriginalImage = ReactNative.Image;
var OriginalTouchableOpacity = ReactNative.TouchableOpacity;
var getMockContainer = (OriginalComponent) => {
  const FunctionalContainer = ({
    children,
    ...props
  }) => {
    return /* @__PURE__ */ React.createElement(OriginalComponent, { ...props }, /* @__PURE__ */ React.createElement(HighlightComponent, null), children);
  };
  FunctionalContainer.displayName = "View";
  return FunctionalContainer;
};
var ViewMock = (props) => {
  return /* @__PURE__ */ React.createElement(OriginalView, { ...props }, /* @__PURE__ */ React.createElement(HighlightComponent, null), props.children);
};
ViewMock.displayName = "View";
var ImageMock = (props) => {
  return /* @__PURE__ */ React.createElement(OriginalView, { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(OriginalImage, { ...props }), /* @__PURE__ */ React.createElement(HighlightComponent, null));
};
ImageMock.displayName = "View";
var HighlightComponent = () => {
  const [, setForceUpdate] = useState({});
  const renderCountRef = useRef(0);
  const flagRef = useRef(true);
  const timeoutRef = useRef();
  const getColor = () => {
    const count = renderCountRef.current;
    if (count === 0) return "transparent";
    if (count === 1) return "#2ecc71";
    if (count === 2) return "#f1c40f";
    if (count === 3) return "#f39c12";
    return "#e74c3c";
  };
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (renderCountRef.current > 0) {
        renderCountRef.current = 0;
        flagRef.current = false;
        setForceUpdate({});
        flagRef.current = true;
      }
    }, 500);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  });
  if (flagRef.current) {
    renderCountRef.current++;
  }
  const colorLayerStyle = {
    borderWidth: 3,
    borderColor: getColor(),
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  return /* @__PURE__ */ React.createElement(OriginalView, { style: colorLayerStyle, pointerEvents: "box-none" });
};
function init() {
  Object.defineProperty(ReactNative, "View", {
    value: getMockContainer(OriginalView)
  });
  Object.defineProperty(ReactNative, "TouchableOpacity", {
    value: getMockContainer(OriginalTouchableOpacity)
  });
}
export {
  init
};
//# sourceMappingURL=index.mjs.map