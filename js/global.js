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
	GlobalVars: {
		// set path to js folder
		folderPath: '%%public%%/',
		breakpoints: [320, 480, 768, 992, 1280],
		breakpointClasses: {
			320: 'xs',
			480: 's',
			768: 'm',
			992: 'l',
			1280: 'xl'
		},
		currentBreakpoint: 320,
		currentOrientation: 'portrait',
		isIE: window.navigator.userAgent.indexOf("MSIE ") > -1 || // IE <= 10
		!(window.ActiveXObject) && "ActiveXObject" in window || // IE 11
		/x64|x32/ig.test(window.navigator.userAgent) // IE 12
	},
	Util: {
		consolePolyfill: function () {
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
		}(),
		// basket error handler
		errorHandler: function (error) {
			console.error('An error occurred while fetching main scripts:');
			console.error(error);
		},
		/**
		 * Debounced resize eventhandler
		 *
		 * http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
		 */
		injectSmartResize: function ($, sr) {
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
		},
		getUnique: function (getProdUnique) {
			if (!window.location.origin) {
				window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
			}

			Brandung.GlobalVars.isDev = /^(https|http):\/\/(dev\.|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))/ig.test(window.location.origin);

			if (Brandung.GlobalVars.isDev && !getProdUnique) {
				return new Date().getTime();
			} else {
				return '<@unique@>';
			}
		}
	},
	Component: {},
	Plugin: {},
	Function: {},
	Handler: {},
	Page: {}
});

basket.timeout = 60000;

Brandung.Util.loadMainPlugins = basket.require(
	{
		url: Brandung.GlobalVars.folderPath + '/libs/vendor/jquery/jquery.min.js',
		unique: Brandung.Util.getUnique()
	},
	{
		url: Brandung.GlobalVars.folderPath + 'libs/vendor/modernizr/modernizr.custom.min.js',
		unique: Brandung.Util.getUnique()
	}
);

Brandung.Util.loadMainPlugins.then(function () {
	(function ($) {
		Brandung.Util.injectSmartResize($, 'smartresize');

		Brandung.Util.loadImportPlugin = basket.require(
			{
				url: Brandung.GlobalVars.folderPath + 'js/libs/vendor/import/jquery.import.min.js',
				unique: Brandung.Util.getUnique()
			}
		).then(function () {
				Brandung.GlobalVars = $.extend(Brandung.GlobalVars, {
					$html: $('html'),
					$body: $('body'),
					$window: $(window),
					$doc: $(document)
				});

				Brandung.Handler.init = function () {
					this.setEventClass();

					this.resizeHandler();
				};

				Brandung.Handler.setEventClass = function () {
					var handler = function (e, className) {
						Brandung.GlobalVars.$html.addClass(className);
					};

					Brandung.GlobalVars.$doc.on('on-set-class', handler);
				};

				Brandung.Handler.resizeHandler = function () {
					var handler = function () {
						var breakpoint, orientation;

						Brandung.GlobalVars.currentBreakpoint = Brandung.Function.getBreakpoint();
						Brandung.GlobalVars.currentOrientation = Brandung.Function.getOrientation();

						breakpoint = 'on-breakpoint-' + Brandung.GlobalVars.breakpointClasses[Brandung.GlobalVars.currentBreakpoint];
						orientation = 'on-orientation-' + Brandung.GlobalVars.currentOrientation;

						if (!Brandung.GlobalVars.$html.hasClass(breakpoint)) {
							Brandung.GlobalVars.$html[0]
								.className = Brandung.GlobalVars.$html[0].className
								.replace(/\s?on-breakpoint-(xs|s|m|l|xl)/g, '');

							Brandung.GlobalVars.$doc.trigger('on-set-class', [breakpoint]);
							Brandung.GlobalVars.$doc.trigger('on-changed-breakpoint', [Brandung.GlobalVars.currentBreakpoint]);
						}

						if (!Brandung.GlobalVars.$html.hasClass(orientation)) {
							Brandung.GlobalVars.$html[0]
								.className = Brandung.GlobalVars.$html[0].className
								.replace(/\s?on-orientation-(landscape|portrait)/g, '');

							Brandung.GlobalVars.$doc.trigger('on-set-class', [orientation]);
						}
					};

					// TODO: evaluate if smartresize is triggered on orientationchange
					Brandung.GlobalVars.$window.smartresize(handler);
					handler();
				};

				Brandung.Handler.importError = function () {
					var handler = function (event, errorObj) {
						// todo define error handling for live
						if (Brandung.GlobalVars.isDev) {
							console.error(errorObj);
						}
					};

					Brandung.GlobalVars.$doc.on('on-loading-error', handler);
				};

				Brandung.Function.getBreakpoint = function () {
					var windowWidth = window.innerWidth,
						breakpoint;

					for (var i = Brandung.GlobalVars.breakpoints.length - 1; i >= 0; i -= 1) {
						breakpoint = Brandung.GlobalVars.breakpoints[i];

						if (windowWidth >= breakpoint) {
							return Brandung.GlobalVars.breakpoints[i];
						} else if (i === 0 && windowWidth < Brandung.GlobalVars.breakpoints[i]) {
							return Brandung.GlobalVars.breakpoints[i];
						}
					}
				};

				Brandung.Function.getOrientation = function () {
					var windowWidth = window.innerWidth,
						windowHeight = window.innerHeight,
						orientation;

					if(windowWidth <= windowHeight) {
						orientation = 'portrait'
					} else {
						orientation = 'landscape';
					}

					return orientation;
				};

				Brandung.Page.init = function () {
					Brandung.GlobalVars.mainModules = $.import([
						// <@delete
						{
							condition: true,
							fetch: [
								Brandung.GlobalVars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.js',
								Brandung.GlobalVars.folderPath + 'js/libs/bra/dbug/bra/bra-module-widget/bra-module-widget.css'
							],
							callback: [
								{ method: Brandung.Helpers.initDebugMode }
							],
							unique: Brandung.Util.getUnique()
						},
						// delete@>
						{
							// load always
							condition: true,
							fetch: [
								Brandung.GlobalVars.folderPath + 'js/hotfix.js',
								Brandung.GlobalVars.folderPath + 'css/hotfix.css'
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
				 #                                   #
				 #         document ready            #
				 #                                   #
				 #####################################
				 */
				$(function () {
					// init objects
					Brandung.Page.init();
					Brandung.Handler.init();
				});
			}, Brandung.Util.errorHandler);
	})(jQuery);
}, Brandung.Util.errorHandler);