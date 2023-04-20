import Registration from '../pages/about/faq/registration';
import Delivery from '../pages/about/faq/delivery';
import Product from '../pages/product/[product-id]';
import Category from '../pages/category/[category]/index';

export const catPath ={
    path: `/category/:category`,
    component: Category,
    department: {
        path: ':department',
        segment: {
            path: ':segment',
            type: {
                path: ':type',
                component: Category
            }
        }
    }
}

export const prod = {
    title: "商品",
    list: [
        { content: "商品", path: "/product/:id", component: Product },
    ]
};





