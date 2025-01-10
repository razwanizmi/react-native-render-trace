"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  init: () => init
});
module.exports = __toCommonJS(index_exports);

// src/RenderTrace.tsx
var import_react = __toESM(require("react"));
var import_react_native = __toESM(require("react-native"));
var OriginalView = import_react_native.default.View;
var OriginalImage = import_react_native.default.Image;
var OriginalTouchableOpacity = import_react_native.default.TouchableOpacity;
var getMockContainer = (OriginalComponent) => {
  const FunctionalContainer = ({
    children,
    ...props
  }) => {
    return /* @__PURE__ */ import_react.default.createElement(OriginalComponent, { ...props }, /* @__PURE__ */ import_react.default.createElement(HighlightComponent, null), children);
  };
  FunctionalContainer.displayName = "View";
  return FunctionalContainer;
};
var ViewMock = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(OriginalView, { ...props }, /* @__PURE__ */ import_react.default.createElement(HighlightComponent, null), props.children);
};
ViewMock.displayName = "View";
var ImageMock = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(OriginalView, { style: { position: "relative" } }, /* @__PURE__ */ import_react.default.createElement(OriginalImage, { ...props }), /* @__PURE__ */ import_react.default.createElement(HighlightComponent, null));
};
ImageMock.displayName = "View";
var HighlightComponent = () => {
  const [, setForceUpdate] = (0, import_react.useState)({});
  const renderCountRef = (0, import_react.useRef)(0);
  const flagRef = (0, import_react.useRef)(true);
  const timeoutRef = (0, import_react.useRef)();
  const getColor = () => {
    const count = renderCountRef.current;
    if (count === 0) return "transparent";
    if (count === 1) return "#2ecc71";
    if (count === 2) return "#f1c40f";
    if (count === 3) return "#f39c12";
    return "#e74c3c";
  };
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ import_react.default.createElement(OriginalView, { style: colorLayerStyle, pointerEvents: "box-none" });
};
function init() {
  Object.defineProperty(import_react_native.default, "View", {
    value: getMockContainer(OriginalView)
  });
  Object.defineProperty(import_react_native.default, "TouchableOpacity", {
    value: getMockContainer(OriginalTouchableOpacity)
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  init
});
//# sourceMappingURL=index.js.map