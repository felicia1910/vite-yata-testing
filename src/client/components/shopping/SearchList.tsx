import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import {
  onCardLoaded,
  onCardLoading,
  selectIsCardLoading,
  selectWindowSize,
} from "../../redux/control/slice";
import UpDownSvg from "../../public/mobile/up-down";
import { searchItemApi } from "../../redux/shopping/thunk";
import { onLoaded, onLoading } from "../../redux/control/slice";

type TitleProps = {
  param: string | string[] | undefined;
};
import Loading from "../common/Loading";
import ItemCard from "./Product/ItemCard";
import ReturnButton from "../common/ReturnButton";
import ReactPaginate from "react-paginate";
import CardLoading from "../common/CardLoading";
import { IProductCard } from "../../redux/shopping/slice";
import { filterOptions } from "./ContentList";
import FilterButton from "./Filter/FilterButton";
import { selectPickupStore } from "../../redux/delivery/slice";

let search: any;

const SearchList = ({ param }: TitleProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isCardLoading = useAppSelector(selectIsCardLoading);
  const windowType = useAppSelector(selectWindowSize);
  const pickupStore = useAppSelector(selectPickupStore);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [filterText, setFilterText] = useState<string>("");
  const [pageCount, setPageCount] = useState(0);
  const [products, setProducts] = useState<IProductCard[] | null>(null);

  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  useEffect(() => {
    searchProductApi();
  }, [param]);

  const handlePageClick = async (event: any) => {
    dispatch(onCardLoading());
    if (typeof window != "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
    const result = await searchItemApi(
      param as string,
      parseInt(event.selected) + 1,
      pickupStore
    );
    if (result.items) {
      setProducts(result.items);
    }
    setTimeout(() => {
      dispatch(onCardLoaded());
    }, 1700);
  };

  const searchProductApi = async () => {
    dispatch(onLoading());
    dispatch(onCardLoading());
    setProducts(null);
    try {
      const result = await searchItemApi(param as string, 1, pickupStore);
      if (result.length !== 0) {
        setProducts(result.items);
        setTotalCount(result.total_count);
        setCurrentPage(result.current_page - 1);
        setItemsPerPage(result.current_page_count);
        setPageCount(result.total_page);
        dispatch(onLoaded());
        // console.log("searchProductApi", result.length);
      } else {
        setProducts([]);
        dispatch(onLoaded());
        return;
      }
    } catch (error) {
      // console.log(error);
      dispatch(onLoaded());
    }
    setTimeout(() => {
      dispatch(onCardLoaded());
    }, 1700);
  };

  return (
    <div className='min-h-[60vh]'>
      <Loading isLoading={products == null} />
      <>
        {products && products.length > 0 && (
          <div className='w-full px-4 pt-8 mb-6 lg:mb-2 rangeLg:px-20 rangeXl:px-24 2xl:px-48'>
            <div className='space-x-2 text-xl font-semibold text-yata-deep'>
              <span>你的搜尋記錄 : </span>
              <span>{`< ${router.query.search} >`}</span>
            </div>
            <div className='flex items-center justify-between h-12 mb-2 text-lg font-bold'>
              <div>{totalCount} 件產品</div>

              {/* Mobile filter box and button */}
              {/* <div className='relative flex lg:hidden'>
                <button
                  className='box-border flex items-center justify-center w-8 h-8 mr-2 border-[1px] rounded-md border-yata-brown'
                  onClick={() => {
                    router.push({
                      pathname: "/category/filter",
                      query: router.asPath,
                    });
                  }}
                >
                  <Image
                    src={"/mobile/more-detail.svg"}
                    height={14}
                    width={20}
                  />
                </button>
                <button
                  className='box-border flex items-center justify-center w-8 h-8 border-[1px] rounded-md border-yata-brown transition-all ease-in-out duration-300'
                  style={{ backgroundColor: openModal ? "#82A90E" : "#FFF" }}
                  onClick={() => {
                    setOpenModal(!openModal);
                  }}
                >
                  <UpDownSvg openModal={openModal} />
                </button>

                <div
                  className='absolute right-0 z-20 top-8 w-40 p-1 bg-white border-[1px] rounded-md border-yata-brown transition-all ease-in-out duration-300'
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
                      setProductCards={setProducts}
                      name={option.name}
                      buttonText={option.mobileName}
                      buttonImg={option.img}
                    />
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        )}

        <div className='justify-center w-full '>
          {products && products.length == 0 && (
            <div className='self-start lg:bg-grey'>
              <div className='pt-16 rangeLg:px-16 rangeXl:px-24 2xl:px-40 lg:py-16'>
                <div className='flex text-center flex-col bg-white pt-[28px] pb-[120px] lg:py-[83px] underLg:px-10 lg:rounded-2xl items-center w-full'>
                  <div className='relative object-contain w-32 h-32'>
                    <Image src={`/common/icon-question.svg`} layout='fill' />
                  </div>
                  <h1 className='py-4 text-3xl font-semibold'>找不到產品</h1>
                  <h4 className='py-4 text-lg'>
                    不好意思，我們未能找到符合{` <`}
                    {param}
                    {`> `}的結果，請重新再試。
                  </h4>
                  <div className='w-full max-w-xs'>
                    <ReturnButton btnName='返回主頁' path='/' />
                  </div>
                </div>
              </div>
              <div className='grid flex-wrap justify-start w-full grid-cols-2 gap-1 rangeMd:grid-cols-4 underXs:grid-cols-1 rangeSm:grid-cols-3 lg:flex'></div>
            </div>
          )}
          {products && products.length > 0 && (
            <div className='w-full h-auto mb-12 transition-all ease-in-out rangeLg:px-20 rangeXl:px-24 2xl:px-48'>
              <div className='flex flex-wrap items-start justify-center w-full lg:justify-start'>
                <div className='grid flex-wrap justify-start w-full grid-cols-2 gap-1 rangeMd:grid-cols-4 underXs:grid-cols-1 rangeSm:grid-cols-3 lg:flex'>
                  {isCardLoading &&
                    [...Array(20)].map((_, idx) => (
                      <Fragment key={`skeleton-card-${idx}`}>
                        <CardLoading />
                      </Fragment>
                    ))}
                  {!isCardLoading &&
                    products.map((item: any, idx: number) => (
                      <div
                        key={`search-result-${idx}`}
                        className='flex justify-center'
                      >
                        <ItemCard detail={item} />
                      </div>
                    ))}
                </div>
                <div className='pagination-container'>
                  <ReactPaginate
                    breakLabel='...'
                    nextLabel=' >'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={onMobile ? 2 : 3}
                    pageCount={pageCount}
                    previousLabel='< '
                    forcePage={currentPage}
                    marginPagesDisplayed={1}
                    containerClassName='pagination'
                    activeClassName='active'
                    previousClassName='pagination-item'
                    nextClassName='pagination-item'
                    activeLinkClassName='active'
                    pageLinkClassName='pagination-item'
                    // renderOnZeroPageCount={1}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default SearchList;
