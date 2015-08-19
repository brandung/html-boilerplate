/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.func.getBreakpoint = function () {
	var windowWidth = window.innerWidth,
		breakpoints = Object.keys(brandung.vars.breakpoints),
		breakpoint;

	for (var i = breakpoints.length - 1; i >= 0; i -= 1) {
		breakpoint = breakpoints[i];

		if (windowWidth >= breakpoint) {
			return breakpoints[i];
		} else if (i === 0 && windowWidth < breakpoints[i]) {
			return breakpoints[i];
		}
	}
};