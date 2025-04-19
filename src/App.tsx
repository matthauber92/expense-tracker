import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {
  DashboardPage,
  NotFound,
} from '@features';
import {AppLayout} from '@common';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <DashboardPage/> // Home page at root
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
