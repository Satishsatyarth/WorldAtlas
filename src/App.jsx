
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import {Home} from "./Pages/Home";
import {About} from "./Pages/About";
import {Contact} from "./Pages/Contact";
import {Country} from "./Pages/Country";
import AppLayout from "./Component/Layout/AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import { CountryDetails } from "./Component/Layout/CountryDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element : <AppLayout/>,
    errorElement:<ErrorPage/>,
    children :[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "About",
        element: <About />
      },
      {
        path: "Contact",
        element: <Contact />
      },
      {
        path: "Country",
        element: <Country />
      },
      {
        path: "country/:id",
        element: <CountryDetails/>
      },
    ]
  }
]);

const App = () =>{
  return(
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App; 