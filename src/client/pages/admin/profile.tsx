import Layout from "../../components/admin/Layout";
import { selectIsAuthenticated, selectUserInfo } from "../../redux/auth/slice";
import { selectWindowSize } from "../../redux/control/slice";
import { useAppSelector } from "../../redux/store";

const data = [
  {
    firstName: "AlbericUAT",
    lastName: "eShop",
    memberNo: "M9000730",
    mobile: "90926252",
    email: "albericcyh@gmail.com",
  },
];

const Profile = () => {
  const windowType = useAppSelector(selectWindowSize);
  const onLaptop = windowType === "laptop";

  return (
    <>
      {/* {isAuthenticated && ( */}
      <Layout isRequired={true}>
        {data.map((el, i) => {
          return (
            <>
              <div className="flex items-center px-5 my-2 space-x-3 text-base font-bold rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4 lg:mx-5 lg:px-0 text-yata-brown">
                <span>
                  您好, {el.firstName} {el.lastName} !
                </span>
              </div>
              <div className="pb-3 text-base mx-5 border-b border-[#673708]">
                「{el.memberNo}」
              </div>

              {onLaptop && (
                <div className="m-5 text-lg font-bold"> 帳戶資料</div>
              )}
              <div className="flex flex-col px-5 py-4 pb-5 mx-5 mt-5 space-y-3 text-lg font-medium border-2 rounded-md lg:font-normal border-grey lg:text-base lg:rounded-2xl lg:px-7">
                <span className="font-bold ">聯繫資料 </span>

                <div className="items-center w-full gap-3 lg:flex ">
                  <div className="flex flex-col mb-3 lg:m-0 lg:space-y-1 lg:w-1/2">
                    <span>名字</span>
                    <span className="w-full lg:px-4 lg:py-2 lg:border-2 border-grey rounded-xl">
                      {el.firstName}
                    </span>
                  </div>

                  <div className="flex flex-col mb-1 lg:mb-3 lg:m-0 lg:space-y-1 lg:w-1/2">
                    <span>姓氏</span>
                    <span className="w-full lg:px-4 lg:py-2 lg:border-2 border-grey rounded-xl">
                      {el.lastName}
                    </span>
                  </div>
                </div>

                <div className="items-center w-full gap-3 mb-5 lg:flex ">
                  <div className="flex flex-col mb-4 lg:m-0 lg:space-y-1 lg:w-1/2">
                    <span>電話號碼</span>
                    <span className="w-full lg:px-4 lg:py-2 lg:border-2 border-grey rounded-xl">
                      {el.mobile}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 lg:m-0 lg:space-y-1 lg:w-1/2">
                    <span>電郵地址</span>
                    <span className="w-full lg:px-4 lg:py-2 lg:border-2 border-grey rounded-xl">
                      {el.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 text-sm ">
                如需修改賬戶資料及密碼，請使用YATA-Fans手機程式
              </div>
            </>
          );
        })}
      </Layout>
      {/*  )} */}
    </>
  );
};

export default Profile;
