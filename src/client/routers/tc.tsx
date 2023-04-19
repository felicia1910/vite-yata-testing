import PurchaseTnc from '../pages/about/tnc/purchase.js';
import DeliveryTnc from '../pages/about/tnc/delivery.js';
import selfPickup from '../pages/about/tnc/self-pickup.js';
import RefundTnc from '../pages/about/tnc/refund.js';
import PrivacyTnc from '../pages/about/tnc/privacy.js';

export const tc = {
    title: "購物流程",
    list: [
        {
            content: "訂購條款",
            path: "/about/tnc/purchase",
            route: "/tnc/default/purchase-brown.png",
            active: "/tnc/selected/purchase-white.png",
            ratio: "10/8",
            id: "1",
            component: PurchaseTnc
        },
        {
            content: "一般送貨條款",
            path: "/about/tnc/delivery",
            route: "/tnc/default/delivery-brown.png",
            active: "/tnc/selected/delivery-white.png",
            ratio: "11/10",
            id: "2",
            component: DeliveryTnc
        },
        {
            content: "一般店舖自取條款",
            path: "/about/tnc/self-pickup",
            route: "/tnc/default/pickup-brown.png",
            active: "/tnc/selected/pickup-white.png",
            ratio: "19/22",
            id: "3",
            component: selfPickup
        },
        {
            content: "一般退換條款",
            path: "/about/tnc/refund",
            route: "/tnc/default/refund-brown.png",
            active: "/tnc/selected/refund-white.png",
            ratio: "1/1",
            id: "4",
            component: RefundTnc
        },
        {
            content: "私隱政策聲明",
            path: "/about/tnc/privacy",
            route: "/tnc/default/privacy-brown.png",
            active: "/tnc/selected/privacy-white.png",
            ratio: "19/20",
            id: "5",
            component: PrivacyTnc
        }
    ]
};




