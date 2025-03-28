import { Outlet } from "react-router-dom"
import Footer from "../UI/Footer"
import {Header} from "../UI/Header"

function AppLayout() {
  return (
    <div>
      <Header/> 
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default AppLayout
