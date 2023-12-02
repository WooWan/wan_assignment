import React, {useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../ui/theme';

type Props = {
  selectedWeek: number;
  selectWeek: (week: number) => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
};

function CheckListHeader({
  selectedWeek,
  selectWeek,
  isEditMode,
  toggleEditMode,
}: Props) {
  const scrollViewRef = useRef<ScrollView>(null);
  const itemWidth = 50;
  const gap = 15;
  const padding = 180;
  const middleWidth = Dimensions.get('window').width / 2;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const updatedIndex = Math.floor(
      (event.nativeEvent.contentOffset.x + middleWidth - padding) /
        (itemWidth + gap) +
        0.5,
    );
    selectWeek(updatedIndex);
  };

  const handleClickWeek = (index: number) => {
    const offset =
      index * itemWidth +
      (index - 1) * gap +
      middleWidth -
      padding +
      itemWidth / 2;
    scrollViewRef.current?.scrollTo({
      x: offset,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Checklists</Text>
        <Text onPress={toggleEditMode} style={styles.edit}>
          {isEditMode ? 'Done' : 'Edit'}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={50}
        snapToInterval={itemWidth + gap}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {[...Array(30).keys()].map(i => (
          <TouchableOpacity key={i} onPress={() => handleClickWeek(i)}>
            <View
              style={[styles.item, selectedWeek === i && styles.selectedItem]}>
              <Text
                style={[styles.week, selectedWeek === i && styles.selected]}>
                week
              </Text>
              <Text
                style={[styles.number, selectedWeek === i && styles.selected]}>
                {i + 1}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: 130,
    maxHeight: 130,
    flexGrow: 0,
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  edit: {
    position: 'absolute',
    right: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 180,
  },
  item: {
    width: 50,
    height: 62,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999999',
    backgroundColor: '#F6F5F8',
  },
  selectedItem: {
    backgroundColor: theme.colors.primary,
  },
  week: {
    fontSize: 11,
    color: '#999999',
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999999',
  },
  selected: {
    color: 'white',
  },
});

export default CheckListHeader;
