// JavaScript Document

// Avoid `console` errors in browsers that lack a console.
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

/**
 #####################################
 #                                   #
 #    Project Namespace              #
 #                                   #
 #####################################
 */

/**
 * Creates namespace object and extends it with base properties if it has already been initialized (e.g. in magento)
 *
 * @param {object} obj - Default properties that have not been initialized in this file
 * @param {object} base - Default properties
 */
var Brandung = (function (obj, base) {
		obj = obj || {};

		for (var prop in base) {
			if (base.hasOwnProperty(prop)) {
				obj[prop] = base[prop];
			}
		}

		return obj;
	}(Brandung, {
		// set path to js folder
		folderPath: '%%public%%/js/',
		// do we have an ie8?
		IE8: (document.all && !document.addEventListener) ? true : false,
		// basket error handler
		errorHandler: function (error) {
			console.error('An error occurred while fetching main scripts:');
			console.error(error);
		},
		// global jquery objects like body, window
		GlobalVars: {}
	}));

/**
 * set folder path
 * @type {string}
 */
if (Brandung.dynamicFolderPath) {
	Brandung.folderPath = Brandung.dynamicFolderPath;
}

/**
 #####################################
 #                                   #
 #    Load project dependencies and  #
 #    proceed                        #
 #                                   #
 #####################################
 */
// Check If we have an IE8, if so just create a new Deferred to be able to call $.then()
// for all modern browsers load the main plugins via basket
Brandung.DeferMainPlugins = Brandung.IE8 ? jQuery.Deferred() : basket.require(
	{
		url   : Brandung.folderPath + '/libs/vendor/jquery/jquery.min.js',
		unique: '1.11.0'
	},
	{
		url   : Brandung.folderPath + 'libs/vendor/modernizr/modernizr.custom.min.js',
		unique: '2.8.1'
	}
);

// Just resolve the main deferred if we have an ie8, because jquery and modernizr are already loaded
if (Brandung.IE8) {
	Brandung.DeferMainPlugins.resolve();
}

Brandung.DeferMainPlugins.then(function () {
	(function ($) {

		/**
		 * Debounced resize eventhandler
		 *
		 * http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
		 */
		(function ($, sr) {

			// debouncing function from John Hann
			// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
			var debounce = function (func, threshold, execAsap) {
				var timeout;

				return function debounced() {
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
		})(jQuery, 'smartresize');

		// The same as above except that we are creating a real deferred by using the $.when method in IE8
		// for all modern browsers load the load plugin via basket
		Brandung.DeferLoadPlugin = Brandung.IE8 ? $.when($.getScript(Brandung.folderPath + 'libs/bra/loadmodule/jquery.loadmodule.min.js')) : basket.require(
			{
				url   : Brandung.folderPath + 'libs/bra/loadmodule/jquery.loadmodule.min.js',
				unique: '1.0.0'
			}
		);

		Brandung.DeferLoadPlugin.then(function () {
			/**
			 * Define globally used jquery objects
			 * @type {void|*}
			 */
			Brandung.GlobalVars = $.extend(Brandung.GlobalVars, {
				$body: $('body'),
				$window: $(window)
			});

			/**
			 #####################################
			 #                                   #
			 #    mobile stuff functions         #
			 #                                   #
			 #####################################
			 */
			Brandung.Mobile = $.extend((Brandung.Mobile ? Brandung.Mobile : {}), {

				init: function () {
					// Place here all functions that need to be invoked on every page load
				}

			});


			/**
			 * check orientation
			 *
			 * add orientation class to body tag
			 */
			Brandung.Mobile.checkOrientation = function () {

				if (window.orientation !== 0) {
					Brandung.GlobalVars.$body.removeClass('portrait').addClass('landscape');
				} else {
					Brandung.GlobalVars.$body.removeClass('landscape').addClass('portrait');
				}

			};

			/**
			 * get media device selector
			 */
			if (Brandung.IE8) {
				Brandung.Mobile.mediaDevice = 'desktop';
			} else {
				Brandung.Mobile.mediaDevice = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
			}

			Brandung.Mobile.getWindowWidth = function () {

				if (Brandung.IE8) {  // feature detection for IE <= IE8
					Brandung.Mobile.mediaDevice = 'desktop';
				} else {
					Brandung.Mobile.mediaDevice = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
				}

			};

			// add event listener
			Brandung.GlobalVars.$window.on('load', function () {
				Brandung.Mobile.getWindowWidth();
				Brandung.Mobile.checkOrientation();
			}).smartresize(function () {
				// call function only on desktop devices
				if ((!Modernizr.touch && window.orientation !== 0) || (Modernizr.touch && window.orientation !== 0)) {
					Brandung.Mobile.getWindowWidth();
				}
			}).on('orientationchange', function () {
				Brandung.Mobile.checkOrientation();
			});

			/**
			 #####################################
			 #                                   #
			 #      jQuery plugins object        #
			 #                                   #
			 #####################################
			 */
			Brandung.Plugins = $.extend((Brandung.Plugins ? Brandung.Plugins : {}), {

				init: function () {
					// load plugin scripts
					Brandung.Plugins.loadScripts();
				}

			});

			/**
			 * load scripts
			 */
			Brandung.Plugins.loadScripts = function () {

				/** Loading plugin
				 *
				 * @param {array} - List of dependency paths (js and css)
				 * @param {function} - callback function, when all dependencies are available
				 * @param {string|int} - if this parameter changes, the dependencies will be refetched
				 * from the server
				 */

					// dummy call
					//	$('[SELECTOR]').loadModule([
					//		Brandung.folderPath + '[PATH_TO_JS_SOURCE]'
					//	],
					//	function () {
					//		// do something after script has been loaded
					//	}, 'unique');

					// load hotfix files
				Brandung.GlobalVars.$body.loadModule([
						Brandung.folderPath + 'hotfix.js',
						'%%public%%/css/hotfix.css'
					], function () {}, new Date().getTime());

				// loader helper.js on mobile devices
				if (Brandung.Mobile.mediaDevice === 'smartphone') {
					Brandung.GlobalVars.$body.loadModule([
							Brandung.folderPath + 'libs/vendor/h5bp/helper.js'
						], function () {
							// init MBP helper functions
							MBP.scaleFix();
							MBP.hideUrlBar();
						}, 'unique');
				}

			};

			/**
			 #####################################
			 #                                   #
			 #        helper functions           #
			 #                                   #
			 #####################################
			 */
			Brandung.Helpers = $.extend((Brandung.Helpers ? Brandung.Helpers : {}), {

				init: function () {
					// Place here all functions that need to be invoked on every page load
				}

			});

			/**
			 #####################################
			 #                                   #
			 #        global functions           #
			 #                                   #
			 #####################################
			 */
			Brandung.Functions =  $.extend((Brandung.Functions ? Brandung.Functions : {}), {

				init: function () {
					// Place here all functions that need to be invoked on every page load
				}

			});

			// snippets placeholer
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
				Brandung.Mobile.init();
				Brandung.Plugins.init();
				Brandung.Helpers.init();
				Brandung.Functions.init();
			});
		}, Brandung.errorHandler);
	})(jQuery);
}, Brandung.errorHandler);
