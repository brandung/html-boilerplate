/**##############################
#		Global Namespace		#
#################################*/
var brandung = function (out) {
	out = out || {};

	for (var i = 1; i < arguments.length; i++) {
		if (!arguments[i]) {
			continue;
		}

		for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) {
				out[key] = arguments[i][key];
			}
		}
	}

	return out;
}({}, (brandung || {}), {
	vars: {
		// path to assets folder
		folderPath: '%%public%%/',
		// standard breakpoints
		breakpoints: {
			320: 'xs',
			480: 's',
			768: 'm',
			992: 'l',
			1280: 'xl'
		},
		// mobile first
		currentBreakpoint: 320,
		// portrait first
		currentOrientation: 'portrait',
		isIE: window.navigator.userAgent.indexOf("MSIE ") > -1 || // IE <= 10
			!(window.ActiveXObject) && "ActiveXObject" in window || // IE 11
			/x64|x32/ig.test(window.navigator.userAgent) // IE 12
	},
	util: {},
	// CSS components script namespace
	component: {},
	// functions must return something
	func: {},
	// everything that has to do with event handling
	handle: {},
	// mainly used for imports
	page: {},
	// Should be used for things which have nothing to do with components, e.g. placeholder polyfills, etc
	plugin: {}
});

// abortion timeout for asset fetching, default 5000ms
basket.timeout = 60000;

// load main plugins
basket.require(
	{
		url: brandung.vars.folderPath + 'js/libs/vendor/jquery/jquery.min.js',
		unique: 0
	},
	{
		url: brandung.vars.folderPath + 'js/libs/vendor/modernizr/modernizr.custom.min.js',
		unique: 0
	},
	{
		url: brandung.vars.folderPath + 'js/libs/vendor/import/jquery.import.min.js',
		unique: 0
	}
).then(function () {
	(function ($) {
		// store commonly used jQuery objects to GlobalVars object
		brandung.vars = $.extend(brandung.vars, {
			$html: $('html'),
			$body: $('body'),
			$window: $(window),
			$doc: $(document)
		});

		brandung.plugin.fetchBeforeRender = function () {
			return $.import([
				{
					condition: true,
					order: 0,
					fetch: [
						// <@bundle#before-render
						brandung.vars.folderPath + 'js/util/console-polyfill.js',
						brandung.vars.folderPath + 'js/util/inject-smartresize.js',
						brandung.vars.folderPath + 'js/func/get-breakpoint.js',
						brandung.vars.folderPath + 'js/func/get-orientation.js',
						brandung.vars.folderPath + 'js/util/get-unique.js',
						brandung.vars.folderPath + 'js/handle/resize-handler.js',
						brandung.vars.folderPath + 'js/handle/set-event-class.js'
						// bundle@>
					],
					callback: [
						{ method: brandung.plugin.loadComponents }
					],
					unique: 0
				}
			], false);
		};

		brandung.plugin.loadComponents = function () {
			$.import([
				// <@delete
				{
					condition: true,
					fetch: [
						brandung.vars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.js',
						brandung.vars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.css',
						brandung.vars.folderPath + 'js/plugin/init-debug-mode.js'
					],
					unique: brandung.util.getUnique()
				},
				// delete@>
				{
					condition: true,
					fetch: [
						// <@bundle#h5bp-helper
						brandung.vars.folderPath + 'js/libs/vendor/h5bp/helper.js',
						brandung.vars.folderPath + 'js/plugin/h5bp-helper.js'
						// bundle@>
					],
					unique: brandung.util.getUnique()
				},
				{
					// load always and always from server
					condition: true,
					fetch: [
						brandung.vars.folderPath + 'js/hotfix.js',
						brandung.vars.folderPath + 'css/hotfix.css'
					],
					unique: new Date().getTime()
				}// <@newComponent@>
			], true);
		};

		// snippets placeholder
		// --- start|bra-pb: js ---
		// --- end|bra-pb: js ---

		/**
		 #####################################
		 #         document ready            #
		 #####################################
		 */
		$(function () {
			// init objects
			brandung.plugin.fetchBeforeRender();
		});
	})(jQuery);
}, function () {
	// <@delete
	console.error('fetching and initialization failed');
	// delete@>
});