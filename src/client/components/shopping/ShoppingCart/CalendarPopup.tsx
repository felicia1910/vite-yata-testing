import React, { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  selectShippingMode,
  setDeliveryDate,
} from "../../../redux/delivery/slice";
import { selectDeliveryDate } from "../../../redux/delivery/slice";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import translateDate from "../../../utils/translateDate";

type Props = {
  val: Date;
  setVal: Dispatch<SetStateAction<Date>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setDate: Dispatch<SetStateAction<string>>;
  classes?: string;
};

const getChineseWeekday = (date: Date) => {
  switch (date.getDay()) {
    case 0:
      return "日";
    case 1:
      return "一";
    case 2:
      return "二";
    case 3:
      return "三";
    case 4:
      return "四";
    case 5:
      return "五";
    case 6:
      return "六";
    default:
      return "日";
  }
};

const CalendarPopup = ({
  val,
  setVal,
  show,
  setShow,
  setDate,
  classes,
}: Props) => {
  const dispatch = useAppDispatch();
  const shipmentDate = useAppSelector((state) => state.delivery.shipmentDate);
  const shippingMode = useAppSelector(selectShippingMode);
  const addDays = (date: Date, days: number) => {
    console.log(
      "date.getDate() + days",
      new Date(date.setDate(date.getDate() + days))
    );
    return new Date(date.setDate(date.getDate() + days));
  };

  // console.log('shipmentDate', shipmentDate);

  return (
    <div
      className={
        "z-30 flex flex-col items-center w-full overflow-hidden transition-all duration-500 ease-in-out bg-white border shadow-lg scrollbar-hide lg:w-96 rounded-xl " +
        (classes ? classes : "")
      }
      style={{
        height: show ? "31rem" : 0,
        opacity: show ? 1 : 0,
      }}
      // onMouseLeave={() => setShow(false)}
    >
      <div className='flex items-center justify-center w-full text-lg font-semibold border-b-[1px] h-[15%]'>
        {shippingMode == "HD" && "請選擇送貨日期"}
        {shippingMode == "PU" && "取貨日期"}
      </div>
      <div className='py-3 h-[70%]'>
        <Calendar
          value={val}
          onChange={setVal}
          calendarType={"US"}
          minDate={new Date(shipmentDate[0])}
          maxDate={new Date(shipmentDate[shipmentDate.length - 1])}
          next2Label={null}
          prev2Label={null}
          locale={"zh-hk"}
          formatShortWeekday={(_, date) => {
            const weekdayText = getChineseWeekday(date);
            return weekdayText;
          }}
          formatDay={(_, date) => {
            return date.getDate().toString();
          }}
          tileDisabled={({ date, view }) => {
            return !shipmentDate.some(
              (shipDate) =>
                date.getFullYear() === new Date(shipDate).getFullYear() &&
                date.getDate() === new Date(shipDate).getDate() &&
                date.getMonth() === new Date(shipDate).getMonth()
            );
          }}
        />
      </div>
      <div className='flex items-center w-full justify-evenly h-[15%]'>
        <button
          className='w-2/5 h-12 flex items-center justify-center py-2 rounded bg-grey-yellow text-[#7F7A74] font-bold'
          onClick={() => setShow(false)}
        >
          取消
        </button>
        <button
          className='flex items-center justify-center w-2/5 h-12 py-2 font-bold text-white rounded bg-yata-deep'
          onClick={() => {
            console.log("date: ", translateDate(val));
            console.log("date parsed: ", translateDate(val, true));
            dispatch(setDeliveryDate(translateDate(val, true)));
            setDate(translateDate(val));
            setShow(false);
          }}
        >
          確認
        </button>
      </div>
    </div>
  );
};

export default CalendarPopup;
