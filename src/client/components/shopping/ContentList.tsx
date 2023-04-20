import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate,useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import {
  onCardLoaded,
  onCardLoading,
  onLoaded,
  onLoading,
  selectWindowSize,
  setKeepFilter,
} from "../../redux/control/slice";
import { QueryProps } from "../../utils/types";
import CategoryTitle from "./CategoryTitle";
import {
  selectCategoryList,
  ICategoryList,
  setCategoryPath,
  ICatFilter,
} from "../../redux/config/slice";
import FilterMenu from "./Filter/FilterMenu";
import LowerBanner from "../home/LowerBanner";
import FilteredResults from "./Filter/FilteredResults";
import UpDownSvg from "../../public/mobile/up-down";
import FilterButton from "./Filter/FilterButton";
import ItemCard from "./Product/ItemCard";
import { useGridCols } from "../../hook/useGridCols";
import { useWindowDimensions } from "../../hook/useWindowDimensions";
import { IBannerImages } from "../../redux/config/slice";
import { getBannerImageApi, getCategoryById } from "../../redux/config/thunk";

import {
  selectFilterList,
  IFilterList,
  IProductCard,
  setFilteringCategoriesId,
  resetFilterList,
} from "../../redux/shopping/slice";
import {
  getProductListApi,
  PRODUCT_LIST_PAGE_SIZE,
} from "../../redux/shopping/thunk";
import ReactPaginate from "react-paginate";
import CardLoading from "../common/CardLoading";
import { selectIsCardLoading } from "../../redux/control/slice";
import { Fragment } from "react";
import Loading from "../common/Loading";
import { createPathList } from "../../utils/createPathList";

export const filterOptions = [
  { name: "hot", laptopName: "熱門", mobileName: "熱門", img: "" },
  { name: "new", laptopName: "最新", mobileName: "最新", img: "" },
  {
    name: "psp_desc",
    laptopName: "價格",
    mobileName: "價錢高至低",
    img: "/common/arrow/down-arrow.png",
  },
  {
    name: "psp_asc",
    laptopName: "價格",
    mobileName: "價錢低至高",
    img: "/common/arrow/up-arrow.png",
  },
];

type TitleProps = {
  category: string | undefined;
  dept: string | undefined;
  segment: string | undefined;
  type: string | undefined;
};

const ContentList = () => {
  const router = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const windowType = useAppSelector(selectWindowSize);
  const categoryList = useAppSelector(selectCategoryList);
  const filterList = useAppSelector(selectFilterList);
  const isCardLoading = useAppSelector(selectIsCardLoading);
  const keepFilter = useAppSelector((state) => state.control.isKeepFilter);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>("");
  const [pathLevel, setPathLevel] = useState<number>(0);
  const [totalCount, setTotalCount] = useState(0);
  const [deptList, setDeptList] = useState<ICategoryList[]>([]);
  const [segmentList, setSegmentList] = useState<ICategoryList[]>([]);
  const [typeList, setTypeList] = useState<ICategoryList[]>([]);
  const [query, setQuery] = useState<QueryProps>({
    category: { path: undefined, name: undefined, id: undefined },
    dept: { path: undefined, name: undefined, id: undefined },
    segment: { path: undefined, name: undefined, id: undefined },
    type: { path: undefined, name: undefined, id: undefined },
  });
  const [banners, setBanners] = useState<IBannerImages[]>([]);
  const [catFilterList, setCatFilterList] = useState<ICatFilter[] | null>(null);
  const [productCard, setProductCards] = useState<IProductCard[] | null>(null);
  // const [keepFilter, setKeepFilter] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowDimensions = useWindowDimensions();
  const [currentItems, setCurrentItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [onPage, setOnPage] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  useLayoutEffect(() => {
    const searchPost = async () => {
      dispatch(onCardLoading());
      // setProductCards(null);

      // console.log("call api when detect filter list: ", filterList);
      const result = await dispatch(getProductListApi({ ...filterList }));
      if (result.payload.items) {
        setCurrentItems(result.payload.current_page - 1);
        setItemsPerPage(result.payload.current_page_count);
        setPageCount(result.payload.total_page);
        setTotalCount(result.payload.total_count);
        setProductCards(result.payload.items);
      }
      setTimeout(() => {
        dispatch(onCardLoaded());
      }, 700);
    };

    if (keepFilter || onPage) searchPost();
  }, [filterList, keepFilter]);

  const handlePageClick = async (event: any) => {
    dispatch(onCardLoading());
    if (typeof window != "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    // console.log("filterList", filterList);
    const searchParam: IFilterList = {
      categories: [...filterList.categories],
      brands: [...filterList.brands],
      countries: [...filterList.countries],
      subCategories: [...filterList.subCategories],
      sort: "",
      currentPage: event.selected + 1,
    };
    const result = await dispatch(getProductListApi(searchParam));
    if (result.payload.items) {
      setProductCards(result.payload.items);
    } else {
      setProductCards([]);
    }
    setTimeout(() => {
      dispatch(onCardLoaded());
    }, 1000);
  };

  useEffect(() => {
    const pathList = location.pathname.split("?")[0].split("/");
    const removedPath = pathList.splice(0, 2);
    setPathLevel(pathList.length);
    if (categoryList.length > 0) {
      dispatch(onLoading());
      dispatch(onCardLoading());
      // setProductCards(null);

      const catPath = createPathList(
        categoryList,
        pathList,
        setDeptList,
        setSegmentList,
        setTypeList
      );
      setQuery(catPath);
      dispatch(setCategoryPath(catPath));
      const getFilterItems = async () => {
        const pathArr = [
          catPath.category.id,
          catPath.dept.id,
          catPath.segment.id,
          catPath.type.id,
        ].filter((arr) => arr != undefined);
        // console.log("path id arr: ", pathArr);

        if (pathArr.length > 1) {
          const result = await dispatch(
            getCategoryById(pathArr[pathArr.length - 1] ?? 0)
          );
          if (result.payload) {
            setCatFilterList(result.payload);
          }
        }
        dispatch(onLoaded());
        setCategoryId(pathArr[pathArr.length - 1] ?? 0);

        const searchParam: IFilterList = {
          categories: [pathArr[pathArr.length - 1] ?? 0],
          brands: [], //[...filterList.brands],
          countries: [], //[...filterList.countries],
          subCategories: [],
          sort: "",
          currentPage: 0,
        };
        if (!keepFilter) {
          dispatch(resetFilterList());
          dispatch(setFilteringCategoriesId(pathArr[pathArr.length - 1] ?? 0));
          const result = await dispatch(getProductListApi(searchParam));
          if (result.payload.items) {
            setCurrentItems(result.payload.current_page - 1);
            setItemsPerPage(result.payload.current_page_count);
            setPageCount(result.payload.total_page);
            setTotalCount(result.payload.total_count);
            setProductCards(result.payload.items);
          } else {
            setTotalCount(0);
            setProductCards([]);
          }
        }
        setOnPage(true);
        dispatch(setKeepFilter(false));
        setTimeout(() => {
          dispatch(onCardLoaded());
        }, 700);
      };
      getFilterItems();
    }

    const getBanners = async () => {
      if (pathList[0] && !pathList[1]) {
        const otherBanners = await getBannerImageApi(pathList[0]);
        setBanners(otherBanners);
      }
    };
    getBanners();
  }, [router, categoryList]);

  console.log("cat filter info in content list: ", catFilterList);
  console.log("product card list", productCard);
  console.log("filter list in redux: ", filterList);
  console.log("keep filter: ", keepFilter, onPage);
  console.log("category id: ", categoryId);

  return (
    <>
    {/* pathLevel > 1 && */}
      <Loading isLoading={ catFilterList == null} />
      <div className='h-auto'>
        {/* Title */}
        <CategoryTitle query={query} />

        {/* Filter Box */}
        <div className='w-full h-auto px-1 mb-4 transition-all duration-300 ease-in-out rangeLg:px-20 rangeXl:px-24 2xl:px-48 lg:bg-grey-light lg:mb-6'>
          {/* Level 1 */}
          {pathLevel == 1 && (
            <div className='grid grid-cols-3 mx-auto rangeXl:grid-cols-4 2xl:grid-cols-5'>
              {deptList.length > 0 &&
                deptList.map((dept: any, idx: number) => (
                  <Link
                    key={`dept-tab-laptop-${idx}`}
                    to={`/category/${dept.url_path}`}
                  >
                    <div className='mx-1 my-1 p-1 lg:m-0 border-[1px] lg:h-20 lg:p-4 lg:px-5 bg-white h-16 border-[#E5E5E5] cursor-pointer group rounded-md lg:rounded-none hover:bg-yata-mid-light hover:border-yata-deep'>
                      <div className='flex items-center w-full'>
                        <div className='w-4/5 overflow-scroll text-xs font-bold whitespace-pre-wrap lg:mr-4 scrollbar-hide lg:overflow-hidden lg:w-auto lg:tracking-widest lg:text-base'>
                          {dept.name}
                        </div>
                        <div className='w-1/5 lg:w-auto border-[1px] px-1 lg:px-2 lg:min-w-[2.25rem] flex justify-center font-semibold lg:font-normal rounded-sm border-[#E5E5E5] text-xs'>
                          {dept.product_count}
                        </div>
                      </div>
                      <div className='text-sm lg:tracking-wider'>
                        {/*dept.name*/}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          {onLaptop && (
            <>
              {/* Level 2-4 */}
              {/* Product row */}
              {pathLevel > 1 && catFilterList && catFilterList.length > 0 && (
                <FilterMenu
                  level={pathLevel}
                  query={query}
                  router={router}
                  segmentList={segmentList}
                  typeList={typeList}
                  catFilterInfo={catFilterList[0]}
                />
              )}
            </>
          )}
        </div>
        {categoryList.length > 0 && pathLevel > 0 && (
          <>
            {/* Banner group */}
            {pathLevel == 1 && (
              <>
                {/* <Loading isLoading={pathLevel == 1 && banners.length == 0} /> */}
                <div className='w-full px-2 mb-4 rangeLg:px-20 rangeXl:px-24 2xl:px-48 lg:mb-8'>
                  <LowerBanner images={banners} />
                </div>
              </>
            )}

            {/* Filtered results */}
            {onLaptop &&
              pathLevel > 1 &&
              catFilterList &&
              catFilterList.length > 0 && (
                <FilteredResults catFilterInfo={catFilterList[0]} />
              )}
            <div className='w-full h-auto mb-4 transition-all ease-in-out rangeLg:px-20 rangeXl:px-24 2xl:px-48'>
              <div className='flex items-center justify-between h-16 px-3 mb-2 text-lg font-bold'>
                <div
                  className={`transition-all ease-out duration-300 ${
                    isCardLoading || totalCount == 0
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                >
                  {totalCount} 件產品
                </div>

                {/* Mobile filter box and button */}
                <div className='relative flex lg:hidden'>
                  <button
                    className='box-border flex items-center justify-center w-8 h-8 mr-2 border-[1px] rounded-md border-yata-brown'
                    onClick={() => {
                      dispatch(setKeepFilter(true));
                      router({ pathname: '/category/filter', search: location.pathname })
                    }}
                  >
                    <img
                      src={"/mobile/more-detail.svg"}
                      className='h-2 w-4'
                    />
                  </button>
                  <button
                    className='box-border flex items-center justify-center w-8 h-8 transition-all duration-300 ease-in-out border rounded-md border-yata-brown'
                    style={{ backgroundColor: openModal ? "#82A90E" : "#FFF" }}
                    onClick={() => {
                      setOpenModal(!openModal);
                    }}
                  >
                    <UpDownSvg openModal={openModal} />
                  </button>

                  <div
                    className='absolute right-0 z-20 w-40 p-1 transition-all duration-300 ease-in-out bg-white border rounded-md top-8 border-yata-brown'
                    style={
                      openModal
                        ? {
                            visibility: "visible",
                            opacity: 1,
                          }
                        : {
                            visibility: "hidden",
                            opacity: 0,
                            pointerEvents: "none",
                          }
                    }
                  >
                    {filterOptions.map((option, idx) => (
                      <FilterButton
                        key={`filter-option-mobile-${idx}`}
                        setOpenModal={setOpenModal}
                        setFilterText={setFilterText}
                        filterText={filterText}
                        setProductCards={setProductCards}
                        name={option.name}
                        buttonText={option.mobileName}
                        buttonImg={option.img}
                      />
                    ))}
                  </div>
                </div>

                {/* Laptop filter button */}
                <div
                  className={`hidden space-x-4 lg:flex transition-opacity duration-300 ease-in-out ${
                    isCardLoading || totalCount == 0
                      ? "opacity-0"
                      : "opacity-100"
                  } `}
                >
                  {filterOptions.map((option, idx) => (
                    <FilterButton
                      key={`filter-option-laptop-${idx}`}
                      setFilterText={setFilterText}
                      filterText={filterText}
                      setProductCards={setProductCards}
                      name={option.name}
                      buttonText={option.laptopName}
                      buttonImg={option.img}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className='w-full h-auto mb-12 transition-all ease-in-out underXs:px-4 rangeXs:px-6 rangeSm:px-8 rangeMd:px-6 rangeLg:px-20 rangeXl:px-24 2xl:px-48'>
              <div
                className='flex flex-wrap items-start justify-center w-full transition-all duration-200 ease-in-out lg:justify-start'
                ref={containerRef}
              >
                <div
                  className='grid flex-wrap justify-center w-full grid-cols-2 gap-1 transition-all duration-200 ease-in-out lg:flex underSm:flex sm:justify-start rangeMd:grid-cols-4 underXs:grid-cols-1 rangeSm:grid-cols-3'
                  // style={{
                  //   gridTemplateColumns: onLaptop
                  //     ? `repeat(${currentCols}, minmax(0, 1fr))`
                  //     : gridCols,
                  // }}
                >
                  {(isCardLoading || productCard == null) &&
                    [...Array(20)].map((_, idx) => (
                      <Fragment key={`skeleton-card-${idx}`}>
                        <CardLoading />
                      </Fragment>
                    ))}
                  {productCard &&
                    productCard.length > 0 &&
                    productCard.map((card, idx) => (
                      <div
                        key={`product-card-${card.plu}-${idx}`}
                        className={
                          "flex justify-center transition-all duration-500 ease-in-out " +
                          (isCardLoading
                            ? "opacity-0 pointer-events-none "
                            : "opacity-100")
                        }
                      >
                        <ItemCard
                          detail={card}
                          cardRef={cardRef}
                          categoryId={categoryId}
                        />
                      </div>
                    ))}
                </div>
                {productCard && productCard.length == 0 && (
                  <div
                    className={
                      "flex items-center justify-center w-full px-6 text-lg font-bold text-center transition-all duration-300 ease-in-out " +
                      (isCardLoading
                        ? "h-0 invisible opacity-0"
                        : "h-60 lg:h-40 visible opacity-100")
                    }
                  >
                    不好意思，我們未能找到符合你篩選的結果，請重新再試。
                  </div>
                )}
                <div className='pagination-container'>
                  {productCard && productCard.length > 0 && (
                    <ReactPaginate
                      breakLabel='...'
                      nextLabel=' >'
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      previousLabel='< '
                      forcePage={currentItems}
                      marginPagesDisplayed={1}
                      containerClassName='pagination'
                      activeClassName='active'
                      previousClassName='pagination-item'
                      nextClassName='pagination-item'
                      activeLinkClassName='active'
                      pageLinkClassName='pagination-item'
                      // renderOnZeroPageCount={1}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContentList;
