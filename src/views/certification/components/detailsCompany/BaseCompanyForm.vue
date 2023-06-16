<script>
/**
 * Descripción: Pantalla Agregar Empresa
 *
 * @displayName BaseCompanyForm
 */

import { mapGetters, mapActions } from 'vuex';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import httpService from '@/services/axios/httpService.js';

export default {
    name: 'BaseCompanyForm',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            loading: false,
            entityForm: this.$_Object(),
        };
    },

    computed: {
        /**
         * Nombre de Usuario
         */
        ...mapGetters('authentication', ['user']),

        ...mapGetters('theme', ['app']),

        labelBtn() {
            return this.entity.labelBtn ? this.entity.labelBtn : 'Validar';
        },
    },

    created() {
        this.$_createCompanyList();

        this.entityForm.myCompany = this.user?.companyId ? true : undefined;
    },

    watch: {
        'entity.step'() {
            if (this.entity.step == 4 && this.entity.body) {
                this.$_createCompanyList();
            }
        },
    },

    methods: {
        ...mapActions('wallet', ['$_wallet_cleanbuowallet']),
        /**
         * Obj de la pantalla
         */
        $_Object() {
            return {
                myCompany: undefined,
                companies: [],
            };
        },

        $_sendToApi() {
            if (this.entity.type != 'all') {
                this.$_cleanEntityBody();
                this.$_sendToApiOne();
            } else if (this.entity.type == 'all') {
                this.$_sendToApiAll();
            }
        },

        $_sendToApiOne() {
            this.$_returnFormData();
            this.loading = true;
            httpService[this.entity.type != 'new' ? 'put' : 'post'](
                `wallet/${this.entity.type != 'new' ? 'update' : 'add'}`,
                this.entity.body
            ).then((response) => {
                if (response != undefined) {
                    this.$_nextStep();
                }
                this.loading = false;
            });
        },

        $_sendToApiAll() {
            this.loading = true;
            let array = [];
            this.entity.qualifications.forEach((element) => {
                array.push(this.$_returnCompleteObject(element));
            });

            httpService.post('wallet/addMultiple', array).then((response) => {
                if (response != undefined) {
                    this.$_nextStep();
                }
                this.loading = false;
            });
        },

        $_returnCompleteObject(element) {
            if (this.entityForm.myCompany) {
                return {
                    usuarioId: this.user.userId,
                    cualificacionId: element.cualificacionId,
                    listaCompetencias: [],
                    organizacionId: this.user.companyId,
                    comentario:
                        this.entityForm.comentario != ''
                            ? this.entityForm.comentario
                            : undefined,
                };
            } else {
                return {
                    usuarioId: this.user.userId,
                    cualificacionId: element.cualificacionId,
                    listaCompetencias: [],
                    organizacionId: 0,
                    nombreOrganizacion: this.entityForm.nombreOrganizacion,
                    nombreCompletoSupervisor:
                        this.entityForm.nombreCompletoSupervisor,
                    emailSupervisor: this.entityForm.emailSupervisor,
                    cargoSupervisor: this.entityForm.cargoSupervisor,
                    comentario:
                        this.entityForm.comentario != ''
                            ? this.entityForm.comentario
                            : undefined,
                };
            }
        },

        $_returnFormData() {
            switch (this.entityForm.myCompany) {
                case true:
                    this.$_returnUsingMycompany();
                    break;
                case false:
                case undefined:
                case null:
                    this.$_returnUsingNewCompany();
                    break;
            }
        },

        $_returnUsingMycompany() {
            this.entity.body.organizacionId = this.user.companyId;
            this.entity.body.comentario =
                this.entityForm.comentario != ''
                    ? this.entityForm.comentario
                    : undefined;
        },

        $_returnUsingNewCompany() {
            if (this.entity.type == 'new') {
                this.entity.body.organizacionId = 0;
                this.entity.body.nombreOrganizacion =
                    this.entityForm.nombreOrganizacion;
                this.entity.body.nombreCompletoSupervisor =
                    this.entityForm.nombreCompletoSupervisor;
                this.entity.body.emailSupervisor =
                    this.entityForm.emailSupervisor;
                this.entity.body.cargoSupervisor =
                    this.entityForm.cargoSupervisor;
                this.entity.body.comentario =
                    this.entityForm.comentario != ''
                        ? this.entityForm.comentario
                        : undefined;
            } else if (this.entity.type == 'edit') {
                this.entity.body.organizacionId =
                    this.entityForm.organizacionId;
                this.entity.body.comentario =
                    this.entityForm.comentario != ''
                        ? this.entityForm.comentario
                        : undefined;
            }
        },

        $_cleanEntityBody() {
            this.entity.body.organizacionId = undefined;
            this.entity.body.nombreOrganizacion = undefined;
            this.entity.body.nombreCompletoSupervisor = undefined;
            this.entity.body.emailSupervisor = undefined;
            this.entity.body.cargoSupervisor = undefined;
            this.entity.body.comentario = undefined;
        },

        $_nextStep() {
            if (this.entity.body && this.entity.type != 'all') {
                delete this.entity.body;
            }
            delete this.entity.labelBtn;
            this.$_wallet_cleanbuowallet();
            this.entityForm = this.$_Object();
            this.entity.step = 5;
        },

        $_createCompanyList() {
            if (this.entity.type === 'edit') {
                this.entityForm.companies = this.$_setCompanyList();
            } else {
                this.entityForm.companies = undefined;
            }
        },

        $_setCompanyList() {
            let array = [];

            const result = this.$_totalAvailableList();

            result.forEach((element) => {
                let result = baseSharedFnHelper.$_getObjectFromArray(
                    this.entity.header.listaOrganizacionVerificacion,
                    element.organizacionId
                );

                if (result) {
                    array.push({
                        organizacionId: element?.organizacionId,
                        nombreOrganizacion: result?.nombreOrganizacion,
                        nombreSupervisor: result?.nombreSupervisor,
                    });
                }
            });

            const FinalArray = baseSharedFnHelper.$_removeDuplicates(
                array,
                'organizacionId'
            );

            return FinalArray.length > 0 ? FinalArray : [];
        },

        $_totalAvailableList() {
            let array = [];
            this.entity.body.listaCompetencias.forEach((element) => {
                const result = this.entity.header.listaTotalDisponibles.filter(
                    (x) => (x.competenciaId = element)
                );

                array = [...result];
            });

            return array;
        },
    },
};
</script>

<template>
    <section>
        <!-- @ Use Loanding... -->
        <BaseSkeletonLoader v-if="loading && !user" type="image" />
        <v-row v-else>
            <v-layout
                justify-space-between
                align-center
                v-if="user && user.companyId"
            >
                <section
                    class="BUO-Paragraph-Medium"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Validar con mi empresa
                </section>

                <BaseSwitch v-model="entityForm.myCompany" />
            </v-layout>

            <v-flex xs12 sm12 md12>
                <BaseForm :method="$_sendToApi" :labelBtn="labelBtn" block>
                    <div slot="body">
                        <v-row>
                            <v-col
                                cols="12"
                                v-if="
                                    !entityForm.myCompany &&
                                    entity.type != 'edit'
                                "
                            >
                                <BaseInput
                                    v-model.trim="entityForm.nombreOrganizacion"
                                    label="Empresa"
                                    :validate="['text']"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    !entityForm.myCompany &&
                                    entity.type != 'edit'
                                "
                            >
                                <BaseInput
                                    v-model.trim="
                                        entityForm.nombreCompletoSupervisor
                                    "
                                    label="Nombre completo del supervisor"
                                    :validate="['text']"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    !entityForm.myCompany &&
                                    entity.type != 'edit'
                                "
                            >
                                <BaseInput
                                    v-model.trim="entityForm.emailSupervisor"
                                    label="Email del supervisor"
                                    :validate="['email']"
                                />
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    !entityForm.myCompany &&
                                    entity.type != 'edit'
                                "
                            >
                                <BaseInput
                                    v-model.trim="entityForm.cargoSupervisor"
                                    label="Cargo del supervisor"
                                    :validate="['text']"
                                />
                            </v-col>

                            <v-col
                                cols="12"
                                v-if="
                                    !entityForm.myCompany &&
                                    entity.type == 'edit'
                                "
                            >
                                <BaseSelect
                                    v-model="entityForm.organizacionId"
                                    label="Empresa"
                                    :endpoint="entityForm.companies"
                                    itemText="nombreOrganizacion"
                                    itemValue="organizacionId"
                                    :validate="['text']"
                                />
                            </v-col>

                            <v-col
                                cols="12"
                                v-if="
                                    entityForm.myCompany &&
                                    user &&
                                    user.companyId
                                "
                            >
                                <v-layout justify-start>
                                    <v-list-item
                                        :two-line="
                                            user && user.companyDateAdded
                                                ? true
                                                : false
                                        "
                                        class="buo-headerAbility-position"
                                    >
                                        <v-list-item-avatar size="45">
                                            <img
                                                :src="user.companyLogo"
                                                v-if="user.companyLogo"
                                            />
                                            <v-avatar
                                                tile
                                                color="primary"
                                                v-else
                                            >
                                                <span class="white--text">{{
                                                    user.companyName.charAt(0)
                                                }}</span>
                                            </v-avatar>
                                        </v-list-item-avatar>
                                        <v-list-item-content class="ms-n3">
                                            <v-list-item-title
                                                class="BUO-Paragraph-Medium"
                                                >{{ user.companyName }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle
                                                v-if="
                                                    user &&
                                                    user.companyDateAdded
                                                "
                                                class="BUO-Paragraph-Small"
                                                >{{
                                                    'Agregado el ' +
                                                    user.companyDateAdded
                                                }}</v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-layout>
                            </v-col>

                            <v-col cols="12" md="12">
                                <BaseTextArea
                                    v-model.trim="entityForm.comentario"
                                    placeholder="Redacta un mensaje para la persona que validará tu indicador."
                                    :counter="300"
                                    :max="300"
                                    rows="3"
                                />
                            </v-col>
                        </v-row>
                    </div>
                </BaseForm>
            </v-flex>
        </v-row>
    </section>
</template>
