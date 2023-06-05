<script>
/**
 * Descripción: Pantalla Agregar Empresa
 *
 * @displayName SetCompanyViewComponent
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCompanyForm = () =>
    import('@/views/certification/components/detailsCompany/BaseCompanyForm');

export default {
    name: 'SetCompanyViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseCompanyForm,
    },

    created() {
        this.$_checkData();
    },

    methods: {
        $_checkData() {
            if (
                !this.entity ||
                (!this.entity.body && this.entity.type != 'all')
            ) {
                this.entity.step = 3;
            }
        },

        $_goBack() {
            delete this.entity.labelBtn;
            if (this.entity.type != 'all') {
                this.$_deleteProperty();
                this.entity.step = 3;
            } else {
                this.entity.type = 'new';
                this.entity.step = 2;
            }
        },

        $_deleteProperty() {
            if (this.entity.body) {
                delete this.entity.body;
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="¿Con quién quieres validar tu indicador?"
        :btnAction="$_goBack"
    >
        <div slot="card-text">
            <BaseCompanyForm :entity="entity" />
        </div>
    </BaseCardViewComponent>
</template>
