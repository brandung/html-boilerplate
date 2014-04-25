// JavaScript Document

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
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
var Brandung = Brandung || {};

/**
 * set folder path
 * @type {string}
 */
Brandung.folderPath = '%%public%%/js';

/**
 * IE <= 8 detection 
 * feature detection for IE <= IE8
 */
Brandung.IE8 = (document.all && !document.addEventListener) ? true : false;

/**
#####################################
#                                   #
#    Load project dependencies and  #
#    proceed                        #
#                                   #
#####################################
*/
basket.require(
    { 
    	url : Brandung.folderPath + '/libs/vendor/jquery/jquery.min.js',
    	unique : '1.11.0'
    },
    { 
    	url : Brandung.folderPath + '/libs/vendor/modernizr/modernizr.custom.min.js',
    	unique : '2.7.1'
    }
).then(function () {
    basket.require(
	    { 
	    	url : Brandung.folderPath + '/libs/bra/loadmodule/jquery.loadmodule.min.js',
	    	unique : '1.0.0'
	    }
	).then(function () {
		/**
		 #####################################
		 #                                   #
		 #    mobile stuff functions         #
		 #                                   #
		 #####################################
		 */
		Brandung.Mobile = {

			init : function() {
			}
		};

		/**
		 * check orientation
		 * 
		 * add orientation class to body tag
		 */
		Brandung.Mobile.checkOrientation = function() {

			if (window.orientation != 0) {
				$('body').removeClass('portrait').addClass('landscape');
			} else {
				$('body').removeClass('landscape').addClass('portrait');
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

		Brandung.Mobile.getWindowWidth = function() {
			if (Brandung.IE8) {  // feature detection for IE <= IE8
				Brandung.Mobile.mediaDevice = 'desktop';
			} else {
				Brandung.Mobile.mediaDevice = window.getComputedStyle(document.body, ':after').getPropertyValue('content');	
			}
		};

		// add event listener
		$(window).load(function(){
			Brandung.Mobile.getWindowWidth();
			Brandung.Mobile.checkOrientation();
		});

		$(window).resize(function(){
			// call function only on desktop devices
			if((!Modernizr.touch && window.orientation != 0) || (Modernizr.touch && window.orientation != 0)) {
				Brandung.Mobile.getWindowWidth();	
			}
		});

		$(window).bind('orientationchange', function() {
			Brandung.Mobile.checkOrientation();
		});

		/**
		#####################################
		#                                   #
		#      jQuery plugins object        #
		#                                   #
		#####################################
		*/
		Brandung.Plugins = {
			
			init: function() {
				// load plugin scripts
				Brandung.Plugins.loadScripts();
			}
			
		};

		/**
		 * load scripts
		 */
		Brandung.Plugins.loadScripts = function() {

			/** Loading plugin
			 *
			 * @param {array} - List of dependency paths (js and or css)
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
			$('body').loadModule([
				Brandung.folderPath + '/hotfix.js',
				'%%public%%/css/hotfix.css'
			], function () {}, new Date().getTime());
			
		};

		/**
		 #####################################
		 #                                   #
		 #        helper functions           #
		 #                                   #
		 #####################################
		 */
		Brandung.Helpers = {

			init: function() {
			}

		};

		/**
		#####################################
		#                                   #
		#        global functions           #
		#                                   #
		#####################################
		*/
		Brandung.Functions = {
			
			init: function() {
			}
			
		};

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
		$(function(){
			// init objects
			Brandung.Mobile.init();
			Brandung.Plugins.init();
			Brandung.Helpers.init();
			Brandung.Functions.init();
		});
	}, function(err) { console.error(err); });
}, function(err) { console.error(err); });