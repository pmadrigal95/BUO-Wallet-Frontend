/* __placeholder__ */
/**
* Descripción: Pantalla BUO Cover para versión móvil
*
* @displayName LinkedlnCardMobileViewComponent
*/
export default (await import('vue')).defineComponent({
name: 'LinkedlnCardMobileViewComponent',

props: {
color: {
type: String,
default: 'bg-buo',
},

image: {
type: String,
required: false,
},

title: {
type: String,
required: true,
},

styleTitle: {
type: String,
default: 'BUO-Heading-Small white--text',
},

description: {
type: String,
required: true,
},

styleDescription: {
type: String,
default: 'BUO-Paragraph-Medium white--text',
},

nameButton: {
type: String,
default: 'Descargar',
},

styleButton: {
type: String,
default: 'ml-n1 ma-2 no-uppercase rounded-lg',
},

colorButton: {
type: String,
default: 'blue900',
},

fnButton: {
type: Function,
required: true,
},

disabledButton: {
type: Boolean,
default: false,
},

icon: {
type: String,
required: false,
},

iconColor: {
type: String,
default: 'white',
},

smallIcon: {
type: Boolean,
default: false,
},

largeIcon: {
type: Boolean,
default: false,
},

xLargeIcon: {
type: Boolean,
default: false,
},

fnIcon: {
type: Function,
required: false,
},
},

data() {
return {
showAdvertisement: true,
};
},

methods: {
$_fnButton() {
this.fnButton();
},

$_closeAdvertisement() {
this.showAdvertisement = false;
},

$_fnIcon() {
if (this.fnIcon) this.fnIcon();
else this.$_closeAdvertisement();
},
},
});
