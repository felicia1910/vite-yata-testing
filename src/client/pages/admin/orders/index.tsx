import { useRouter } from "next/router";
import { Fragment } from "react";
import Layout from "../../../components/admin/Layout";

const orders = [
{
    order_date:"2022-09-14 00:33:40",
    order_no:"YATAEC120000343",
    grand_total:"1373.10",
    order_status:"處理中"
},
{
    order_date:"2022-09-14 00:17:13",
    order_no:"YATAEC120000342",
    grand_total:"930.40",
    order_status:"處理中"
},
{
    order_date:"2022-09-13 23:14:18",
    order_no:"YATAEC120000341",
    grand_total:"253.00",
    order_status:"處理中"
},
{
    order_date:"2022-09-13 22:33:55",
    order_no:"YATAEC120000340",
    grand_total:"159.42",
    order_status:"處理中"
},
{
    order_date:"2022-09-13 21:20:43",
    order_no:"YATAEC120000339",
    grand_total:"171.00",
    order_status:"處理中"
},
{
    order_date:"2022-09-13 18:01:34",
    order_no:"YATAEC120000338",
    grand_total:"253.00",
    order_status:"處理中"
},


]

const Order = () => {
  const router = useRouter();
  const handleClick = (order_no: any) => {
    console.log("id", order_no);
    router.push(`/admin/orders/${order_no}`);
  };

  return (
        <>
          <Layout isRequired={true}>
              <div className='text-lg font-bold px-2 py-3 border-b-2 border-[#B49D86] w-full'>
                訂單記錄
              </div>
              <table className='w-full mt-5 space-y-3'>
                <tr className='text-sm font-normal text-left text-white lg:text-lg bg-yata'>
                  <th className='px-1 py-3 text-base font-medium rounded-tl-lg lg:px-2 '>
                    訂單日期
                  </th>
                  {/* <th className="py-2 lg:px-1 txl:px-3">送貨 / 取貨日期</th> */}
                  <th className='px-1 py-3 text-base font-medium lg:px-2'>
                    訂單編號
                  </th>
                  <th className='px-1 py-3 text-base font-medium lg:px-2'>
                    訂單總額($)
                  </th>
                  <th className='px-1 py-3 text-base font-medium lg:px-2'>
                    訂單狀態
                  </th>
                  <th className='px-1 py-3 text-base font-medium rounded-tr-lg lg:px-2 '>
                    詳情
                  </th>
                </tr>
                {orders.length > 0 &&
                  orders.map((order, i) => {
                    return (
                      <Fragment key={order.order_no}>
                        <tr
                          key={i}
                          className='text-sm font-normal lg:text-base'
                        >
                          <td className='p-1 py-2 text-left border lg:px-2 lg:py-3 border-gray'>
                            {" "}
                            {order.order_date}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            {order.order_no}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            ${order.grand_total}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            {order.order_status}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            <button
                              className='px-1 py-1 text-xs font-bold border rounded-md cursor-pointer lg:px-2 border-yata text-yata-deep lg:w-20 txl:w-full txl:text-sm'
                              onClick={() => handleClick(order.order_no)}
                            >
                              查看訂單
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
              </table>
          </Layout>
        </>
      )}

export default Order;
