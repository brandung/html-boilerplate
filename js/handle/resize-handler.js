/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.handle.resizeHandler = function () {
	var handler = function () {
		var breakpoint, orientation;

		brandung.vars.currentBreakpoint = brandung.func.getBreakpoint();
		brandung.vars.currentOrientation = brandung.func.getOrientation();

		breakpoint = 'on-breakpoint-' + brandung.vars.breakpointClasses[brandung.vars.currentBreakpoint];
		orientation = 'on-orientation-' + brandung.vars.currentOrientation;

		if (!brandung.vars.$html.hasClass(breakpoint)) {
			brandung.vars.$html[0]
				.className = brandung.vars.$html[0].className
				.replace(/\s?on-breakpoint-(xs|s|m|l|xl)/g, '');

			brandung.vars.$doc.trigger('on-set-class', [breakpoint]);
			brandung.vars.$doc.trigger('on-changed-breakpoint', [brandung.vars.currentBreakpoint]);
		}

		if (!brandung.vars.$html.hasClass(orientation)) {
			brandung.vars.$html[0]
				.className = brandung.vars.$html[0].className
				.replace(/\s?on-orientation-(landscape|portrait)/g, '');

			brandung.vars.$doc.trigger('on-set-class', [orientation]);
		}
	};

	// TODO: evaluate if smartresize is triggered on orientationchange
	brandung.vars.$window.smartresize(handler);
	handler();
}();