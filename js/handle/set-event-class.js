/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
Brandung.handle.setEventClass = function () {
	var _ = {};

	_.handler = function (e, className) {
		Brandung.vars.$html.addClass(className);
	};

	Brandung.vars.$doc.on('on-set-class', _.handler);
}();