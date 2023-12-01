import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import CheckListHeader from './src/components/ChecklistHeader';

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
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <CheckListHeader
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
          selectWeek={selectWeek}
          selectedWeek={selectedWeek}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    height: '100%',
  },
});

export default App;
