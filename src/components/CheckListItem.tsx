import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {theme} from '../ui/theme';
import {CheckItem} from '../types/checklist';
import {MotiView} from 'moti';

type Props = {
  item: CheckItem;
  onDelete: (id: string) => void;
  isEditMode: boolean;
  index: number;
  toggleCheckList: (index: string) => void;
};

export default function CheckListItem({
  item,
  onDelete,
  isEditMode,
  toggleCheckList,
}: Props) {
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);

  function handleToggleCompletion() {
    setIsCompleted(!isCompleted);
    toggleCheckList(item.id);
  }

  return (
    <TouchableHighlight onPress={handleToggleCompletion}>
      <View style={[styles.container]}>
        {!isEditMode && (
          <MotiView
            from={{opacity: 0, left: -20}}
            animate={{opacity: 1, left: 0}}
            transition={{
              type: 'timing',
              duration: 400,
            }}>
            <View
              style={[
                styles.checkWrapper,
                isCompleted && styles.completedCheckWrapper,
              ]}>
              <Image
                source={require('../assets/Check.png')}
                style={styles.checkIcon}
              />
            </View>
          </MotiView>
        )}
        <View style={styles.wrapper}>
          <Text style={isCompleted && styles.completed}>{item.content}</Text>
        </View>
        {isEditMode && (
          <MotiView
            from={{opacity: 0, right: -20}}
            animate={{opacity: 1, right: 0}}
            style={styles.deleteWrapper}
            transition={{
              type: 'timing',
              duration: 400,
            }}>
            <TouchableHighlight onPress={() => onDelete(item.id)}>
              <Image
                source={require('../assets/Minus.png')}
                style={styles.minusIcon}
              />
            </TouchableHighlight>
          </MotiView>
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  completed: {
    color: '#C4C4C4',
    textDecorationLine: 'line-through',
  },
  checkWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  completedCheckWrapper: {
    backgroundColor: '#F0F0F0',
  },
  wrapper: {
    marginRight: 24,
  },
  deleteWrapper: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#FF5146',
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  minusIcon: {
    width: 16,
    height: 16,
  },
});
