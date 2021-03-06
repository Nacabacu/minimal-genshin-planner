import { Dispatch, PropsWithoutRef, SetStateAction, useEffect, useState } from 'react';
import { Element, elements, WeaponType, weaponTypes } from '../../types/data';
import { useLocalizationContext } from '../contexts/localizationContext';
import ImageIcon, { IconType } from './ImageIcon';

export interface FilterData {
  elementFilters: Element[];
  weaponTypeFilters: WeaponType[];
}

interface FilterGroupProps {
  onChange: (filter: FilterData) => void;
  className: string;
}

interface RenderOptionsProps<T> {
  options: readonly T[];
  currentFilter: T[];
  setCurrentFilter: Dispatch<SetStateAction<T[]>>;
  className?: string;
}

function FilterOptions<T extends Element | WeaponType>({
  options,
  currentFilter,
  setCurrentFilter,
  className,
}: PropsWithoutRef<RenderOptionsProps<T>>) {
  return (
    <div className={`space-x-1 ${className}`}>
      {options.map((option) => {
        const isSelected = currentFilter.includes(option);

        return (
          <button
            key={option}
            type="button"
            onClick={() => {
              setCurrentFilter((currentFilterOptions) => {
                if (currentFilterOptions.includes(option)) {
                  return currentFilterOptions.filter((filterOptions) => filterOptions !== option);
                }

                return [...currentFilterOptions, option];
              });
            }}
            className={`rounded p-1 ${
              isSelected
                ? 'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400'
                : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500'
            }`}
          >
            <ImageIcon id={option} type={IconType.Icons} className="h-8" />
          </button>
        );
      })}
    </div>
  );
}

function FilterGroup({ onChange, className }: PropsWithoutRef<FilterGroupProps>) {
  const { resources } = useLocalizationContext();
  const [elementFilters, setElementFilters] = useState<Element[]>([]);
  const [weaponTypeFilters, setWeaponTypeFilter] = useState<WeaponType[]>([]);
  const renderResetFilter = () => (
    <span
      className="cursor-pointer hover:underline"
      onClick={() => {
        setElementFilters([]);
        setWeaponTypeFilter([]);
      }}
    >
      {resources.reset}
    </span>
  );

  useEffect(() => {
    onChange({
      elementFilters,
      weaponTypeFilters,
    });
  }, [onChange, elementFilters, weaponTypeFilters]);

  return (
    <div className={`flex flex-col items-end ${className}`}>
      <FilterOptions options={weaponTypes} currentFilter={weaponTypeFilters} setCurrentFilter={setWeaponTypeFilter} />
      <div className="flex flex-wrap-reverse items-center justify-end gap-2">
        {renderResetFilter()}
        <FilterOptions
          options={elements.filter((element) => element !== 'dendro')}
          currentFilter={elementFilters}
          setCurrentFilter={setElementFilters}
          className="mt-1"
        />
      </div>
    </div>
  );
}

export default FilterGroup;
