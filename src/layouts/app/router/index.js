/**
 * Views Routers
 */

import pdaRoutes from '@/views/pda/router';

import homeRoutes from '@/views/home/router';

const routes = [
    {
        path: '/',
        redirect: '/Authentication',
        name: 'TheMain',
        component: 'app',
        children: [...pdaRoutes, ...homeRoutes],
    },
];

export default routes;
