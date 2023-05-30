/**
 * Authentication ROUTES
 */

import loginRoutes from '@/views/authentication/login/router';

import signUpRoutes from '@/views/authentication/signUp/router';

import resetPasswordRoutes from '@/views/authentication/resetPassword/router';

const routes = [...loginRoutes, ...signUpRoutes, ...resetPasswordRoutes];

export default routes;
