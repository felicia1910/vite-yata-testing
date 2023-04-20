
import Home from '../pages/Home';
import Login from '../pages/login';
import ContactUs from '../pages/contact-us';
import Store from '../pages/store-locations/index';
//
import { shop } from './shop';
import { tc } from "./tc";
import { faq } from "./faq";
import { catPath, prod } from "./catProd";
import { RouterList } from '../redux/config/type';

const homeList = [
    { content: "首頁", path: "/", component: Home },
    { content: "登陸", path: "/account", component: Login },
    { content: "店舖位置", path: "/store-locations", component: Store },
    { content: "聯絡我們", path: "/contact-us", component: ContactUs },
]

const routerList = () => {
    let routers = [] as RouterList[];
    routers = routers.concat(homeList, shop.list, tc.list, faq.list, prod.list);
    return routers;
};



export const shopIntro = shop;
export const tcIntro = tc;
export const faqRoute = faq;
export const categoriesList = catPath;
export const router = routerList();


