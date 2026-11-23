import React from 'react'

function orgRoutes() {
  const org_routes = [
    {path: '/', element : <h1>home</h1>, layout : true},
    {path: '/dashboard', element: <h1>dashboard</h1>, layout: true},
    
  ]
  return org_routes
}

export default orgRoutes