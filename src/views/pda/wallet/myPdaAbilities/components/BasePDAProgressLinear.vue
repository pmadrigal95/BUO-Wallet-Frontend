<script>
/**
 * Descripción: Pantalla PDA Habilidades
 *
 * @displayName BasePDAProgressLinear
 */

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BasePDAGraph',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    computed: {
        ...mapGetters('pda', ['pdaWallet', 'loadingPdaWallet']),
    },

    methods: {
        ...mapActions('pda', ['$_request_pda_wallet']),

        $_changeMode(index) {
            this.entity.complete = !this.entity.complete;
            this.entity.step = index;
            this.$vuetify.goTo(0);
        },
    },
};
</script>

<template>
    <div>
        <BaseSkeletonLoader
            v-if="loadingPdaWallet && !pdaWallet"
            type="image"
        />
        <v-card flat v-else>
            <v-card-text>
                <v-list dense flat>
                    <v-list-item-group>
                        <v-list-item
                            v-for="(item, i) in pdaWallet.habilidadPDADTOSet"
                            :key="i"
                            @click="$_changeMode(i)"
                        >
                            <v-list-item-avatar>
                                <v-icon
                                    :color="pdaWallet.perfilPDA.toLowerCase()"
                                    >mdi-check-circle-outline</v-icon
                                >
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title
                                    class="BUO-Paragraph-Small buo-word-break buo-white-space Buo-Black"
                                >
                                    <div
                                        class="d-flex flex-no-wrap justify-space-between buo-word-break"
                                    >
                                        <span>
                                            {{ item.habilidad }}
                                        </span>
                                        <span>
                                            {{
                                                item.porcentajeNaturalHabilidadFormato +
                                                '%'
                                            }}
                                        </span>
                                    </div>
                                    <v-progress-linear
                                        rounded
                                        :value="
                                            item.porcentajeNaturalHabilidadFormato
                                        "
                                        :color="
                                            pdaWallet.perfilPDA.toLowerCase()
                                        "
                                    />
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
    </div>
</template>
