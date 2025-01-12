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
  renderTrace: () => renderTrace
});
module.exports = __toCommonJS(index_exports);

// src/RenderTrace.tsx
var import_react = __toESM(require("react"));
var import_react_native = __toESM(require("react-native"));
var OriginalView = import_react_native.default.View;
var OriginalTouchableOpacity = import_react_native.default.TouchableOpacity;
var COLOR_MAP = [
  "transparent" /* transparent */,
  "#2ecc71" /* green */,
  "#f1c40f" /* yellow */,
  "#f39c12" /* amber */
];
var TIMEOUT_MS = 500;
function RenderTrace() {
  const [, forceRender] = (0, import_react.useState)({});
  const isCountingRef = (0, import_react.useRef)(true);
  const renderCountRef = (0, import_react.useRef)(0);
  const timeoutRef = (0, import_react.useRef)();
  const getColor = (0, import_react.useCallback)(() => {
    const count = renderCountRef.current;
    return COLOR_MAP[count] || "#e74c3c" /* red */;
  }, []);
  const renderWithoutCount = (0, import_react.useCallback)(() => {
    isCountingRef.current = false;
    forceRender({});
    isCountingRef.current = true;
  }, []);
  const handleTimeout = (0, import_react.useCallback)(() => {
    if (renderCountRef.current > 0) {
      renderCountRef.current = 0;
      renderWithoutCount();
    }
  }, []);
  const maybeIncrementCount = (0, import_react.useCallback)(() => {
    if (isCountingRef.current) {
      renderCountRef.current = renderCountRef.current + 1;
    }
  }, []);
  (0, import_react.useEffect)(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleTimeout, TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  });
  maybeIncrementCount();
  return /* @__PURE__ */ import_react.default.createElement(
    OriginalView,
    {
      style: [styles.colorLayer, { borderColor: getColor() }],
      pointerEvents: "box-none"
    }
  );
}
var styles = import_react_native.default.StyleSheet.create({
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
    return /* @__PURE__ */ import_react.default.createElement(OriginalComponent, { ...props }, /* @__PURE__ */ import_react.default.createElement(RenderTrace, null), children);
  };
  Object.assign(TraceComponent, OriginalComponent);
  return TraceComponent;
}
function renderTrace() {
  Object.defineProperty(import_react_native.default, "View", {
    value: traceFor(OriginalView)
  });
  Object.defineProperty(import_react_native.default, "TouchableOpacity", {
    value: traceFor(OriginalTouchableOpacity)
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderTrace
});
//# sourceMappingURL=index.js.map