import { createBrowserRouter } from 'react-router'
import About from '../pages/About'
import App from '../App'
import Layout from '../components/layout/Main/Layout.jsx'
import Home from '../pages/Home/Home'
import Login from '../pages/AuthPages/login/Login.jsx'
import Register from '../pages/AuthPages/Register/Register.jsx'
import Allcarts from '../pages/Allcarts/Allcarts.jsx'
import AllBlogs from '../pages/AllBlogs/AllBlogs.jsx'
import AdventureDetails from '../pages/Details/AdventureDetails.jsx'
import PrivateRouter from './PrivetRouter.jsx'
import BookingPage from '../pages/BookedTravele/BookingPage.jsx'
import UpdateAdv from '../pages/UpdateAdv/UpdateAdv.jsx'
import ManagePlace from '../pages/Manage/ManagePlace.jsx'
import AddToCartForm from '../pages/AddCart/AddToCartForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/all-place',
        element: <Allcarts></Allcarts>
      },
      {
        path: '/all-blogs',
        element: <AllBlogs></AllBlogs>
      },
      {
        path: '/dashboard/booked-traveles',
        element: <BookingPage></BookingPage>
      },
      {
        path: '/dashboard/manage-travele',
        element: (
          <PrivateRouter>
            <ManagePlace></ManagePlace>
          </PrivateRouter>
        )
      },
      {
        path: '/dashboard/add-travele',
        element: (
          <PrivateRouter>
            <AddToCartForm></AddToCartForm>
          </PrivateRouter>
        )
      },
      {
        path: '/adventures/:id',
        element: (
          <PrivateRouter>
            <AdventureDetails></AdventureDetails>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/single-carts/${params.id}`)
            .then(res => res.json())
            .catch(err => {
              console.error('Error fetching toy details:', err)
            })
      },
      // {
      //   path: '/dashboard/update-services/:id',
      //   element: (
      //     <PrivateRouter>
      //       <UpdateAdv></UpdateAdv>
      //     </PrivateRouter>
      //   ),
      //   loader: ({ params }) =>
      //     fetch(`http://localhost:5000/update-carts/${params.id}`)
      //       .then(res => res.json())
      //       .catch(err => {
      //         console.error('Error fetching toy details:', err)
      //       })
      // },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <App />,
    children: [
      {
        path: 'about',
        element: <About />
      }
    ]
  }
])
export default router
