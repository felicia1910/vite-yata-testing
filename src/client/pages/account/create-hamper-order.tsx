
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AccountLayout from "../../components/account/AccountLayout";
import Loading from "../../components/common/Loading";
import ShoppingCartButton from "../../components/layout/Buttons/ShoppingCartButton";
import DropDownList from "../../components/layout/NavBar/DropDownList";
import { adminAddItemApi, getHamperProductDetailThunk } from "../../redux/admin/thunk";
import { selectAdminGrabUserInfo, selectAdminUserInfo, selectIsAdmin, selectUserInfo } from "../../redux/auth/slice";
import { onLoaded } from "../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { WindowScreen } from "../../utils/types";

const CreateHamperOrder = () => {
  const router = useRouter();
  const isAdmin = useAppSelector(selectIsAdmin);
  const adminUser = useAppSelector(selectAdminUserInfo);
  const adminGrabUser = useAppSelector(selectAdminGrabUserInfo);
  const dispatch = useAppDispatch();
  
  const [quantity, setQuantity] = useState<number>(0)
  const [newPrice, setNewPrice] = useState<number>(0)
  const [newDetial, setNewDetail] = useState<string>("")
  const [hamperSelect, setHamperSelect] = useState<any|null>(null)
  const [hamperList, setHamperList] = useState<[]>([])
  const [orderList, setOrderList] = useState<any[]>([])


  useEffect(() => {
    if(!hamperSelect) {setNewPrice(0);setNewDetail(''); return}
    setNewPrice(hamperSelect.rsp);
    setNewDetail(hamperSelect.full_description_c)

  },[hamperSelect])
  useEffect(() => {
    if (!isAdmin) {
      router.push("/404");
    }
    (async () => {
      const result = await dispatch(getHamperProductDetailThunk());
      // console.log("get order history result: ", result.payload);
      if (result.payload.getHamperItemList.success != 1) {
        return;
      }
      setHamperList(result.payload.getHamperItemList.items);  
    })();
  }, [isAdmin]);


  const toggleAddHamper = async () => {
    if (quantity <= 0) return
    if (!hamperSelect) return

    const itemToBeAdd = {
      "sku": hamperSelect.sku,
      "plu": hamperSelect.plu,
      "qty": quantity,
      "hamper_short_description_c": newDetial,// later
      "hamper_rsp": newPrice,// later
      "categoryId": 91001,
      "MemberNo": adminGrabUser?.memberNo,
      "shipment_mode": "HD",
      "pickup_location_code": "",
      "name": `${adminGrabUser?.firstName} ${adminGrabUser?.lastName}`,
      "phone": adminGrabUser?.mobile,
      "email": adminGrabUser?.email,
    }

    const addReslut = await dispatch(adminAddItemApi(itemToBeAdd))
    if(addReslut&&addReslut.payload.success==1) console.log('addReslut.payload',addReslut.payload)
    dispatch(onLoaded());
    setHamperSelect(null)

    console.log('quantity', quantity)

  }

  return (
    <>
      {!isAdmin && !adminGrabUser && <Loading isLoading />}
      {isAdmin && adminGrabUser && (
        <AccountLayout isRequired={true} title='建立果籃訂單'>
          <div className='grid flex-wrap text-base justify-start w-full grid-cols-1 gap-1 lg:flex'>
              <div className="w-full flex justify-end h-16">
              <ShoppingCartButton window={WindowScreen.laptop} />

              </div>
            <div className="bg-gray-200 py-4 px-5 w-full">
              <div className="w-4/12 py-2 md w-2/12">
                搜尋果籃 ：
              </div>
              <div className="flex flex-row flex-warp w-full py-2">
                <div className="w-2/12 ">SKU :</div>
                <select className="w-6/12 bg-white" defaultValue={0} onChange={e=>setHamperSelect(hamperList.filter((item:any)=>e.target.value==item.plu)[0])} >
                  <option value="0" disabled >{hamperList.length>0?'選擇果籃':'no item'}</option>
                  {hamperList?hamperList.map((item:any,index)=>{return(
                  <option key={index} value={item.plu}>
                    {item.full_name_c}
                  </option>)})
                  :null}
                </select>
                <div className="w-3/12 text-center">數量：
                  <input type='number' className="w-10 text-right" defaultValue={0} min={0} onChange={(e)=>setQuantity(parseInt(e.target.value))}></input>
                </div>
                <button  disabled={hamperList.length<=0}
                className='px-1 py-1 text-xs font-bold border rounded-md cursor-pointer lg:px-2 border-yata text-yata-deep lg:w-20 txl:w-full txl:text-sm'
                onClick={toggleAddHamper}>{hamperList.length<=0?'nil':'加入'}</button>

              </div>
            </div>
            <div className="w-full flex md:justify-center lg:justify-start">
              {hamperSelect&&<div
              className="w-full   border-yata flex items-center"
              >
                <div className='w-40 h-40 w-4/12 ' >
                  <img src={`${hamperSelect?.images[0].images_url}`}  ></img>
                
                </div>
                <div className=" w-8/12 ">

                  <div className="flex">
                    <div className=" w-3/12 ">產品名稱 :</div>
                    <div className=" w-8/12 ">{hamperSelect?.full_name_c}</div>
                  </div>
                  <div className="flex">

                  <div className=" w-3/12 ">價格:</div>
                    <input type={'number'} min={0} className=" w-8/12 " defaultValue={hamperSelect?.rsp??""} value={newPrice} onChange={e=>setNewPrice(parseInt(e.target.value))}></input>
                  </div>
                  <div className="flex">

                  <div className=" w-3/12 ">簡要說明:</div>
                    {/* <textarea className=" w-8/12 " defaultValue={hamperSelect?.short_description_c}></textarea> */}
                    <textarea className=" w-8/12 " defaultValue={hamperSelect?.full_description_c} onChange={e=>setNewDetail(e.target.value)} ></textarea>
                  </div>
                </div>
                </div>}
            </div>
          </div>
        </AccountLayout>
      )}
    </>
  );
};

export default CreateHamperOrder;
