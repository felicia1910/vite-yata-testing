import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import ItemImageBox from "../../components/shopping/Product/ItemImageBox";
import ItemDetail from "../../components/shopping/Product/ItemDetail";
import ItemDescription from "../../components/shopping/Product/ItemDescription";
import CategoryTitle from "../../components/shopping/CategoryTitle";
import Loading from "../../components/common/Loading";

import {
  selectCategoryList,
  setCategoryPath,
  ICategoryPath,
} from "../../redux/config/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProductDetailThunk } from "../../redux/shopping/thunk";
import {
  selectProductDetail,
  initProductDetail,
} from "../../redux/shopping/slice";
import { createPathList } from "../../utils/createPathList";
import { IProductDetail } from "../../redux/shopping/slice";

const ProductDetail = ({
  param,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const catPath = useAppSelector((state) => state.config.categoryPath);
  const categoryList = useAppSelector(selectCategoryList);
  const productDetail = useAppSelector(selectProductDetail);

  const [currentProductId, setCurrentProductId] = useState<string | null>();
  const [pathTitle, setPathTitle] = useState<ICategoryPath | string | null>(
    null
  );
 
  const [storedCatPath,setStoredCatPath] = useState('')
  
  useEffect(() => {
    const storedCatPath = localStorage.getItem("storedCatPath");
    const storedPlu = localStorage.getItem("storedPlu");
    console.log(storedCatPath!)
    setStoredCatPath(storedCatPath!)
    dispatch(initProductDetail());
    const getProductDetail = async () => {
      // const productId = router.query['product-id']
      const productId = param["product-id"];
      const catId = router.asPath.split("id=")[1] ?? 0;
      const quoteType = router.asPath.split("quote_type=")[1];
      // const catId = router.query.id ?? "";

      if (!productId) {
        router.push("/404");
        return;
      } else {
        // console.log(storedPlu, productId, storedPlu !== productId);
        if (storedPlu && storedPlu !== productId) {
          localStorage.removeItem("storedCatPath");
        }
        if (catPath) {
          localStorage.setItem("storedCatPath", JSON.stringify(catPath));
        }
        localStorage.setItem("storedPlu", productId);
        setCurrentProductId(productId as string);
        // if (productDetail == null || productDetail.plu != productId) {
        //   console.log("product detail 2: ", productDetail);

        const res = await dispatch(
          getProductDetailThunk({
            plu: productId as string,
            categoryId: catId.toLocaleString(),
            quote_type: quoteType ? +quoteType : undefined,
          })
        );
        if (res.type == "product/detail/rejected" || !res.payload) {
          router.push("/404");
        }

        const detail: IProductDetail = res.payload;
        if (detail.urlPath && detail.categoryId) {
          const pathList = detail.urlPath.split("/");
          if (categoryList.length > 0) {
            const newCatPath = createPathList(categoryList, pathList);
            setPathTitle(newCatPath);
            // dispatch(setCategoryPath(newCatPath));
            localStorage.setItem("storedCatPath", JSON.stringify(newCatPath));
          }
        } else {
          setPathTitle(catPath ?? "");
        }
        // }
      }
    };

    getProductDetail();
  }, [param, router.query, categoryList]);

  // console.log("productDetail", productDetail);
  // console.log("product detail category list: ", catPath);
  // console.log("new category list: ", pathTitle);
  // console.log("stored path: ", storedCatPath);

  return (
    <>
      <Head>
        <title>
          {productDetail && productDetail.full_name_c
            ? `${productDetail.full_name_c} | YATA eShop`
            : "YATA eShop"}
        </title>
      </Head>
      <Loading
        isLoading={
          !(productDetail != null && productDetail.plu == currentProductId) ||
          pathTitle == null
        }
      />
      {productDetail != null && (
        <>
          <CategoryTitle
            product={productDetail.full_name_c}
            query={
              pathTitle && pathTitle != ""
                ? pathTitle
                : storedCatPath&&JSON.parse(storedCatPath)
            }
          />
          <div className='px-4 rangeLg:px-20 rangeXl:px-24 2xl:px-48'>
            <div className='lg:flex lg:flex-row'>
              <div className='lg:w-full'>
                <div>
                  {/* Title */}
                  <div className='items-center hidden lg:flex lg:flex-row'>
                    <div className='my-2'>
                      <h1 className='text-xl font-bold'>
                        {productDetail.full_name_c}
                      </h1>
                    </div>
                    {/* <div className="mx-4 my-2">
                      <button className="px-6 py-1 text-white rounded-full bg-cat-orange-text">
                        期間限定
                      </button>
                    </div> */}
                  </div>
                </div>

                <div className='lg:flex lg:flex-row'>
                  <div className='lg:w-2/5 lg:max-w-sm'>
                    <ItemImageBox
                      plu={productDetail.plu}
                      images={productDetail.images}
                    />
                  </div>

                  <div className='lg:mx-8 lg:w-3/5'>
                    <h1 className='block my-2 text-xl font-bold lg:hidden'>
                      {productDetail.full_name_c}
                    </h1>
                    <ItemDetail item={productDetail} />
                  </div>
                </div>

                <div className='mb-10'>
                  <ItemDescription item={productDetail} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { param: context.params },
  };
};

export const getStaticPaths: GetStaticPaths<{
  "product-id": string;
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default ProductDetail;
