import React, { Fragment, useEffect, useRef } from "react";
import CategoryBox from "./CategoryBox";
import { homeCat } from "../../../utils/contents/homeCat";
import { ICategoryCarousel } from "../../../redux/shopping/slice";

type Props = {
  carousel: ICategoryCarousel[];
};

function CategoryContainer({ carousel }: Props) {
  useEffect(() => {
    // console.log("carousel setting: ", carousel);
  }, [carousel]);
  return (
    <>
      <div className='lg:flex lg:flex-row'>
        <div className='lg:w-full lg:mt-4'>
          {carousel.length > 0 &&
            carousel.map((row, idx) => (
              <Fragment key={"carousel-list-" + idx}>
                <CategoryBox cats={homeCat[0]} row={row} />
              </Fragment>
            ))}
        </div>
      </div>
    </>
  );
}

export default CategoryContainer;
