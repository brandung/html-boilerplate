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
#         Project Namespace         #
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
 * load script
 *
 * If selector exist, call getScriptCall function to load external javascript source
 * {string} - URL to javascript
 * {function} - callback function
 */
Brandung.Plugins.loadScripts = function() {

	// dummy call
	//	$('[SELECTOR]').loadModule([
	//		Brandung.folderPath + '[PATH_TO_JS_SOURCE]'
	//	], 
	//	function () {
	//		// do something after script has been loaded
	//	});
	
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

/**
 * snippets placeholer
 */
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
	Brandung.Functions.init();
});
