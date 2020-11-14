import login from '../components/login'
import dashboard from '../components/dashboard'
import overview from '../components/overview'
import rentals from '../components/rentals'
import blog from '../components/blog'
import pagenotfound from '../components/pagenotfound'

const routes = [
    { path: '', component: login },
    {
        path: '/dashboard',
        component: dashboard,
        children: [
            { path: '', component: overview },
            { path: 'rentals', component: rentals },
            { path: 'blog', component: blog },
        ]
    },
    { path: '*', component: pagenotfound }
]

export default routes;