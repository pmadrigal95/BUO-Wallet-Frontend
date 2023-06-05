/**
 * PDA Wallet ROUTES
 */
const routes = [
    {
        path: '/PDA/Wallet',
        name: 'PDAWalletViewComponent',
        component: 'pda/wallet/home/PDAWalletViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
    {
        path: '/PDA/Wallet/Shareables',
        name: 'ShareablesViewComponent',
        component: 'pda/wallet/home/ShareablesViewComponent',
        meta: {
            module: 'TestTakingViewComponent',
        },
    },
];

export default routes;
