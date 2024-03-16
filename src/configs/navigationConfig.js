import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FolderIcon from '@mui/icons-material/Folder';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CategoryIcon from '@mui/icons-material/Category';
import MapIcon from '@mui/icons-material/Map';
import PercentIcon from '@mui/icons-material/Percent';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupIcon from '@mui/icons-material/Group';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const navigationConfig = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
    },
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
        name: 'Xodimlar',
        path: '/employee',
        icon: <GroupAddIcon />,
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
    {
        name: 'Aksiyalar',
        path: '/product-badge',
        icon: <LoyaltyIcon />,
    },
    {
        name: 'Mahsulotlar',
        path: '/products',
        icon: <CategoryIcon />,
    },
    {
        name: 'Manzillar',
        path: '/adresses',
        icon: <MapIcon />,
    },
    // {
    //     name: 'Promo Kodlar',
    //     path: '/promos',
    //     icon: <PercentIcon />,
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
    },
    {
        name: 'Sozlamalar',
        path: '/settings',
        icon: <SettingsOutlinedIcon />,
    },
    {
        name: 'Kurer',
        path: '/delivery',
        icon: <AirportShuttleIcon />,
    },
    {
        name: 'Buyurtmalar arxivi',
        path: '/arxiv-orders',
        icon: <SendAndArchiveIcon />,
    }
]