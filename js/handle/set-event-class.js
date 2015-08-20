/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
Brandung.Handle.setEventClass = function () {
	var _ = {};

	_.handler = function (e, className) {
		Brandung.Vars.$html.addClass(className);
	};

	Brandung.Vars.$doc.on('on-set-class', _.handler);
}();