import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckItem} from '../types/checklist';
import checkListData from '../data/checklist_seeds.json';
import ChecklistForWeek from './ChecklistForWeek';
import {theme} from '../ui/theme';

type Props = {
  isEditMode: boolean;
  week: number;
};

function CheckLists({isEditMode, week}: Props) {
  const [checklist, setChecklist] = useState<CheckItem[]>(checkListData);
  const invisibleInputRef = useRef<TextInput>(null);

  function handleDeleteChecklist(id: string) {
    const updatedCheckList = checklist?.filter(item => item.id !== id);
    setChecklist(updatedCheckList);
  }

  function handleAddCheckList() {
    invisibleInputRef.current && invisibleInputRef.current.focus();
  }
  const toggleCheckList = useCallback(
    (id: string) => {
      const updatedCheckList = checklist?.map(item => {
        if (item.id === id) {
          return {...item, isCompleted: !item.isCompleted};
        }
        return item;
      });

      setChecklist(updatedCheckList);
    },
    [checklist],
  );

  return (
    <View style={styles.container}>
      <ChecklistForWeek
        handleDeleteChecklist={handleDeleteChecklist}
        checklist={checklist}
        week={week}
        isEditMode={isEditMode}
        toggleCheckList={toggleCheckList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCheckList}>
        <Image source={require('../assets/Plus.png')} />
      </TouchableOpacity>
      <TextInput
        ref={invisibleInputRef}
        style={styles.input}
        editable={true}
        keyboardType="default"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: 0,
    height: 0,
    position: 'absolute', // Position off-screen
  },
  addButton: {
    position: 'absolute',
    bottom: 4,
    right: 20,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: '#fff',
  },
});

export default CheckLists;
