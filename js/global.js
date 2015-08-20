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
	Vars: {
		// path to assets folder
		folderPath: '%%public%%/',
		// standard breakpoints
		breakpoints: {
			'xs': 320,
			'sm': 480,
			'md': 768,
			'lg': 992,
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
	Util: {},
	// CSS components script namespace
	Component: {},
	// functions must return something
	Function: {},
	// everything that has to do with event handling
	Handle: {},
	// Should be used for things which have nothing to do with components, e.g. placeholder polyfills, etc
	Plugin: {}
});

// abortion timeout for asset fetching, default 5000ms
basket.timeout = 60000;

// load main plugins
basket.require(
	{
		url: Brandung.Vars.folderPath + 'js/libs/vendor/jquery/jquery.min.js',
		unique: 0
	},
	{
		url: Brandung.Vars.folderPath + 'js/libs/vendor/modernizr/modernizr.custom.min.js',
		unique: 0
	},
	{
		url: Brandung.Vars.folderPath + 'js/libs/vendor/import/jquery.import.min.js',
		unique: 0
	}
).then(function () {
	(function ($) {
		// store commonly used jQuery objects to GlobalVars object
		Brandung.Vars = $.extend(Brandung.Vars, {
			$html: $('html'),
			$body: $('body'),
			$window: $(window),
			$doc: $(document)
		});

		Brandung.Plugin.fetchBeforeRender = function () {
			return $.import([
				{
					condition: true,
					order: 0,
					fetch: [
						// <@bundle#before-render
						Brandung.Vars.folderPath + 'js/util/console-polyfill.js',
						Brandung.Vars.folderPath + 'js/util/inject-smartresize.js',
						Brandung.Vars.folderPath + 'js/function/assert-breakpoint.js',
						Brandung.Vars.folderPath + 'js/function/get-breakpoint.js',
						Brandung.Vars.folderPath + 'js/function/get-orientation.js',
						Brandung.Vars.folderPath + 'js/handle/set-event-class.js',
						Brandung.Vars.folderPath + 'js/handle/resize-handler.js',
						Brandung.Vars.folderPath + 'js/util/get-unique.js'
						// bundle@>
					],
					callback: [
						{ method: Brandung.Plugin.loadComponents }
					],
					unique: 1
				}
			], false);
		};

		Brandung.Plugin.loadComponents = function () {
			$.import([
				// <@delete
				{
					condition: true,
					fetch: [
						Brandung.Vars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.js',
						Brandung.Vars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.css',
						Brandung.Vars.folderPath + 'js/plugin/init-debug-mode.js'
					],
					unique: Brandung.Util.getUnique()
				},
				// delete@>
				{
					condition: Brandung.Function.assertBreakpoint('lt', 'md'),
					fetch: [
						// <@bundle#h5bp-helper
						Brandung.Vars.folderPath + 'js/libs/vendor/h5bp/helper.js',
						Brandung.Vars.folderPath + 'js/plugin/h5bp-helper.js'
						// bundle@>
					],
					unique: Brandung.Util.getUnique()
				},
				{
					// load always and always from server
					condition: true,
					fetch: [
						Brandung.Vars.folderPath + 'js/hotfix.js',
						Brandung.Vars.folderPath + 'css/hotfix.css'
					],
					unique: new Date().getTime()
				},
				{
					condition: $('.alert'),
					fetch: [
						Brandung.Vars.folderPath + 'css/component/alert.css'
					],
					unique: Brandung.Util.getUnique()
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
			Brandung.Plugin.fetchBeforeRender();
		});
	})(jQuery);
}, function () {
	// <@delete
	console.error('main.js: fetching of scripts and initialization failed');
	// delete@>
});