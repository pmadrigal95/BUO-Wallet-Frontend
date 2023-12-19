<script>
/**
 * Descripción: Pantalla PDA Comportamientos
 *
 * @displayName BasePDABehaviourDetailsViewComponent
 */

import '@/css/pda.css';

import { mapGetters } from 'vuex';

const BaseShareableTestAxis = () =>
    import('@/components/pda/shareable/test/BaseShareableTestAxis');

export default {
    name: 'BasePDABehaviourDetailsViewComponent',

    metaInfo: { title: 'Mis Comportamientos Buo Psychometric' },

    components: {
        BaseShareableTestAxis,
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'premium']),

        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        entity() {
            return this.pdaWallet?.ejePDADTOSet.find(
                (element) =>
                    element.id == parseInt(this.$router.currentRoute.params.Id)
            );
        },
    },

    mounted() {
        if (this.pdaWallet && this.pdaWallet.tipoMembrecia != this.premium) {
            this.$_returnToWallet();
        }
    },

    methods: {
        /**
         * Volver al Wallet
         */
        $_returnToWallet() {
            this.$router.push({
                name: 'PDABehaviorsViewComponent',
            });
        },

        $_goToDetails() {
            if (this.entity) {
                this.$router.push({
                    name: 'PDABehaviourDetailsViewComponent',
                    params: { Id: this.entity.id },
                });
            } else {
                this.$_returnToWallet();
            }
        },

        $_axis() {
            return {
                name: this.user.name.split(' ')[0],
                perfilPDA: this.pdaWallet.perfilPDA,
                left: this.entity.etiquetaIzquierda,
                right: this.entity.etiquetaDerecha,
                valorEjeFormato: this.entity.valorEjeFormato,
                frase: this.entity.fraseEje,
                benchmarkEjeFormato: this.entity.benchmarkEjeFormato,
                type: this.entity.nombre,
                nombreUI: this.entity.nombreUI,
            };
        },
    },
};
</script>

<template>
    <div v-if="pdaWallet">
        <v-layout justify-start align-center>
            <v-btn
                :color="app ? 'blueProgress600' : 'blue800'"
                class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                elevation="0"
                text
                @click="$_goToDetails"
            >
                <v-icon left dark> mdi-chevron-left </v-icon>Regresar</v-btn
            >
        </v-layout>
        <BaseShareableTestAxis
            ref="BaseShareableTestAxis"
            :entity="$_axis()"
            v-if="entity"
        />
        <V-card flat v-else>
            <v-img
                contain
                height="350"
                src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/404.png"
                lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/compartidos/404.png"
            ></v-img>
        </V-card>
    </div>
</template>
