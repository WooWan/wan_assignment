import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {theme} from '../ui/theme';
import {CheckItem} from '../types/checklist';

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
  index,
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
          <View
            style={[
              styles.checkWrapper,
              isCompleted && styles.completedCheckWrapper,
            ]}>
            <Image
              width={16}
              height={16}
              source={require('../assets/Check.png')}
            />
          </View>
        )}
        <View style={styles.wrapper}>
          <Text style={isCompleted && styles.completed}>{item.content}</Text>
        </View>
        {isEditMode && (
          <TouchableHighlight
            style={styles.deleteWrapper}
            onPress={() => onDelete(item.id)}>
            <Image
              width={16}
              height={16}
              source={require('../assets/Minus.png')}
            />
          </TouchableHighlight>
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
});
