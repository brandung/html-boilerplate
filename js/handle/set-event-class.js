/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.handle.setEventClass = function () {
	var _ = {};

	_.handler = function (e, className) {
		brandung.vars.$html.addClass(className);
	};

	brandung.vars.$doc.on('on-set-class', _.handler);
}();