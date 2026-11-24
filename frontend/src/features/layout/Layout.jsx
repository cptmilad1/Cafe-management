import NavBar from "../navbar/navbar"

function Layout({children}) {
  return (
    <div className='w-full flex flex-col items-center bg-[url(/imgs/img1.jpg)] bg-cover bg-center h-screen'>
      <div className="navbar w-full flex flex-col items-center">
        <NavBar/>
      </div>
      {children}
    </div>
  )
}

export default Layout