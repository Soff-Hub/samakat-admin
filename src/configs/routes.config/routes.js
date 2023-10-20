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
        key: 'customer-products',
        path: '/customer-products/*',
        component: React.lazy(() => import('views/home/pages/customer-products'))
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
        key: 'dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('views/home/pages/dashboard'))
    },
    {
        key: 'customer-products',
        path: '/customer-products/add',
        component: React.lazy(() => import('views/home/pages/add-page/customer-products'))
    },
    {
        key: 'orders',
        path: '/orders/add',
        component: React.lazy(() => import('views/home/pages/add-page/orders'))
    },
    {
        key: 'branches',
        path: '/branches/add',
        component: React.lazy(() => import('views/home/pages/add-page/branches'))
    },
    {
        key: 'branch-products',
        path: '/branch-products/add',
        component: React.lazy(() => import('views/home/pages/add-page/branch-products'))
    },
    {
        key: 'categories',
        path: '/categories/add',
        component: React.lazy(() => import('views/home/pages/add-page/categories'))
    },
    {
        key: 'wishlists',
        path: '/wishlists/add',
        component: React.lazy(() => import('views/home/pages/add-page/wishlists'))
    },
    {
        key: 'product-badge',
        path: '/product-badge/add',
        component: React.lazy(() => import('views/home/pages/add-page/products-badge'))
    },
    {
        key: 'products',
        path: '/products/add',
        component: React.lazy(() => import('views/home/pages/add-page/products'))
    },
    {
        key: 'adresses',
        path: '/adresses/add',
        component: React.lazy(() => import('views/home/pages/add-page/adresses'))
    },
    {
        key: 'product-categories',
        path: '/product-categories/add',
        component: React.lazy(() => import('views/home/pages/add-page/product-categories'))
    },
    {
        key: 'promos',
        path: '/promos/add',
        component: React.lazy(() => import('views/home/pages/add-page/promos'))
    },
    {
        key: 'retsept-wishlists',
        path: '/retsept-wishlists/add',
        component: React.lazy(() => import('views/home/pages/add-page/retsept-wishlists'))
    },
    {
        key: 'retsepts',
        path: '/retsepts/add',
        component: React.lazy(() => import('views/home/pages/add-page/retsepts'))
    },
    {
        key: 'users',
        path: '/users/add',
        component: React.lazy(() => import('views/home/pages/add-page/users'))
    },
]