/**
 * Views Routers
 */

import pdaRoutes from '@/views/pda/router';

import homeRoutes from '@/views/home/router';

import abilityRoutes from '@/views/ability/router';

import certificationRoutes from '@/views/certification/router';

const routes = [
    {
        path: '/',
        redirect: '/Authentication',
        name: 'TheMain',
        component: 'app',
        children: [
            ...pdaRoutes,
            ...homeRoutes,
            ...abilityRoutes,
            ...certificationRoutes,
        ],
    },
];

export default routes;
