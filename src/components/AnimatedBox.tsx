import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedBox = () => {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value},
      {rotate: `${rotation.value}deg`},
    ],
  }));

  const handlePress = () => {
    offset.value = withSpring(offset.value === 0 ? 100 : 0);
    rotation.value = withSpring(rotation.value === 0 ? 360 : 0);
  };

  const handleContinuous = () => {
    offset.value = withRepeat(
      withTiming(100, {duration: 1000}),
      -1,
      true,
    );
    rotation.value = withRepeat(
      withTiming(360, {duration: 1000}),
      -1,
      false,
    );
  };

  const handleReset = () => {
    offset.value = withSpring(0);
    rotation.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text style={styles.boxText}>Animated</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Animate Once</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleContinuous}>
          <Text style={styles.buttonText}>Loop Animation</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AnimatedBox;
