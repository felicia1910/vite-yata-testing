import Registration from '../pages/about/faq/registration';
import Delivery from '../pages/about/faq/delivery';
import SufProduct from '../pages/about/faq/surf-products';
import Category from '../pages/category/[category]/index'

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





