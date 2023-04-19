import React, { Fragment} from "react";
import ExchangeHeader from './ExchangeHeader'
import ItemList from "./ItemList";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectProductList } from "../../redux/admin/slice";

const ExchangeList = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectProductList)
  return (
    <div>
        <ExchangeHeader/>
        <div>
      {data?.map((el, i) => {
        return (
          <Fragment key={i}>
            <ItemList el={el}/>
          </Fragment>
        );
      })}
    </div>
        
    </div>
  )
}

export default ExchangeList