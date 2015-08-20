/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
Brandung.handle.resizeHandler = function () {
	var _ = {};

	_.handler = function () {
		var breakpoint, orientation;

		Brandung.vars.currentBreakpoint = Brandung.func.getBreakpoint();
		Brandung.vars.currentOrientation = Brandung.func.getOrientation();

		breakpoint = 'on-breakpoint-' + Brandung.vars.currentBreakpoint;
		orientation = 'on-orientation-' + Brandung.vars.currentOrientation;

		if (!Brandung.vars.$html.hasClass(breakpoint)) {
			Brandung.vars.$html[0]
				.className = Brandung.vars.$html[0].className
				.replace(/\s?on-breakpoint-(xs|s|m|l|xl)/g, '');

			Brandung.vars.$doc.trigger('on-set-class', [breakpoint]);
			Brandung.vars.$doc.trigger('on-changed-breakpoint', [Brandung.vars.currentBreakpoint]);
		}

		if (!Brandung.vars.$html.hasClass(orientation)) {
			Brandung.vars.$html[0]
				.className = Brandung.vars.$html[0].className
				.replace(/\s?on-orientation-(landscape|portrait)/g, '');

			Brandung.vars.$doc.trigger('on-set-class', [orientation]);
		}
	}();

	// TODO: evaluate if smartresize is triggered on orientationchange
	Brandung.vars.$window.smartresize(_.handler);
}();