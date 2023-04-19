import limitedDefaultLaptop from '../../public/homepage/navbar/categories/limited-default.png'
import limitedDefault from '../../public/homepage/navbar/categories/limited-default.svg'
import limitedSelected from '../../public/homepage/navbar/categories/limited-selected.svg'
import recommendDefaultLaptop from '../../public/homepage/navbar/categories/recommend-default.png'
import recommendDefault from '../../public/homepage/navbar/categories/recommend-default.svg'
import recommendSelected from '../../public/homepage/navbar/categories/recommend-selected.svg'
import babyDefaultLaptop from '../../public/homepage/navbar/categories/baby-default.png'
import babyDefault from '../../public/homepage/navbar/categories/baby-default.svg'
import babySelected from '../../public/homepage/navbar/categories/baby-selected.svg'
import supermarketDefaultLaptop from '../../public/homepage/navbar/categories/supermarket-default.png'
import supermarketDefault from '../../public/homepage/navbar/categories/supermarket-default.svg'
import supermarketSelected from '../../public/homepage/navbar/categories/supermarket-selected.svg'
import departmentDefaultLaptop from '../../public/homepage/navbar/categories/department-default.png'
import departmentDefault from '../../public/homepage/navbar/categories/department-default.svg'
import departmentSelected from '../../public/homepage/navbar/categories/department-selected.svg'
import diningDefaultLaptop from '../../public/homepage/navbar/categories/dining-default.png'
import diningDefault from '../../public/homepage/navbar/categories/dining-default.svg'
import diningSelected from '../../public/homepage/navbar/categories/dining-selected.svg'
import giftDefaultLaptop from '../../public/homepage/navbar/categories/gift-default.png'
import giftDefault from '../../public/homepage/navbar/categories/gift-default.svg'
import giftSelected from '../../public/homepage/navbar/categories/gift-selected.svg'
import blogDefaultLaptop from '../../public/homepage/navbar/categories/blog-default.png'
import blogDefault from '../../public/homepage/navbar/categories/blog-default.svg'
import blogSelected from '../../public/homepage/navbar/categories/blog-selected.svg'

export const categories = [
  {
    type: '期間限定',
    iconDefaultLaptop: limitedDefaultLaptop,
    iconDefault: limitedDefault,
    iconSelected: limitedSelected,
    route: '/seasonal-limited',
    tabs: [
      {
        tab: '春日BB用品展',
        route: '/spring-bb-item',
        items: [
          {
            item: '特價BB用品',
            route: '/on-sales-bb-item'
          },
          {
            item: '限定產品',
            route: '/limited-edition'
          }
        ]
      },
      {
        tab: '春日美肌提案',
        route: '/spring-skincare',
        items: [
          {
            item: '春日美肌提案',
            route: '/spring-skincare'
          },
        ]
      },
      {
        tab: '端午粽券預售',
        route: '/rice-dumpling',
        items: [
          {
            item: '端午粽券預售',
            route: '/rice-dumpling'
          },
        ]
      }
    ]
  },
  {
    type: '店長推介',
    iconDefaultLaptop: recommendDefaultLaptop,
    iconDefault: recommendDefault,
    iconSelected: recommendSelected,
    route: '/recommend',
    tabs: [
      {
        tab: '抗疫推介',
        route: '/prevent-covid',
        items: [
          {
            item: '抗疫必備',
            route: '/mandate'
          },
          {
            item: '抗疫限定產品',
            route: '/limited-edition'
          }
        ]
      },
      {
        tab: '網店限定',
        route: '/eshop-edition',
        items: []
      },
      {
        tab: '荀貨推介',
        route: '/good-product',
        items: []
      },
    ]
  },
  {
    type: '母嬰專區',
    iconDefaultLaptop: babyDefaultLaptop,
    iconDefault: babyDefault,
    iconSelected: babySelected,
    route: '/maternal',
    tabs: [
      {
        tab: 'BB專區',
        route: '/baby',
        items: [
          {
            item: '嬰兒床 / 搖椅 / 床品',
            route: '/baby-bed',
            subTabs: [
              { subTab: '棉被' },
              { subTab: '嬰兒揹帶' },
              { subTab: '床墊' },
              { subTab: '枕頭' },
              { subTab: '安撫床' },
              { subTab: '搖椅' },
            ]
          },
          {
            item: '尿片 / 學習褲',
            route: '/diapers',
            subTabs: [
              { subTab: '尿片' },
              { subTab: '學習褲' },
            ]
          },
          {
            item: '清潔 / 護理',
            route: '/cleansing'
          },
          {
            item: '奶樽 / 餐具 / 哺育用品',
            route: '/utensils',
            subTabs: [
              { subTab: '奶樽' },
              { subTab: '奶咀' },
              { subTab: '餐具' },
            ]
          },
          {
            item: '母乳哺乳用品',
            route: '/maternity'
          },
          {
            item: 'BB 外出用品',
            route: '/outdoor'
          },
          {
            item: '奶粉 及 嬰兒食品',
            route: '/baby-food'
          },
          {
            item: 'BB 服飾内衣',
            route: '/clothing'
          },
        ]
      },
      {
        tab: '媽媽專區',
        route: '/mum',
        items: [
          {
            item: '新手孕媽媽必備 ',
            route: '/new-mum'
          },
          {
            item: '孕媽媽產前準備',
            route: '/pregnant'
          },
          {
            item: 'BB媽產後護理',
            route: '/postpartum'
          },
        ]
      },
    ]
  },
  {
    type: '超市精選',
    iconDefaultLaptop: supermarketDefaultLaptop,
    iconDefault: supermarketDefault,
    iconSelected: supermarketSelected,
    route: '/supermarket',
    tabs: [
      {
        tab: '產地直送',
        route: '/oversea',
        items: [
          {
            item: '日本直送',
            route: '/japan'
          },
          {
            item: '其他產地直送',
            route: '/other-areas'
          },
        ]
      },
      {
        tab: '新鮮及急凍食品',
        route: '/fresh-and-frozen',
        items: [
          {
            item: '水果及蔬菜',
            route: '/'
          },
          {
            item: '肉類及海鮮',
            route: '/'
          },
          {
            item: '乳製品、豆類產品及蛋類',
            route: '/'
          },
          {
            item: '急凍食品',
            route: '/'
          }, {
            item: '急凍甜品',
            route: '/'
          },
        ]
      },
      {
        tab: '糧油雜貨',
        route: '/grain',
        items: [
          {
            item: '米及五穀類',
            route: '/'
          },
          {
            item: '粉麵類',
            route: '/'
          },
          {
            item: '食油',
            route: '/'
          },
          {
            item: '調味料',
            route: '/'
          }, {
            item: '湯料 湯包',
            route: '/'
          },
          {
            item: '罐頭 乾貨',
            route: '/'
          },
          {
            item: '早餐 果醬',
            route: '/'
          }, {
            item: '烘培材料',
            route: '/'
          },
        ]
      },
      {
        tab: '零食甜品',
        route: '/grain',
        items: [
          {
            item: '糖果 / 朱古力',
            route: '/'
          },
          {
            item: '餅乾 / 蛋糕',
            route: '/'
          },
          {
            item: '零食',
            route: '/'
          },
        ]
      },
      {
        tab: '飲品',
        route: '/grain',
        items: [
          {
            item: '酒類',
            route: '/'
          },
          {
            item: '非酒精飲品',
            route: '/'
          },
          {
            item: '即冲飲品',
            route: '/'
          },
        ]
      },
      {
        tab: '家居用品',
        route: '/grain',
        items: [
          {
            item: '紙品類',
            route: '/'
          },
          {
            item: '家具清潔用品',
            route: '/'
          },
          {
            item: '其他雜貨',
            route: '/'
          },
        ]
      },
      {
        tab: '個人護理保健',
        route: '/grain',
        items: [
          {
            item: '清潔護膚',
            route: '/'
          },
          {
            item: '頭髮 身體護理',
            route: '/'
          },
          {
            item: '口腔護理',
            route: '/'
          },
          {
            item: '女性衛生用品',
            route: '/'
          },
          {
            item: '保健產品',
            route: '/'
          },
        ]
      },
    ]
  },
  {
    type: '百貨精選',
    iconDefaultLaptop: departmentDefaultLaptop,
    iconDefault: departmentDefault,
    iconSelected: departmentSelected,
    route: '/department',
    tabs: [
      {
        tab: '家具電器',
        route: '/electric-appliance',
        items: []
      },
      {
        tab: '家品傢俱',
        route: '/furniture',
        items: []
      },
      {
        tab: '運動旅行',
        route: '/travel',
        items: []
      },
      {
        tab: '床品',
        route: '/bedding',
        items: []
      },
      {
        tab: '護膚化妝',
        route: '/beauty',
        items: []
      },
      {
        tab: '玩具 / 兒童用品',
        route: '/toys',
        items: []
      },
      {
        tab: '兒童服飾',
        route: '/children-wear',
        items: []
      },
      {
        tab: '文具精品',
        route: '/stationery',
        items: []
      },
    ]
  },
  {
    type: '餐飲精選',
    iconDefaultLaptop: diningDefaultLaptop,
    iconDefault: diningDefault,
    iconSelected: diningSelected,
    route: '/dining',
    tabs: [
      {
        tab: '節慶食品',
        route: '/festival',
        items: []
      },
      {
        tab: '餐飲電子禮券',
        route: '/e-coupon',
        items: []
      },
    ]
  },
  {
    type: '送禮專區',
    iconDefaultLaptop: giftDefaultLaptop,
    iconDefault: giftDefault,
    iconSelected: giftSelected,
    route: '/gift',
    tabs: [
      {
        tab: '果籃、禮籃',
        route: '/fruit-basket',
        items: []
      },
      {
        tab: '一田現金券',
        route: '/coupon',
        items: []
      },
    ]
  },
  // {
  //   type: '一田百科',
  //   iconDefault: blogDefault,
  //   iconSelected: blogSelected,
  //   route: '/blog',
  //   tabs: [
  //     {
  //       tab: '一田百科',
  //       route: '/blog',
  //       items: []
  //     },
  //   ]
  // },
]

export const brandList = [
  { name: 'DOOMOO COCOON' },
  { name: 'HELLO MIMI' },
  { name: 'INFANTINO' },
  { name: 'JOE KUBBLE SLEEP' },
  { name: 'LA BABY' },
  { name: 'OMNI' },
  { name: 'ZOOKID' },
]

export const countryList = [
  { name: '中國' },
  { name: '韓國' },
  { name: '義大利' },
  { name: '比利時' },
  { name: '日本' },
]
