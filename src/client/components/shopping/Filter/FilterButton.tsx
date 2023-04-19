import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IProductCard, selectFilterList } from "../../../redux/shopping/slice";
import { getProductListApi } from "../../../redux/shopping/thunk";
import useWindowSize from "../../../hook/useWindowSize";
import {
  onCardLoaded,
  onCardLoading,
  selectWindowSize,
} from "../../../redux/control/slice";

type Props = {
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  setFilterText: Dispatch<SetStateAction<string>>;
  setProductCards?: Dispatch<SetStateAction<IProductCard[] | null>>;
  filterText: string;
  name: string;
  buttonText: string;
  buttonImg: string;
};

const FilterButton = ({
  setOpenModal,
  setFilterText,
  setProductCards,
  filterText,
  name,
  buttonText,
  buttonImg,
}: Props) => {
  const dispatch = useAppDispatch();
  const filterList = useAppSelector(selectFilterList);
  const windowSize = useAppSelector(selectWindowSize);

  const toggleFilter = async () => {
    // setOpenModal(false)
    dispatch(onCardLoading());
    if (windowSize == "mobile") {
      setOpenModal!(false);
    }
    setFilterText(filterText == name ? "" : name);
    const result = await dispatch(
      getProductListApi({
        ...filterList,
        sort: filterText == name ? "" : name,
      })
    );
    if (result.payload.items) {
      setProductCards!(result.payload.items);
    } else {
      setProductCards!([]);
    }
    setTimeout(() => {
      dispatch(onCardLoaded());
    }, 1700);
  };

  return (
    <button
      className={`flex items-center justify-center gap-x-2 rounded-md lg:rounded-lg w-full lg:w-20 lg:text-base font-semibold lg:h-12 py-2 transition-all ease-in-out duration-300 ${
        filterText == name
          ? " bg-yata-deep text-white lg:bg-yata-second"
          : " bg-white lg:bg-[#C8BEB5] lg:text-[#482809]"
      }`}
      onClick={toggleFilter}
    >
      {buttonText}
      {buttonImg && <img src={buttonImg} alt='' className="w-3 h-3" />}
    </button>
  );
};

export default FilterButton;
