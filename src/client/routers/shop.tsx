import EShopInfo from '../pages/about/eshop-info.jsx';
import Shopping from '../pages/about/shopping-guideline.jsx';
import DeliveryAndSelfPick from '../pages/about/delivery.jsx';
import SufProduct from '../pages/about/faq/surf-products.jsx';
import Tnc from '../pages/about/tnc/index.jsx';

export const shop = {
    title: "購物流程",
    list: [
        { content: "eShop 簡介", path: "/about/eshop-info", component: EShopInfo },
        { content: "購物流程", path: "/about/shopping-guideline", component: Shopping },
        { content: "送貨及運費", path: "/about/delivery", component: DeliveryAndSelfPick },
        {
            content: "常見問題",
            path: "/about/faq/surf-products", component: SufProduct
        },
        { content: "條款及細則", path: "/about/tnc", component: Tnc },
    ]
};