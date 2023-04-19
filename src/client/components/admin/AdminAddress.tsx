import { selectChoseAddr } from "../../redux/delivery/slice";
import { useAppSelector } from "../../redux/store";

const AdminAddress = () => {

  return (
    <>
      <div className='relative pb-2 bg-white rounded-md'>
            <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
             <div className='py-2 ml-3 text-lg font-bold'>取貨方式</div>
            </div>
          <div className="mt-4 px-4">已選擇的送貨地址</div>
          <div className="w-fullflex flex-col p-4">
             <div className="w-full border-yata rounded-md flex flex-col px-4 py-2 border">

                <span>AlbericUAT</span>
                <span>90926252</span>
                <span>No.1 尖沙咀 九龍</span>
             </div>
         </div>
      </div>
       
    </>
  );
};
export default AdminAddress;
