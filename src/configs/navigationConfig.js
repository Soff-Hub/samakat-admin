import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CategoryIcon from '@mui/icons-material/Category';
import MapIcon from '@mui/icons-material/Map';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PercentIcon from '@mui/icons-material/Percent';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupIcon from '@mui/icons-material/Group';

export const navigationConfig = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
    },
    // {
    //     name: 'Buyurtmachi mahsulotlari',
    //     path: '/customer-products',
    //     icon: <ShoppingBagIcon />,
    // },
    {
        name: 'Buyurtmalar',
        path: '/orders',
        icon: <LocalShippingIcon />,
    },
    {
        name: 'Filiallar',
        path: '/branches',
        icon: <LocationOnIcon />,
    },
    {
        name: 'Filiallardagi mahsulotlar',
        path: '/branch-products',
        icon: <ProductionQuantityLimitsIcon />,
    },
    {
        name: 'Kategoriyalar',
        path: '/categories',
        icon: <FolderIcon />,
    },
    // {
    //     name: 'Mahsulot Wishlistlar',
    //     path: '/wishlists',
    //     icon: <FavoriteIcon />,
    // },
    {
        name: 'Mahsulot Belgisi',
        path: '/product-badge',
        icon: <LoyaltyIcon />,
    },
    {
        name: 'Mahsulotlar',
        path: '/products',
        icon: <CategoryIcon />,
    },
    {
        name: 'Mazillar',
        path: '/adresses',
        icon: <MapIcon />,
    },
    // {
    //     name: 'Mahsulot kategoriyalari',
    //     path: '/product-categories',
    //     icon: <AccountTreeIcon />,
    // },
    {
        name: 'Promo Kodlar',
        path: '/promos',
        icon: <PercentIcon />,
    },
    // {
    //     name: 'Retsept Wishlistlar',
    //     path: '/retsept-wishlists',
    //     icon: <FavoriteIcon />,
    // },
    {
        name: 'Retseptlar',
        path: '/retsepts',
        icon: <RestaurantIcon />,
    },
    {
        name: 'Foydalanuvchilar',
        path: '/users',
        icon: <GroupIcon />,
    }
]