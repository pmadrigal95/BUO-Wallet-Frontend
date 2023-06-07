/**
 * Authentication ROUTES
 */

import loginRoutes from '@/views/authentication/login/router';

import signUpRoutes from '@/views/authentication/signUp/router';

const routes = [...loginRoutes, ...signUpRoutes];

export default routes;
