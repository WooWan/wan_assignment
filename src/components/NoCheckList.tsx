import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function NoCheckList() {
  return (
    <View style={style.container}>
      <Image
        source={require('../assets/Checklists.png')}
        width={190}
        height={140}
      />
      <Text>No checklists</Text>
      <Text>Add checklists that should be checked weekly.</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});

export default NoCheckList;
