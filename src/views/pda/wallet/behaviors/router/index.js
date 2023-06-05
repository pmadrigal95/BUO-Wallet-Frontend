/**
 * PDA Profile ROUTES
 */
const routes = [
    {
        path: '/PDA/Behaviors',
        name: 'PDABehaviorsViewComponent',
        component: 'pda/wallet/behaviors/PDABehaviorsViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
    {
        path: '/PDA/Axis/:Id',
        name: 'PDABehaviourDetailsViewComponent',
        component: 'pda/wallet/behaviors/PDABehaviourDetailsViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
    {
        path: '/PDA/Axis/Shareable/:Id',
        name: 'PDAShareableAxisBehaviourViewComponent',
        component:
            'pda/wallet/behaviors/PDAShareableAxisBehaviourViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
];

export default routes;
