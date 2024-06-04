export const API_ENDPOINTS = {
    LOGIN: 'admin/login/',
    PROFILE: 'auth/profile/',
    CREATE_BRANCH: 'admin/branch/create/',
    UPDATE_BRANCH: 'admin/branch/update/',
    DELETE_BRANCH: 'admin/branch/delete/',
    GET_BRANCHS: 'admin/branch/',

    CATEGORIES: 'admin/category/',
    CREATE_CATEGORY: 'admin/category/create/',
    CATEGORIES_DETAIL: 'admin/category/detail/',
    UPDATE_CATEGORY: 'admin/category/update/',
    DELETE_CATEGORY: 'admin/category/delete/',
    CATEGORIES_CHAILD: 'admin/category/list/childe/',

    RETCIPE: 'admin/recipe/',
    CAREATE_RECIPE: 'admin/recipe/create/',
    DELETE_RECIPE: 'admin/recipe/delete/',
    DETAIL_RECIPE: 'admin/recipe/detail/',
    UPDATE_RECIPE: 'admin/recipe/update/',

    PRODUCT: 'admin/product/',
    DELETE_PRODUCT: 'admin/product/delete/',
    CREATE_PRODUCT: 'admin/product/create/',
    PATCH_PRODUCT : 'admin/product/update/',
    DETAIL_PRODUCT: 'admin/product/detail/',
    PRODUCT_MIN_LIST:'admin/product/list/filter',
    
    BADGE: 'admin/badge/',
    CREATE_BADGE: 'admin/badge/create/',
    DETAIL_BADGE: 'admin/badge/detail/',
    PATCH_BADGE:'admin/badge/update/',
    DELETE_BADGE: 'admin/badge/delete/',
    PRODUCT_MIN_LIST_BADGE:'admin/product/list/badge',

    ADDRESS: 'admin/user-address/',
    ADDRESS_DETAIL: 'admin/user-address/detail/',


    USERS: 'admin/user/',
    CAREATE_USER: 'admin/user/create/',
    DELETE_USER: 'admin/user/delete/',
    DETAIL_USER: 'admin/user/detail/',
    UPDATE_USER: 'admin/user/update/',
    COUNT_USER: 'admin/users-count/',

    ORDER: 'admin/order/',
    PATCH_ORDER : 'admin/order/update/',
    DETAIL_ORDER: 'admin/order/detail/',

    PRODUCT_COUNT_BRANCH: 'admin/product-count-branch/',
    DETAIL_PRODUCT_COUNT_BRANCH : 'admin/product-count-branch/detail/',
    CREATE_PRODUCT_COUNT_BRANCH: 'admin/product-count-branch/create/',
    DELETE_PRODUCT_COUNT_BRANCH : 'admin/product-count-branch/delete/',
    UPDATE_PRODUCT_COUNT_BRANCH : 'admin/product-count-branch/update/',

    PROMO_CODE: 'admin/promo-code/',
    DETAIL_PROMO_CODE: 'admin/promo-code/detail/',
    DETAIL_CREATE: 'admin/promo-code/create/',
    DELETE_CREATE_PROMO_CODE: 'admin/promo-code/delete/',
    UPDATE_PROMO_CODE: 'admin/promo-code/update/',

    DASHBOARD:'admin/dashboard/statistic/',
    DASHBOARD_PRODUCT:'admin/todays-best-selling-products/',
    DASHBOARD_ORDER:'admin/todays-best-order/',
    MOTHLY_STATISTIC:'admin/monthly/statistic/',

    YEAR:'admin/year/list',

    SETTINGS: 'admin/settings/',

    PROCESS:'admin/process/order/',

    ARCHIVE: 'admin/archive/order/',

    EMPLOYEE: 'admin/employees/',
    CREATE_EMPLOYEE: 'admin/employees/create/',
    DETAIL_EMPLOYEE: 'admin/employees/',

    SELLER: 'admin/sellers/',
    CREATE_SELLER: 'admin/create-seller/',
    DETAIL_SELLER: 'admin/sellers/',
    // DELETE_SELLER: 'admin/create-seller/'

}