import { useRoutes } from 'react-router-dom'
import Layout from '@/pages/layout'
import Rank from '@/pages/rank'
import Recommend from '@/pages/recommend'
import Singers from '@/pages/singers'

const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Recommend />
        },
        {
          path: 'recommend',
          element: <Recommend />
        },
        {
          path: 'rank',
          element: <Rank />
        },
        {
          path: 'singers',
          element: <Singers />
        }
      ]
    }
  ])
  return element
}

export default Routes
