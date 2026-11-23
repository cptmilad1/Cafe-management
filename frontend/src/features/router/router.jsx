import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import orgRoutes from './utils/orgRoutes'
const Layout = lazy(()=>import('../layout/Layout'))

function Router() {
  return (
    <Suspense fallback={<h1 className='flex justify-center items-center text-7xl'>Loading</h1>}>
        <Routes>
            {orgRoutes().map((route, index)=>(
                <Route key={index} path={route.path} element={route.layout ? <Layout>{route.element}</Layout> : route.element}/>
            ))}
        </Routes>
    </Suspense>
  )
}

export default Router