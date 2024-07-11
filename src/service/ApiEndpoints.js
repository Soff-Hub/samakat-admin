export const API_ENDPOINTS = {
    LOGIN: 'admin/login/',
    PROFILE: 'auth/profile/',
    CREATE_BRANCH: 'admin/branch/',
    UPDATE_BRANCH: 'admin/branch/',
    DELETE_BRANCH: 'admin/branch/',
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
    CREATE_PRODUCT: 'admin/product/',
    PATCH_PRODUCT : 'admin/product/update/',
    DETAIL_PRODUCT: 'admin/product/',
    PRODUCT_MIN_LIST:'admin/product/list/filter',
    CREATE_PRODUCT_PRICE : 'admin/product-colors-features/',
    CREATE_PRODUCT_BRANCH : 'admin/product-variants-branches/',
    CREATE_PRODUCT_PRICE_POST : 'admin/product/set-prices/',
    CREATE_PRODUCT_BRANCH_POST : 'admin/product/set-quantities/',
    PRODUCT_LIST_FOR_CREATE: 'admin/product-variants/',
    UPDATE_PRODUCT_PRICE: 'admin/product/update-prices/',

    BADGE: 'admin/rebates/',
    CREATE_BADGE: 'admin/rebates/',
    DETAIL_BADGE: 'admin/badge/detail/',
    PATCH_BADGE:'admin/badge/update/',
    DELETE_BADGE: 'admin/rebates/delete/',
    BADGE_ADD_SELLER: 'admin/set-products-to-rebate/',

    ADDRESS: 'admin/user-address/',
    ADDRESS_DETAIL: 'admin/user-address/detail/',


    USERS: 'admin/user/',
    CAREATE_USER: 'admin/user/create/',
    DELETE_USER: 'admin/user/delete/',
    DETAIL_USER: 'admin/user/detail/',
    UPDATE_USER: 'admin/user/update/',
    COUNT_USER: 'admin/users-count/',
    APPLICATIONS:"admin/applications/",

    ORDER: 'admin/orders/',
    PATCH_ORDER : 'admin/orders/',
    DETAIL_ORDER: 'admin/orders/',
    
    GET_COUNT_BRANCH: 'admin/approved-branches/',
    PRODUCT_BADGE_PRODUCT: 'admin/products-approved/',
    PRODUCT_COUNT_BRANCH: 'admin/product-count-branch/',
    DETAIL_PRODUCT_COUNT_BRANCH : 'admin/product-count-branch/detail/',
    CREATE_PRODUCT_COUNT_BRANCH: 'admin/set-quantity/',
    DELETE_PRODUCT_COUNT_BRANCH : 'admin/product-count-branch/',
    UPDATE_PRODUCT_COUNT_BRANCH : 'admin/product-count-branch/',
    
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
    
    PROCESS:'admin/section-courier/',
    
    ARCHIVE: 'admin/archive-orders/',
    
    EMPLOYEE: 'admin/employees/',
    CREATE_EMPLOYEE: 'admin/employees/create/',
    DETAIL_EMPLOYEE: 'admin/employees/',
    
    SELLER: 'admin/sellers/',
    CREATE_SELLER: 'admin/create-seller/',
    DETAIL_SELLER: 'admin/sellers/',
    // DELETE_SELLER: 'admin/create-seller/',
    
    COLOR: 'admin/colors/',
    
    SIZE : 'admin/features/',
    SIZE_CHAILD : 'admin/feature-items/',


    STOR_LIST : 'admin/filter-stores/',

    PPRODUCT_CATEGORY_CREATE : 'admin/parent-categories/',

    WORKTIME: 'admin/working-days'
   

}