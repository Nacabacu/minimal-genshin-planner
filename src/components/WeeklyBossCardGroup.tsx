import { useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import ItemCard from './ItemCard';

function WeeklyBossCardGroup() {
  const { resources } = useLocalizationContext();
  const {
    selectedMaterial,
    materialConfig: { weeklyBossGroup },
  } = useDataContext();

  const renderCard = (itemIdList: string[]) =>
    itemIdList.map((itemId) => {
      const characterIdList = selectedMaterial.weeklyBoss[itemId];
      if (!characterIdList || characterIdList.length === 0) return null;

      return <ItemCard key={itemId} itemId={itemId} characterIdList={characterIdList} />;
    });

  const renderGroup = () =>
    Object.keys(weeklyBossGroup).map((key) => (
      <div key={key} className="flex flex-col px-4 pt-4">
        <div className="mb-1 text-xl">{resources[key as ResourcesKey]}</div>
        <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {renderCard(weeklyBossGroup[key])}
        </div>
      </div>
    ));

  return <div>{renderGroup()}</div>;
}

export default WeeklyBossCardGroup;