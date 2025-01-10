import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default MyComponent;
