import React, {useEffect, useMemo, useState} from 'react';
import {CheckItem} from '../types/checklist';
import {StyleSheet} from 'react-native';
import CheckListItem from './CheckListItem';
import NoCheckList from './NoCheckList';
import ProgressBar from './ProgressBar';
import Animated, {
  EntryAnimationsValues,
  ExitAnimationsValues,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  useSharedValue,
} from 'react-native-reanimated';
import {useDebounce} from '../utils/useDebounce';
import {FlashList} from '@shopify/flash-list';

type Props = {
  checklist: CheckItem[];
  week: number;
  isEditMode: boolean;
  handleDeleteChecklist: (id: string) => void;
  toggleCheckList: (id: string) => void;
};

const slideOutLeftAnimation = new SlideOutLeft().build();
const slideOutRightAnimation = new SlideOutRight().build();
const slideInLeftAnimation = new SlideInLeft().build();
const slideInRightAnimation = new SlideInRight().build();

function ChecklistForWeek({
  checklist,
  week,
  isEditMode,
  handleDeleteChecklist,
  toggleCheckList,
}: Props) {
  const debouncedWeek = useDebounce(week, 500);
  const checklistForWeek = useMemo(
    () => checklist?.filter(item => item.weekNumber === debouncedWeek + 1),
    [checklist, debouncedWeek],
  );
  const completedCount = useMemo(
    () => checklistForWeek?.filter(item => item.isCompleted).length,
    [checklistForWeek],
  );
  const [previousWeek, setPreviousWeek] = useState(week);
  const exitDirection = useSharedValue('left');

  useEffect(() => {
    setPreviousWeek(debouncedWeek);
  }, [debouncedWeek]);

  const CustomExitingAnimation = (values: ExitAnimationsValues) => {
    'worklet';

    return exitDirection.value === 'left'
      ? slideOutLeftAnimation(values)
      : slideOutRightAnimation(values);
  };
  const CustomEnteringAnimation = (values: EntryAnimationsValues) => {
    'worklet';

    return exitDirection.value === 'left'
      ? slideInRightAnimation(values)
      : slideInLeftAnimation(values);
  };

  useEffect(() => {
    if (week > previousWeek) {
      exitDirection.value = 'left';
    } else {
      exitDirection.value = 'right';
    }
  }, [week, previousWeek, exitDirection]);

  return (
    <Animated.View
      key={debouncedWeek}
      entering={CustomEnteringAnimation}
      exiting={CustomExitingAnimation}
      style={styles.container}>
      {checklistForWeek?.length !== 0 ? (
        <>
          <ProgressBar
            total={checklistForWeek.length}
            completedCount={completedCount}
          />
          <FlashList
            data={checklistForWeek}
            extraData={isEditMode}
            renderItem={item => (
              <CheckListItem
                item={item.item}
                isEditMode={isEditMode}
                onDelete={handleDeleteChecklist}
                toggleCheckList={toggleCheckList}
              />
            )}
            keyExtractor={item => item.id}
            estimatedItemSize={44}
          />
        </>
      ) : (
        <NoCheckList />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default ChecklistForWeek;
