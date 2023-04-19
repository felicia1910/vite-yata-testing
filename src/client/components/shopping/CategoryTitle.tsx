import React from "react";
import ChevronRightSvg from "../../public/common/arrow/chevron-right";
import { QueryProps } from "../../utils/types";
import { Link, Route, Routes, useNavigate,useLocation } from 'react-router-dom';
type Props = {
  query?: QueryProps;
  pathname?: string;
  filter?: boolean;
  product?: string;
};

const CategoryTitle = ({ query, pathname, filter, product }: Props) => {
  const router = useNavigate();

  return (
    // Title
    <div className='mb-4 rangeLg:px-20 rangeXl:px-24 2xl:px-48 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4'>
      <div className='flex px-4 space-x-2 lg:space-x-2 lg:px-0 lg:mt-5'>
        <div className='min-w-[1.25rem] min-h-[1.25rem] max-h-[28px] max-w-[28px] mr-1 flex items-center '>
          <div className='w-5 h-5 rounded-md bg-yata' />
        </div>

        <div className='flex flex-wrap items-center space-x-1'>
          {(filter == null || filter == false) && query && (
            <>
              {query.category.path && (
                <Link
                  to={`/category/${query.category.path}`}
                >
                  <span
                    className={`font-bold text-xl lg:text-base cursor-pointer text-yata-brown`}
                  >
                    {query.category.name}
                  </span>
                </Link>
              )}

              {query.dept.path && (
                <>
                  <ChevronRightSvg
                    width={15}
                    height={15}
                    fill={query.segment ? "#6A3B0D" : "#A6CE39"}
                  />
                  <Link
                    to={`/category/${query.category.path}/${query.dept.path}`}
                  >
                    <span
                      className={`font-bold min-w-fit text-xl lg:text-base cursor-pointer ${
                        query.segment ? "text-yata-brown" : "text-yata"
                      }`}
                    >
                      {query.dept.name}
                    </span>
                  </Link>
                </>
              )}

              {query.segment.path && (
                <>
                  <ChevronRightSvg
                    width={15}
                    height={15}
                    fill={query.type ? "#6A3B0D" : "#A6CE39"}
                  />
                  <Link
                    to={`/category/${query.category.path}/${query.dept.path}/${query.segment.path}`}
                  >
                    <span
                      className={
                        "font-bold min-w-fit text-xl lg:text-base cursor-pointer " +
                        (query.type ? "text-yata-brown" : "text-yata")
                      }
                    >
                      {query.segment.name}
                    </span>
                  </Link>
                </>
              )}

              {query.type.path && (
                <>
                  <ChevronRightSvg
                    width={15}
                    height={15}
                    fill={product ? "#6A3B0D" : "#A6CE39"}
                  />
                  {product ? (
                    <Link
                      to={`/category/${query.category.path}/${query.dept.path}/${query.segment.path}/${query.type.path}`}
                    >
                      <span
                        className={
                          "font-bold min-w-fit text-xl lg:text-base cursor-pointer " +
                          (product ? "text-yata-brown" : "text-yata")
                        }
                      >
                        {query.type.name}
                      </span>
                    </Link>
                  ) : (
                    <span className='text-xl font-bold min-w-fit lg:text-base text-yata'>
                      {query.type.name}
                    </span>
                  )}
                </>
              )}
            </>
          )}

          {product && (
            <>
              {query && (
                <ChevronRightSvg width={15} height={15} fill={"#A6CE39"} />
              )}
              <span className='text-xl font-bold min-w-fit lg:text-base text-yata'>
                {product}
              </span>
            </>
          )}

          {filter == true && (
            <span
              className={`font-bold text-xl lg:text-base cursor-pointer text-yata-brown`}
            >
              篩選
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTitle;
