var width;
if (document.documentElement.clientWidth < 993) {
	name = 'noWow';
}
else {
	name = 'wow';
}
wow = new WOW({
	boxClass: name
	, animateClass: 'animated', // default
	offset: 0, // default
	mobile: true, // default
	live: true // default
})
wow.init();