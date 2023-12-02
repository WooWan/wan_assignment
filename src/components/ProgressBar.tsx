import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {theme} from '../ui/theme';

type Props = {
  total: number;
  completedCount: number;
};

const ProgressBar = ({total, completedCount}: Props) => {
  const progress = (completedCount / total) * 100;
  const cardWidth = useSharedValue(progress);
  const animatedStyles = useAnimatedStyle(() => ({
    width: `${cardWidth.value}%`,
  }));

  useEffect(() => {
    cardWidth.value = withSpring(progress, {
      overshootClamping: true,
    });
  }, [progress, cardWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>
          {completedCount} of {total} completed
        </Text>
        <Text>{progress.toFixed(0)}%</Text>
      </View>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.inner, animatedStyles]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 17,
  },
  wrapper: {
    backgroundColor: '#F6F5F8',
    borderRadius: 10,
  },
  inner: {
    height: 6,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});

export default ProgressBar;
