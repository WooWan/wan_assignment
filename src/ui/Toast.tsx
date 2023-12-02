import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import {theme} from './theme';

interface ToastProps {
  message: string;
  duration?: number;
  isVisible: boolean;
  onPress: () => void;
}

const ToastComponent: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  isVisible,
  onPress,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }).start();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, fadeAnim, duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast]}>
      <Text style={styles.text}>{message}</Text>
      <TouchableOpacity onPress={onPress} style={styles.undoWrapper}>
        <Image source={require('../assets/redo.png')} style={styles.undoIcon} />
        <Text style={styles.undoContent}>Undo</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    padding: 12,
    height: 40,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },

  undoWrapper: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  undoIcon: {
    width: 18,
    height: 18,
  },
  undoContent: {
    color: theme.colors.primary,
  },
});

export default ToastComponent;
