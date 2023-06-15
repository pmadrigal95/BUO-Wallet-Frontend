<script>
/**
 * Descripción: Pantalla de Buscar Habilidad
 *
 * @displayName BaseAvailableMicroSkills
 */
import { mapGetters } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

export default {
    name: 'BaseAvailableMicroSkills',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            microSkills: [],
            totalAvailableListClean: this.$_totalAvailableListClean(),
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),
    },

    methods: {
        $_createRequestBody() {
            if (this.microSkills.length > 0) {
                this.entity.body = {
                    usuarioId: this.user.userId,
                    cualificacionId: this.entity.header.cualificacionId,
                    listaCompetencias:
                        baseSharedFnHelper.$_createArrFromProperty(
                            this.microSkills,
                            'competenciaId'
                        ),
                };

                this.entity.step = 4;
            }
        },

        $_reviewMicroskill(id) {
            return baseSharedFnHelper.$_getObjectFromArray(
                this.microSkills,
                id,
                'competenciaId'
            );
        },

        $_insertMicroskill(id) {
            this.microSkills.push(
                baseSharedFnHelper.$_getObjectFromArray(
                    this.totalAvailableListClean,
                    id,
                    'competenciaId'
                )
            );
        },

        $_deleteMicroSkill(id) {
            this.microSkills.splice(
                baseSharedFnHelper.$_returnCurrentIndex(
                    this.microSkills,
                    id,
                    'cualificacionId'
                ),
                1
            );
        },

        $_setMicroskill(id) {
            if (!this.$_reviewMicroskill(id)) {
                this.$_insertMicroskill(id);
            } else {
                this.$_deleteMicroSkill(id);
            }
        },

        $_totalAvailableListClean() {
            return baseSharedFnHelper.$_removeDuplicates(
                this.entity.header.listaTotalDisponibles,
                'competenciaId'
            );
        },
    },
};
</script>

<template>
    <section>
        <section class="BUO-Paragraph-Large-SemiBold grey700--text pb-2">
            Disponible para validar ({{ totalAvailableListClean.length }})
        </section>

        <v-item-group multiple>
            <v-row>
                <v-col
                    v-for="(microskill, i) in totalAvailableListClean"
                    :key="i"
                    cols="12"
                >
                    <v-item v-slot="{ active, toggle }">
                        <v-card
                            flat
                            :color="active ? 'clouds' : 'grey200'"
                            class="rounded-lg"
                            @click="toggle"
                        >
                            <section
                                class="d-flex flex-no-wrap justify-space-between"
                                @click="
                                    $_setMicroskill(microskill.competenciaId)
                                "
                            >
                                <v-card-title
                                    class="BUO-Paragraph-Small buo-word-break grey700--text"
                                >
                                    {{ microskill.definicion }}
                                </v-card-title>

                                <v-avatar class="ma-2" tile>
                                    <v-icon v-if="!active" color="grey700">
                                        mdi-radiobox-blank
                                    </v-icon>

                                    <v-icon v-else color="primary">
                                        mdi-check-circle
                                    </v-icon>
                                </v-avatar>
                            </section>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
        </v-item-group>

        <v-row v-if="totalAvailableListClean.length > 0" class="pt-3">
            <v-btn
                @click="$_createRequestBody"
                :color="microSkills.length > 0 ? 'primary' : 'grey500'"
                dark
                block
                class="no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                elevation="0"
                >Validar
                {{
                    microSkills.length > 0 ? '(' + microSkills.length + ')' : ''
                }}</v-btn
            >
        </v-row>
    </section>
</template>
