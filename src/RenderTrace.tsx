import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactNative from 'react-native';

const OriginalView = ReactNative.View;
const OriginalTouchableOpacity = ReactNative.TouchableOpacity;

enum Colors {
  transparent = 'transparent',
  green = '#2ecc71',
  yellow = '#f1c40f',
  amber = '#f39c12',
  red = '#e74c3c',
}

const COLOR_MAP = [
  Colors.transparent,
  Colors.green,
  Colors.yellow,
  Colors.amber,
];

const TIMEOUT_MS = 500;

export function RenderTrace() {
  const [, forceRender] = useState({});

  const isCountingRef = useRef(true);
  const renderCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const getColor = useCallback(() => {
    const count = renderCountRef.current;
    return COLOR_MAP[count] || Colors.red;
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

  return (
    <OriginalView
      style={[styles.colorLayer, {borderColor: getColor()}]}
      pointerEvents="box-none"
    />
  );
}

const styles = ReactNative.StyleSheet.create({
  colorLayer: {
    borderWidth: 3,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export function traceFor(OriginalComponent: React.ComponentType) {
  const TraceComponent = ({
    children,
    ...props
  }: React.PropsWithChildren<any>) => {
    return (
      <OriginalComponent {...props}>
        <RenderTrace />
        {children}
      </OriginalComponent>
    );
  };

  Object.assign(TraceComponent, OriginalComponent);

  return TraceComponent;
}

export function renderTrace() {
  Object.defineProperty(ReactNative, 'View', {
    value: traceFor(OriginalView),
  });

  Object.defineProperty(ReactNative, 'TouchableOpacity', {
    value: traceFor(OriginalTouchableOpacity),
  });
}
