/**
 * PDA Wallet ROUTES
 */

import homeRoutes from '@/views/pda/wallet/home/router';

import profileRoutes from '@/views/pda/wallet/profile/router';

import behaviorsRoutes from '@/views/pda/wallet/behaviors/router';

import myAbilitiesPDARoutes from '@/views/pda/wallet/myPdaAbilities/router';

const routes = [
    ...homeRoutes,
    ...profileRoutes,
    ...behaviorsRoutes,
    ...myAbilitiesPDARoutes,
];

export default routes;
