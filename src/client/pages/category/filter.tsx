import React, { useEffect, useState } from "react";
import { selectImgUrl } from "../../redux/config/index";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import {
  onLoaded,
  onLoading,
  selectWindowSize,
} from "../../redux/control/slice";
import { QueryProps } from "../../utils/types";
import { categories } from "../../utils/contents/categories";
import CategoryTitle from "../../components/shopping/CategoryTitle";
import FilterMenu from "../../components/shopping/Filter/FilterMenu";
import {
  ICategoryList,
  ICatFilter,
  selectCategoryList,
} from "../../redux/config/slice";
import { getCategoryById } from "../../redux/config/thunk";
import { createPathList } from "../../utils/createPathList";

const Filter = () => {
  const router = useNavigate();
  const location=useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const windowSize = useAppSelector(selectWindowSize);
  const categoryList = useAppSelector(selectCategoryList);
  const [pathLevel, setPathLevel] = useState<number>(0);
  const [deptList, setDeptList] = useState<ICategoryList[]>([]);
  const [segmentList, setSegmentList] = useState<ICategoryList[]>([]);
  const [typeList, setTypeList] = useState<ICategoryList[]>([]);
  const [query, setQuery] = useState<QueryProps>({
    category: { path: undefined, name: undefined, id: undefined },
    dept: { path: undefined, name: undefined, id: undefined },
    segment: { path: undefined, name: undefined, id: undefined },
    type: { path: undefined, name: undefined, id: undefined },
  });
  const [catFilterList, setCatFilterList] = useState<ICatFilter[]>([]);
  

  useEffect(() => {
    dispatch(onLoading());
    const router = useNavigate();
    const pathList = location.pathname.split("/");
    const removedPath = pathList.splice(0, 4);
    setPathLevel(pathList.length);

    
    if (categoryList.length > 0) {
      const catPath = createPathList(
        categoryList,
        pathList,
        setDeptList,
        setSegmentList,
        setTypeList
      );
      setQuery(catPath);

      const getFilterItems = async () => {
        const pathArr = [
          catPath.category.id,
          catPath.dept.id,
          catPath.segment.id,
          catPath.type.id,
        ].filter((arr) => arr != undefined);
        if (pathArr.length > 1) {
          const result = await dispatch(
            getCategoryById(pathArr[pathArr.length - 1] ?? 0)
          );
          if (result.payload) {
            // console.log(result.payload);
            setCatFilterList(result.payload);
          }
        }
        dispatch(onLoaded());
      };
      getFilterItems();
    }
    dispatch(onLoaded());
  }, [location.pathname]);

  useEffect(() => {
    if (windowSize === "laptop") {
      router({
        pathname: "/category",
      });
    }
  }, [router, windowSize]);

  return (
    <div className='mb-16 min-h-[64vh] lg:h-auto'>
      <CategoryTitle filter={true} />
      {catFilterList.length > 0 && (
        <FilterMenu
          level={pathLevel}
          query={query}
          router={router}
          segmentList={segmentList}
          typeList={typeList}
          catFilterInfo={catFilterList[0]}
        />
      )}
    </div>
  );
};

export default Filter;
