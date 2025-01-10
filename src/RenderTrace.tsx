import React, {useEffect, useRef, useState} from 'react';
import ReactNative from 'react-native';

const OriginalView = ReactNative.View;
const OriginalImage = ReactNative.Image;
const OriginalTouchableOpacity = ReactNative.TouchableOpacity;

const getMockContainer = (OriginalComponent: React.ComponentType) => {
  const FunctionalContainer = ({
    children,
    ...props
  }: React.PropsWithChildren<any>) => {
    return (
      <OriginalComponent {...props}>
        <HighlightComponent />
        {children}
      </OriginalComponent>
    );
  };
  FunctionalContainer.displayName = 'View';

  return FunctionalContainer;
};

const ViewMock = (props: any) => {
  return (
    <OriginalView {...props}>
      <HighlightComponent />
      {props.children}
    </OriginalView>
  );
};
ViewMock.displayName = 'View';

const ImageMock = (props: any) => {
  return (
    <OriginalView style={{position: 'relative'}}>
      <OriginalImage {...props} />
      <HighlightComponent />
    </OriginalView>
  );
};
ImageMock.displayName = 'View';

const HighlightComponent = () => {
  const [, setForceUpdate] = useState({});
  const renderCountRef = useRef(0);
  const flagRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const getColor = () => {
    const count = renderCountRef.current;
    if (count === 0) return 'transparent';
    if (count === 1) return '#2ecc71'; // green
    if (count === 2) return '#f1c40f'; // yellow
    if (count === 3) return '#f39c12'; // orange
    return '#e74c3c'; // red
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
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  return <OriginalView style={colorLayerStyle} pointerEvents="box-none" />;
};

export function init() {
  Object.defineProperty(ReactNative, 'View', {
    value: getMockContainer(OriginalView),
  });

  Object.defineProperty(ReactNative, 'TouchableOpacity', {
    value: getMockContainer(OriginalTouchableOpacity),
  });
}
