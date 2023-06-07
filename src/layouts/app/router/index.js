/**
 * Views Routers
 */

import pdaRoutes from '@/views/pda/router';

import homeRoutes from '@/views/home/router';

import abilityRoutes from '@/views/ability/router';

import shareablesRoutes from '@/views/shareables/router';

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
            ...shareablesRoutes,
            ...certificationRoutes,
        ],
    },
];

export default routes;
