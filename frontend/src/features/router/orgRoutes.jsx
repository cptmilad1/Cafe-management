import { lazy } from 'react';

const Home = lazy(() => import('../home/pages/Home'));
const Dashboard = lazy(() => import('../dashboard/pages/Dashboard'));
const Login = lazy(() => import('../auth/pages/Login'));
const SignUp = lazy(() => import('../auth/pages/SignUp'));
const Menu = lazy(() => import('../cafe/pages/Menu'));
const Orders = lazy(() => import('../cafe/pages/Orders'));
const Tables = lazy(() => import('../cafe/pages/Tables'));

function orgRoutes() {
  const org_routes = [
    { path: '/', element: <Home />, layout: true },
    { path: '/dashboard', element: <Dashboard />, layout: true },
    { path: '/login', element: <Login />, layout: false },
    { path: '/signup', element: <SignUp />, layout: false },
    { path: '/menu', element: <Menu />, layout: true },
    { path: '/orders', element: <Orders />, layout: true },
    { path: '/tables', element: <Tables />, layout: true },
  ];
  return org_routes;
}

export default orgRoutes;
