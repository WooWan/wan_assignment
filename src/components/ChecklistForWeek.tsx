import React, {useCallback, useMemo} from 'react';
import {CheckItem} from '../types/checklist';
import {FlatList, ListRenderItem} from 'react-native';
import CheckListItem from './CheckListItem';
import NoCheckList from './NoCheckList';
import ProgressBar from './ProgressBar';

type Props = {
  checklist: CheckItem[];
  week: number;
  isEditMode: boolean;
  handleDeleteChecklist: (id: string) => void;
  toggleCheckList: (id: string) => void;
};
function ChecklistForWeek({
  checklist,
  week,
  isEditMode,
  handleDeleteChecklist,
  toggleCheckList,
}: Props) {
  const checklistForWeek = useMemo(
    () => checklist?.filter(item => item.weekNumber === week),
    [checklist, week],
  );
  const completedCount = useMemo(
    () => checklistForWeek?.filter(item => item.isCompleted).length,
    [checklistForWeek],
  );

  const renderCheckList: ListRenderItem<CheckItem> = useCallback(
    ({item, index}) => {
      return (
        <CheckListItem
          toggleCheckList={toggleCheckList}
          isEditMode={isEditMode}
          onDelete={handleDeleteChecklist}
          item={item}
          index={index}
        />
      );
    },
    [isEditMode, toggleCheckList, handleDeleteChecklist],
  );

  return (
    <>
      {checklistForWeek?.length === 0 ? (
        <NoCheckList />
      ) : (
        <>
          <ProgressBar
            total={checklistForWeek.length}
            completedCount={completedCount}
          />
          <FlatList
            data={checklistForWeek}
            renderItem={renderCheckList}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </>
  );
}

export default ChecklistForWeek;
