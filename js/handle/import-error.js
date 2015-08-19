/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.handler.importError = function () {
	var _ = {};

	_.handler = function (event, errorObj) {
		// todo define error handling for live
		if (brandung.vars.isDev) {
			console.error(errorObj);
		}
	};

	brandung.GlobalVars.$doc.on('on-loading-error', _.handler);
}();