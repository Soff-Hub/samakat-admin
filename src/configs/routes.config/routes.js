import React from "react";




export const authRoutes = [
    {
        key: 'login',
        path: '/login',
        component: React.lazy(() => import('views/auth/login'))
    }
]


export const adminRoutes = [
    {
        key: 'home',
        path: '/*',
        component: React.lazy(() => import('views/home/home'))
    }
]

export const adminActionRoutes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('views/home/pages/dashboard'))
    },
    {
        key: 'orders',
        path: '/orders/*',
        component: React.lazy(() => import('views/home/pages/orders'))
    },
    {
        key: 'branches',
        path: '/branches/*',
        component: React.lazy(() => import('views/home/pages/branches'))
    },
    {
        key: 'employee',
        path: '/employee/*',
        component: React.lazy(() => import('views/home/pages/employee'))
    },
    {
        key: 'addSeller',
        path: '/addSeller/*',
        component: React.lazy(() => import('views/home/pages/addSeller'))
    },
    {
        key: 'branch-products',
        path: '/branch-products/*',
        component: React.lazy(() => import('views/home/pages/branch-products'))
    },
    {
        key: 'categories',
        path: '/categories/*',
        component: React.lazy(() => import('views/home/pages/categories'))
    },
    {
        key: 'wishlists',
        path: '/wishlists/*',
        component: React.lazy(() => import('views/home/pages/wishlists'))
    },
    {
        key: 'product-badge',
        path: '/product-badge/*',
        component: React.lazy(() => import('views/home/pages/products-badge'))
    },
    {
        key: 'products',
        path: '/products/*',
        component: React.lazy(() => import('views/home/pages/products'))
    },
    {
        key: 'adresses',
        path: '/adresses/*',
        component: React.lazy(() => import('views/home/pages/adresses'))
    },
    {
        key: 'product-categories',
        path: '/product-categories/*',
        component: React.lazy(() => import('views/home/pages/product-categories'))
    },
    {
        key: 'promos',
        path: '/promos/*',
        component: React.lazy(() => import('views/home/pages/promos'))
    },
    {
        key: 'retsept-wishlists',
        path: '/retsept-wishlists/*',
        component: React.lazy(() => import('views/home/pages/retsept-wishlists'))
    },
    {
        key: 'retsepts',
        path: '/retsepts/*',
        component: React.lazy(() => import('views/home/pages/retsepts'))
    },
    {
        key: 'users',
        path: '/users/*',
        component: React.lazy(() => import('views/home/pages/users'))
    },
    {
        key: 'settings',
        path: '/settings/*',
        component: React.lazy(() => import('views/home/pages/settings'))
    },
    {
        key: 'delivery',
        path: '/delivery/*',
        component: React.lazy(() => import('views/home/pages/delivery'))
    },
    {
        key: 'arxiv-orders',
        path: '/arxiv-orders/*',
        component: React.lazy(() => import('views/home/pages/arxiv-orders'))
    },



    {
        key: 'dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('views/home/pages/dashboard'))
    },
    {
        key: 'customer-products',
        path: '/customer-products/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/customer-products'))
    },
    {
        key: 'orders',
        path: '/orders/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/orders'))
    },
    {
        key: 'employee',
        path: '/employee/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/employee'))
    },
    {
        key: 'addSeller',
        path: '/addSeller/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/addSeller'))
    },
    {
        key: 'branches',
        path: '/branches/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/branches'))
    },
    {
        key: 'branch-products',
        path: '/branch-products/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/branch-products'))
    },
    {
        key: 'categories',
        path: '/categories/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/categories'))
    },
    {
        key: 'wishlists',
        path: '/wishlists/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/wishlists'))
    },
    {
        key: 'product-badge',
        path: '/product-badge/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/products-badge'))
    },
    {
        key: 'products',
        path: '/products/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/products'))
    },
    // {
    //     key: 'addProducts',
    //     path: '/actions/*',
    //     component: React.lazy(() => import('views/home/pages/actions/addProduct'))
    // },
    {
        key: 'adresses',
        path: '/adresses/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/adresses'))
    },
    {
        key: 'product-categories',
        path: '/product-categories/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/product-categories'))
    },
    {
        key: 'promos',
        path: '/promos/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/promos'))
    },
    {
        key: 'retsept-wishlists',
        path: '/retsept-wishlists/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/retsept-wishlists'))
    },
    {
        key: 'retsepts',
        path: '/retsepts/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/retsepts'))
    },
    {
        key: 'users',
        path: '/users/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/users'))
    },
]

export const employeActionRoutes = [
    {
        key: 'orders',
        path: '/orders/*',
        component: React.lazy(() => import('views/home/pages/orders'))
    },
    {
        key: 'branches',
        path: '/branches/*',
        component: React.lazy(() => import('views/home/pages/branches'))
    },
    {
        key: 'branch-products',
        path: '/branch-products/*',
        component: React.lazy(() => import('views/home/pages/branch-products'))
    },
    {
        key: 'categories',
        path: '/categories/*',
        component: React.lazy(() => import('views/home/pages/categories'))
    },
    {
        key: 'wishlists',
        path: '/wishlists/*',
        component: React.lazy(() => import('views/home/pages/wishlists'))
    },
    {
        key: 'product-badge',
        path: '/product-badge/*',
        component: React.lazy(() => import('views/home/pages/products-badge'))
    },
    {
        key: 'products',
        path: '/products/*',
        component: React.lazy(() => import('views/home/pages/products'))
    },
    {
        key: 'adresses',
        path: '/adresses/*',
        component: React.lazy(() => import('views/home/pages/adresses'))
    },
    {
        key: 'product-categories',
        path: '/product-categories/*',
        component: React.lazy(() => import('views/home/pages/product-categories'))
    },
    {
        key: 'promos',
        path: '/promos/*',
        component: React.lazy(() => import('views/home/pages/promos'))
    },
    {
        key: 'retsept-wishlists',
        path: '/retsept-wishlists/*',
        component: React.lazy(() => import('views/home/pages/retsept-wishlists'))
    },
    {
        key: 'retsepts',
        path: '/retsepts/*',
        component: React.lazy(() => import('views/home/pages/retsepts'))
    },
    {
        key: 'users',
        path: '/users/*',
        component: React.lazy(() => import('views/home/pages/users'))
    },
    {
        key: 'settings',
        path: '/settings/*',
        component: React.lazy(() => import('views/home/pages/settings'))
    },
    {
        key: 'delivery',
        path: '/delivery/*',
        component: React.lazy(() => import('views/home/pages/delivery'))
    },
    {
        key: 'arxiv-orders',
        path: '/arxiv-orders/*',
        component: React.lazy(() => import('views/home/pages/arxiv-orders'))
    },



    {
        key: 'dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('views/home/pages/dashboard'))
    },
    {
        key: 'customer-products',
        path: '/customer-products/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/customer-products'))
    },
    {
        key: 'orders',
        path: '/orders/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/orders'))
    },
    {
        key: 'employee',
        path: '/employee/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/employee'))
    },
    {
        key: 'branches',
        path: '/branches/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/branches'))
    },
    {
        key: 'branch-products',
        path: '/branch-products/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/branch-products'))
    },
    {
        key: 'categories',
        path: '/categories/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/categories'))
    },
    {
        key: 'wishlists',
        path: '/wishlists/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/wishlists'))
    },
    {
        key: 'product-badge',
        path: '/product-badge/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/products-badge'))
    },
    {
        key: 'products',
        path: '/products/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/products'))
    },
    // {
    //     key: 'addProducts',
    //     path: '/actions/*',
    //     component: React.lazy(() => import('views/home/pages/actions/addProduct'))
    // },
    {
        key: 'adresses',
        path: '/adresses/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/adresses'))
    },
    {
        key: 'product-categories',
        path: '/product-categories/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/product-categories'))
    },
    {
        key: 'promos',
        path: '/promos/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/promos'))
    },
    {
        key: 'retsept-wishlists',
        path: '/retsept-wishlists/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/retsept-wishlists'))
    },
    {
        key: 'retsepts',
        path: '/retsepts/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/retsepts'))
    },
    {
        key: 'users',
        path: '/users/actions/*',
        component: React.lazy(() => import('views/home/pages/actions/users'))
    },
]