import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
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
  const [isVisiable, setIsVisiable] = useState(false);
  const invisibleInputRef = useRef<TextInput>(null);
  const [input, setInput] = useState('');

  function handleDeleteChecklist(id: string) {
    const updatedCheckList = checklist?.filter(item => item.id !== id);
    setChecklist(updatedCheckList);
  }

  function handleAddCheckList() {
    invisibleInputRef.current && invisibleInputRef.current.focus();
    setIsVisiable(true);
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

  const handleAddChecklist = () => {
    setChecklist(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        content: input,
        isCompleted: false,
        weekNumber: week,
      },
    ]);

    setInput('');
    setIsVisiable(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={[styles.container]} behavior={'padding'}>
      <ChecklistForWeek
        handleDeleteChecklist={handleDeleteChecklist}
        checklist={checklist}
        week={week}
        isEditMode={isEditMode}
        toggleCheckList={toggleCheckList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCheckList}>
        <Image style={styles.addIcon} source={require('../assets/Plus.png')} />
      </TouchableOpacity>
      <View style={[styles.inputWrapper, !isVisiable && styles.invisible]}>
        <View style={styles.innerWrapper}>
          <TextInput
            selectionColor={theme.colors.primary}
            ref={invisibleInputRef}
            placeholderTextColor={'#B4B4B4'}
            style={styles.input}
            editable={true}
            value={input}
            onEndEditing={() => setIsVisiable(false)}
            onChangeText={setInput}
            placeholder="Add a checklist..."
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleAddChecklist}>
            <Image
              source={require('../assets/Arrowup.png')}
              style={styles.uploadIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingVertical: 30,
    borderColor: '#F6F5F8',
    borderWidth: 1,
    marginBottom: 20,
    zIndex: 30,
    backgroundColor: 'white',
  },
  innerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EAE9ED',
    paddingRight: 5,
  },
  uploadButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    height: 42,
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
  invisible: {
    display: 'none',
  },
  uploadIcon: {
    width: 18,
    height: 18,
  },
  addIcon: {
    width: 26,
    height: 26,
  },
});

export default CheckLists;
