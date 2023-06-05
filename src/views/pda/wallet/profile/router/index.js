/**
 * PDA Profile ROUTES
 */
const routes = [
    {
        path: '/PDA/Profile',
        name: 'PDAProfileViewComponent',
        component: 'pda/wallet/profile/PDAProfileViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
    {
        path: '/PDA/Profile/Shareable',
        name: 'PDAShareableProfileViewComponent',
        component: 'pda/wallet/profile/PDAShareableProfileViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
];

export default routes;
