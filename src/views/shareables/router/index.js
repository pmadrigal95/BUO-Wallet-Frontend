/**
 * shareables ROUTES
 */
import buoWalletRoutes from '@/views/shareables/buoWallet/router';
import linkedlnCoverRoutes from '@/views/shareables/linkedlnCover/router';

const routes = [...buoWalletRoutes, ...linkedlnCoverRoutes];

export default routes;
