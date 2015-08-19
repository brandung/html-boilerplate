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
	util: {
		/*consolePolyfill: function () {
			if (!(window.console && console.log)) {
				(function () {
					var noop = function () {
						},
						methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
						length = methods.length,
						console = window.console = {};

					while (length) {
						console[methods[length]] = noop;

						length -= 1;
					}
				}());
			}
		}(),*/
		// basket loading error handler
		/*errorHandler: function (error) {
			console.error('An error occurred while fetching main scripts:');
			console.error(error);
		},*/
		// Debounced resize eventhandler
		// http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
		/*injectSmartResize: function ($, sr) {
			// debouncing function from John Hann
			// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
			var debounce = function (func, threshold, execAsap) {
				var timeout;

				return function debounced () {
					var obj = this,
						args = arguments;

					if (timeout) {
						clearTimeout(timeout);
					} else if (execAsap) {
						func.apply(obj, args);
					}

					timeout = setTimeout(function () {
						if (!execAsap) {
							func.apply(obj, args);
						}

						timeout = null;
					}, threshold || 100);
				};
			};

			// smartresize
			$.fn[sr] = function (fn) {
				return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
			};
		},*/
		// unique key generator for import.js
		/*getUnique: function (getProdUnique) {
			if (!window.location.origin) {
				window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
			}

			brandung.GlobalVars.isDev = /^(https|http):\/\/(dev\.|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))/ig.test(window.location.origin);

			if (brandung.GlobalVars.isDev && !getProdUnique) {
				return new Date().getTime();
			} else {
				return '<@unique@>';
			}
		}*/
	},
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
		// add smartresize handler to $ object
		//brandung.util.injectSmartResize($, 'smartresize');

		// load import.js
		/*basket.require(
			{
				url: brandung.vars.folderPath + 'js/libs/vendor/import/jquery.import.min.js',
				unique: brandung.util.getUnique()
			}
		).then(function () {*/
		// store commonly used jQuery objects to GlobalVars object
		brandung.vars = $.extend(brandung.vars, {
			$html: $('html'),
			$body: $('body'),
			$window: $(window),
			$doc: $(document)
		});

		/**##########################################
		#		Immediately needed functions		#
		#############################################*/
		// <@delete
		// initializes debug widget for template development
		/*brandung.plugin.initDebugMode = function () {
			if (brandung.vars.isDev) {
				$('body').bra_moduleWidget();

				// hide widget on small displays
				var showWidget = function () {
					if (brandung.GlobalVars.currentBreakpoint < 768) {
						$('#bra-module-widget').hide();
					} else {
						$('#bra-module-widget').show();
					}
				};

				$(window).load(function () {
					showWidget();
				});

				$(window).resize(function () {
					showWidget();
				});
			}
		};*/
		// delete@>

		// mobile boilerplate mobile helper functions
		/*brandung.plugin.h5bpHelper = function () {
			MBP.scaleFix();
			MBP.hideUrlBar();
		};*/

		// initializes always needed handler functions
		/*brandung.handle.init = function () {
			this.setEventClass();

			this.resizeHandler();
		};*/

		// adds a given class to the html tag
		/*brandung.handle.setEventClass = function () {
			var handler = function (e, className) {
				brandung.vars.$html.addClass(className);
			};

			brandung.vars.$doc.on('on-set-class', handler);
		};*/

		// adds classes to the html tag representing the current breakpoint
		// and orientation
		/*brandung.handle.resizeHandler = function () {
			var handler = function () {
				var breakpoint, orientation;

				brandung.vars.currentBreakpoint = brandung.func.getBreakpoint();
				brandung.vars.currentOrientation = brandung.func.getOrientation();

				breakpoint = 'on-breakpoint-' + brandung.vars.breakpointClasses[brandung.vars.currentBreakpoint];
				orientation = 'on-orientation-' + brandung.vars.currentOrientation;

				if (!brandung.vars.$html.hasClass(breakpoint)) {
					brandung.vars.$html[0]
						.className = brandung.vars.$html[0].className
						.replace(/\s?on-breakpoint-(xs|s|m|l|xl)/g, '');

					brandung.vars.$doc.trigger('on-set-class', [breakpoint]);
					brandung.vars.$doc.trigger('on-changed-breakpoint', [brandung.vars.currentBreakpoint]);
				}

				if (!brandung.vars.$html.hasClass(orientation)) {
					brandung.vars.$html[0]
						.className = brandung.vars.$html[0].className
						.replace(/\s?on-orientation-(landscape|portrait)/g, '');

					brandung.vars.$doc.trigger('on-set-class', [orientation]);
				}
			};

			// TODO: evaluate if smartresize is triggered on orientationchange
			brandung.vars.$window.smartresize(handler);
			handler();
		};*/

		// loading error handler
		/*brandung.Handler.importError = function () {
			var handler = function (event, errorObj) {
				// todo define error handling for live
				if (brandung.GlobalVars.isDev) {
					console.error(errorObj);
				}
			};

			brandung.GlobalVars.$doc.on('on-loading-error', handler);
		};*/

		/*brandung.func.getBreakpoint = function () {
			var windowWidth = window.innerWidth,
				breakpoints = Object.keys(brandung.vars.breakpoints);
				breakpoint;

			for (var i = breakpoints.length - 1; i >= 0; i -= 1) {
				breakpoint = breakpoints[i];

				if (windowWidth >= breakpoint) {
					return breakpoints[i];
				} else if (i === 0 && windowWidth < breakpoints[i]) {
					return breakpoints[i];
				}
			}
		};*/

		/*brandung.func.getOrientation = function () {
			var windowWidth = window.innerWidth,
				windowHeight = window.innerHeight,
				orientation;

			if(windowWidth <= windowHeight) {
				orientation = 'portrait'
			} else {
				orientation = 'landscape';
			}

			return orientation;
		};*/

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
					condition: brandung.func.getBreakpoint() < 768,
					fetch: [
						brandung.vars.folderPath + 'js/libs/vendor/h5bp/helper.js',
						brandung.vars.folderPath + 'js/plugin/h5bp-helper.js'
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
			brandung.plugin.fetchBeforeRender()
				.then(brandung.plugin.loadComponents);
		});
		//}, brandung.util.errorHandler);
	})(jQuery);
}, brandung.Util.errorHandler);