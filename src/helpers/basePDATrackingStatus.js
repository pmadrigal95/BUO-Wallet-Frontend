/**
 * Descripción: Estados PDA Tracking Analytics
 *
 * @displayName basePDATrackingStatus
 */

import httpService from '@/services/axios/httpService.js';

export default {
    signUp: 1,

    rules: 2,

    questionOne: 3,

    questionTwo: 4,

    questionThree: 5,

    resultOne: 6,

    resultTwo: 7,

    resultThree: 8,

    payment: 9,

    $_sendToPDAAnalytics(userId, step) {
        const request = {
            usuarioId: userId,
            etapaAplicacionId: step,
        };

        httpService.post('etapaUsuario/save', request);
    },
};
