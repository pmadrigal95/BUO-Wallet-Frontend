/**
 * PDA Abilities ROUTES
 */
const routes = [
    {
        path: '/PDA/MyAbilities',
        name: 'MyAbilitiesPDAViewComponent',
        component: 'pda/wallet/myPdaAbilities/MyAbilitiesPDAViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
    {
        path: '/PDA/MyAbilities/Shareable',
        name: 'ShareableMyAbilitiesViewComponent',
        component:
            'pda/wallet/myPdaAbilities/ShareableMyAbilitiesViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
];

export default routes;
