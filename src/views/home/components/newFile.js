export default (await import('vue')).defineComponent({
name: 'LinkedlnCoverViewComponent',

components: {
BaseAdvertisementMobileViewComponent,
BaseAdvertisementDesktopViewComponent,
},

data() {
return {
showAdvertisement: true,
};
},

methods: {
$_download() {
this.$router.push({
name: 'ShareableLinkedlnViewComponent',
});
},

$_showAdvertisement() {
this.showAdvertisement = false;
},
},
});
