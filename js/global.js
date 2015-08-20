/**##############################
#		Global Namespace		#
#################################*/
var Brandung = function (out) {
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
}({}, (Brandung || {}), {
	vars: {
		// path to assets folder
		folderPath: '%%public%%/',
		// standard breakpoints
		breakpoints: {
			'xs': 320,
			's': 480,
			'm': 768,
			'l': 992,
			'xl': 1280
		},
		// mobile first
		currentBreakpoint: 'xs',
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
	// Should be used for things which have nothing to do with components, e.g. placeholder polyfills, etc
	plugin: {}
});

// abortion timeout for asset fetching, default 5000ms
basket.timeout = 60000;

// load main plugins
basket.require(
	{
		url: Brandung.vars.folderPath + 'js/libs/vendor/jquery/jquery.min.js',
		unique: 0
	},
	{
		url: Brandung.vars.folderPath + 'js/libs/vendor/modernizr/modernizr.custom.min.js',
		unique: 0
	},
	{
		url: Brandung.vars.folderPath + 'js/libs/vendor/import/jquery.import.min.js',
		unique: 0
	}
).then(function () {
	(function ($) {
		// store commonly used jQuery objects to GlobalVars object
		Brandung.vars = $.extend(Brandung.vars, {
			$html: $('html'),
			$body: $('body'),
			$window: $(window),
			$doc: $(document)
		});

		Brandung.plugin.fetchBeforeRender = function () {
			return $.import([
				{
					condition: true,
					order: 0,
					fetch: [
						// <@bundle#before-render
						Brandung.vars.folderPath + 'js/util/console-polyfill.js',
						Brandung.vars.folderPath + 'js/util/inject-smartresize.js',
						Brandung.vars.folderPath + 'js/func/get-breakpoint.js',
						Brandung.vars.folderPath + 'js/func/get-orientation.js',
						Brandung.vars.folderPath + 'js/handle/set-event-class.js',
						Brandung.vars.folderPath + 'js/handle/resize-handler.js',
						Brandung.vars.folderPath + 'js/util/get-unique.js'
						// bundle@>
					],
					callback: [
						{ method: Brandung.plugin.loadComponents }
					],
					unique: 1
				}
			], false);
		};

		Brandung.plugin.loadComponents = function () {
			$.import([
				// <@delete
				{
					condition: true,
					fetch: [
						Brandung.vars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.js',
						Brandung.vars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.css',
						Brandung.vars.folderPath + 'js/plugin/init-debug-mode.js'
					],
					unique: Brandung.util.getUnique()
				},
				// delete@>
				{
					condition: true,
					fetch: [
						// <@bundle#h5bp-helper
						Brandung.vars.folderPath + 'js/libs/vendor/h5bp/helper.js',
						Brandung.vars.folderPath + 'js/plugin/h5bp-helper.js'
						// bundle@>
					],
					unique: Brandung.util.getUnique()
				},
				{
					// load always and always from server
					condition: true,
					fetch: [
						Brandung.vars.folderPath + 'js/hotfix.js',
						Brandung.vars.folderPath + 'css/hotfix.css'
					],
					unique: new Date().getTime()
				},
				{
					condition: $('.alert'),
					fetch: [
						Brandung.vars.folderPath + 'css/component/alert.css'
					],
					unique: Brandung.util.getUnique()
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
			Brandung.plugin.fetchBeforeRender();
		});
	})(jQuery);
}, function () {
	// <@delete
	console.error('main.js: fetching of scripts and initialization failed');
	// delete@>
});