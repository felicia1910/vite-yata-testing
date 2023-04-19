import Registration from '../pages/about/faq/registration';
import Delivery from '../pages/about/faq/delivery';
import SufProduct from '../pages/about/faq/surf-products';
import SelfPickup from '../pages/about/faq/self-pickup';
import Purchase from '../pages/about/faq/purchase';
import Payment from '../pages/about/faq/payment';
import PromoCode from '../pages/about/faq/promo-code';
import ReturnEX from '../pages/about/faq/return-exchange';
import ProductHamper from '../pages/about/faq/product-hamper';
import ProductDining from '../pages/about/faq/product-dining';

export const faq = {
    title: "常見問題",
    list: [{
        content: "瀏覽商品",
        path: "/about/faq/surf-products",
        route: "/faq/sidebar/BrowseProducts-Brown.png",
        active: "/faq/sidebar/BrowseProducts-White.png",
        id: "1",
        component: SufProduct
    },
    {
        content: "送貨上門",
        path: "/about/faq/delivery",
        route: "/faq/sidebar/Delivery-Brown.png",
        active: "/faq/sidebar/Delivery-White.png",
        id: "2",
        component: Delivery
    },
    {
        content: "店舖自取",
        path: "/about/faq/self-pickup",
        route: "/faq/sidebar/Pickup-Brown.png",
        active: "/faq/sidebar/Pickup-White.png",
        id: "3",
        component: SelfPickup
    },
    {
        content: "會員登記",
        path: "/about/faq/registration",
        route: "/faq/sidebar/Member Registration-Brown.png",
        active: "/faq/sidebar/Member Registration-White.png",
        id: "4",
        component: Registration
    },
    {
        content: "訂購",
        path: "/about/faq/purchase",
        route: "/faq/sidebar/Order-Brown.png",
        active: "/faq/sidebar/Order-White.png",
        id: "5",
        component: Purchase
    },
    {
        content: "結賬及付款",
        path: "/about/faq/payment",
        route: "/faq/sidebar/Payment-Brown.png",
        active: "/faq/sidebar/Payment-White.png",
        id: "6",
        component: Payment
    },
    {
        content: "推廣優惠及優惠碼",
        path: "/about/faq/promo-code",
        route: "/faq/sidebar/Payment-Brown.png",
        active: "/faq/sidebar/Payment-White.png",
        id: "7",
        component: PromoCode
    },
    {
        content: "貨品退換",
        path: "/about/faq/return-exchange",
        route: "/faq/sidebar/Return and Exchange-Brown.png",
        active: "/faq/sidebar/Return and Exchange-White.png",
        id: "8",
        component: ReturnEX
    },
    {
        content: "送禮果籃、禮籃",
        path: "/about/faq/product-hamper",
        route: "/faq/sidebar/Special Order-Brown.png",
        active: "/faq/sidebar/Special Order-White.png",
        id: "8",
        component: ProductHamper
    },
    {
        content: "餐飲美食",
        path: "/about/faq/product-dining",
        route: "/faq/sidebar/Special Order-Brown.png",
        active: "/faq/sidebar/Special Order-White.png",
        id: "9",
        component: ProductDining 
    }
    ]
}


