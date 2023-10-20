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
        path: '/customer-products',
        component: React.lazy(() => import('views/home/pages/customer-products'))
    },
    {
        key: 'orders',
        path: '/orders',
        component: React.lazy(() => import('views/home/pages/orders'))
    },
    {
        key: 'branches',
        path: '/branches',
        component: React.lazy(() => import('views/home/pages/branches'))
    },
    {
        key: 'branch-products',
        path: '/branch-products',
        component: React.lazy(() => import('views/home/pages/branch-products'))
    },
    {
        key: 'categories',
        path: '/categories',
        component: React.lazy(() => import('views/home/pages/categories'))
    },
    {
        key: 'wishlists',
        path: '/wishlists',
        component: React.lazy(() => import('views/home/pages/wishlists'))
    },
    {
        key: 'product-badge',
        path: '/product-badge',
        component: React.lazy(() => import('views/home/pages/products-badge'))
    },
    {
        key: 'products',
        path: '/products',
        component: React.lazy(() => import('views/home/pages/products'))
    },
    {
        key: 'adresses',
        path: '/adresses',
        component: React.lazy(() => import('views/home/pages/adresses'))
    },
    {
        key: 'product-categories',
        path: '/product-categories',
        component: React.lazy(() => import('views/home/pages/product-categories'))
    },
    {
        key: 'promos',
        path: '/promos',
        component: React.lazy(() => import('views/home/pages/promos'))
    },
    {
        key: 'retsept-wishlists',
        path: '/retsept-wishlists',
        component: React.lazy(() => import('views/home/pages/retsept-wishlists'))
    },
    {
        key: 'retsepts',
        path: '/retsepts',
        component: React.lazy(() => import('views/home/pages/retsepts'))
    },
    {
        key: 'users',
        path: '/users',
        component: React.lazy(() => import('views/home/pages/users'))
    },
]