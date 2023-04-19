import infoDefault from '../../public/myAccount/dropdownList/info-default.svg';
import infoSelected from '../../public/myAccount/dropdownList/info-selected.svg';
import myListDefault from '../../public/myAccount/dropdownList/mylist-default.svg';
import myListSelected from '../../public/myAccount/dropdownList/mylist-selected.svg';
import myAddressDefault from '../../public/myAccount/dropdownList/myaddress-default.svg';
import myAddressSelected from '../../public/myAccount/dropdownList/myaddress-selected.svg';
import orderHistoryDefault from '../../public/myAccount/dropdownList/orderhistory-default.svg';
import orderHistorySelected from '../../public/myAccount/dropdownList/orderhistory-selected.svg';
import purchaseHistoryDefault from '../../public/myAccount/dropdownList/purchasehistory-default.svg';
import purchaseHistorySelected from '../../public/myAccount/dropdownList/purchasehistory-selected.svg';
import pointHistoryDefault from '../../public/myAccount/dropdownList/pointhistory-default.svg';
import pointHistorySelected from '../../public/myAccount/dropdownList/pointhistory-selected.svg';
import logoutDefault from '../../public/myAccount/dropdownList/logout-default.svg';
import logoutSelected from '../../public/myAccount/dropdownList/logout-selected.svg';

export const accountInfo = [
  {
    title: '帳戶資料',
    usage: 'profile',
    iconDefault: infoDefault,
    iconSelected: infoSelected,
    route: '/profile',
  },
  {
    title: '我的地址',
    usage: 'delivery-address',
    iconDefault: myAddressDefault,
    iconSelected: myAddressSelected,
    route: '/delivery-address',
  },
  {
    title: '訂單記錄',
    usage: 'orders',
    iconDefault: orderHistoryDefault,
    iconSelected: orderHistorySelected,
    route: '/orders',
  },
  {
    title: '積分記錄',
    usage: 'points',
    iconDefault: pointHistoryDefault,
    iconSelected: pointHistorySelected,
    route: '/points',
  },
  {
    title: '喜愛清單',
    usage: 'wishlist',
    iconDefault: myListDefault,
    iconSelected: myListSelected,
    route: '/wishlist',
  },
  // {
  //   title: '曾經購買',
  //   usage: 'purchase-record',
  //   iconDefault: purchaseHistoryDefault,
  //   iconSelected: purchaseHistorySelected,
  //   route: '/purchase-record',
  // },
  {
    title: '登出',
    usage: 'logout',
    iconDefault: logoutDefault,
    iconSelected: logoutSelected,
    route: '/',
  },
]