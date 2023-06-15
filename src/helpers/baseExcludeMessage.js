/**
 * Descripción: Exclusión de Métodos HTTP
 *
 * @displayName BaseExcludeMessage
 */

const exclusionList = [
    'user/save',
    'menuUsuario',
    '/user/authenticate',
    'etapaUsuario/save',
    'misc/validateCaptcha',
    'external_wallet/profile',
    'user/createShareableLink',
    'cualificacion/findAllByCategoriaIdIn',
    'cualificacion/findAllByDefinicion/',
];

const logOutExclusion = ['/user/authenticate'];

export default {
    $_validMethod(value) {
        return !exclusionList.find((element) => {
            return value.includes(element) ? true : false;
        });
    },

    $_validLogin(value) {
        return logOutExclusion.includes(value);
    },
};
