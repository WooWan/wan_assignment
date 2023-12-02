import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import CheckListHeader from './src/components/ChecklistHeader';
import CheckLists from './src/components/Checklist';

function App(): JSX.Element {
  const [selectedWeek, setSeletedWeek] = useState(15);
  const [isEditMode, setIsEditMode] = useState(false);

  function toggleEditMode() {
    setIsEditMode(!isEditMode);
  }

  function selectWeek(week: number) {
    setSeletedWeek(week);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.main}>
        <CheckListHeader
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
          selectWeek={selectWeek}
          selectedWeek={selectedWeek}
        />
        <CheckLists isEditMode={isEditMode} week={selectedWeek} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
});

export default App;
