/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
Brandung.util.consolePolyfill = function () {
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
}();