import React from "react";
import XMarkSvg from "../../../public/common/xmark";
import { ICatFilter } from "../../../redux/config/slice";
import { onCardLoading } from "../../../redux/control/slice";
import { selectImgUrl } from "../../../redux/config/index";
import {
  resetFilterList,
  selectFilterCatList,
  selectFilterList,
  setFilteringBrands,
  setFilteringSubCategories,
  setFilteringCountries,
} from "../../../redux/shopping/slice";
import { useAppSelector, useAppDispatch } from "../../../redux/store";

type Props = {
  catFilterInfo: ICatFilter;
};

const FilteredResults = ({ catFilterInfo }: Props) => {
  const imgUrl = useAppSelector(selectImgUrl);
  const { children, source_from, brand_name } = catFilterInfo;
  const dispatch = useAppDispatch();
  const filterList = useAppSelector(selectFilterList);
  const filterCatList = useAppSelector(selectFilterCatList);

  const genCatText = (id: number) => {
    const cat = children.find((cat) => cat.id == id);
    return cat?.name;
  };

  return (
    <div
      className='flex flex-wrap items-center w-full transition-all duration-300 ease-in-out rangeLg:px-20 rangeXl:px-24 2xl:px-48 lg:mb-8'
      style={{
        minHeight:
          filterCatList.length > 0 ||
          filterList.brands.length > 0 ||
          filterList.countries.length > 0
            ? "3.5rem"
            : 0,
      }}
    >
      {(filterCatList.length > 0 ||
        filterList.brands.length > 0 ||
        filterList.countries.length > 0) && (
        <>
          <span className='mb-2 mr-2 font-bol'>搜索結果：</span>

          {filterCatList.length > 0 &&
            filterCatList.map((cat, idx) => (
              <div
                className='flex items-center h-12 border-[1px] rounded-lg border-yata-medium mr-3 mb-2'
                key={"filter-option-category-" + idx}
              >
                <div className='px-2'>
                  <span className='mr-2'>產品類別:</span>
                  <span>{cat.name}</span>
                </div>
                <div
                  className='w-8 border-l-[1px] h-full flex cursor-pointer items-center justify-center border-yata-medium'
                  onClick={() =>
                    dispatch(
                      setFilteringSubCategories({ name: cat.name, id: cat.id })
                    )
                  }
                >
                  <div className='flex items-center w-3 h-3'>
                    <XMarkSvg fill='#6A3B0D' />
                  </div>
                </div>
              </div>
            ))}

          {filterList.brands.length > 0 &&
            filterList.brands.map((brand, idx) => (
              <div
                className='flex items-center h-12 border-[1px] rounded-lg border-yata-medium mr-3 mb-2'
                key={"filter-option-brand-" + idx}
              >
                <div className='px-2'>
                  <span className='mr-2'>品牌:</span>
                  <span>{brand}</span>
                </div>
                <div
                  className='w-8 border-l-[1px] h-full flex cursor-pointer items-center justify-center border-yata-medium'
                  onClick={() => dispatch(setFilteringBrands(brand))}
                >
                  <div className='flex items-center w-3 h-3'>
                    <XMarkSvg fill='#6A3B0D' />
                  </div>
                </div>
              </div>
            ))}

          {filterList.countries.length > 0 &&
            filterList.countries.map((country, idx) => (
              <div
                className='flex items-center h-12 border-[1px] rounded-lg border-yata-medium mr-3 mb-2'
                key={"filter-option-country-" + idx}
              >
                <div className='px-2'>
                  <span className='mr-2'>出產地:</span>
                  <span>{country}</span>
                </div>
                <div
                  className='w-8 border-l-[1px] h-full flex cursor-pointer items-center justify-center border-yata-medium'
                  onClick={() => dispatch(setFilteringCountries(country))}
                >
                  <div className='flex items-center w-3 h-3'>
                    <XMarkSvg fill='#6A3B0D' />
                  </div>
                </div>
              </div>
            ))}

          <div
            className='text-red-remove border-b-[1px] border-red-remove py-[0.5px] cursor-pointer mb-2 space-x-1 flex items-center'
            onClick={() => {
              dispatch(onCardLoading());
              dispatch(resetFilterList());
            }}
          >
            <div className='relative w-4 h-4'>
              <img src={imgUrl+'/cart/10.png'} className="object-contain" />
            </div>
            <span>清除全部搜索條件</span>
          </div>
        </>
      )}
    </div>
  );
};

export default FilteredResults;
