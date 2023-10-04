/* __placeholder__ */
/**
* Descripción: Pantalla de anuncios para versión desktop
*
* @displayName BaseAdvertisementDesktopViewComponent
*/
export default (await import('vue')).defineComponent({
name: 'BaseAdvertisementDesktopViewComponent',

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
default: 'BUO-Heading-Medium white--text',
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
default: 'BUO-Paragraph-Small-SemiBold ma-2 no-uppercase rounded-lg',
},

colorButton: {
type: String,
default: 'blue900',
},

fnButton: {
type: Function,
required: true,
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

$_fnIcon() {
switch (true) {
case this.fnIcon:
break;
case 2: break;

}
this.fnIcon();
},

$_showAdvertisement() {
this.showAdvertisement = false;
},
},
});
