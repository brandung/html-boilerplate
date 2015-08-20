/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 20.08.2015
 * MIT License (MIT)
 */
Brandung.Function.assertBreakpoint = function (breakpointIn, operator, breakpoint) {
	var breakpoints = Object.keys(Brandung.Vars.breakpoints),
		curBreakpointIndex = breakpoints.indexOf(breakpointIn), // Brandung.Vars.currentBreakpoint
		conditionalBreakpointIndex = breakpoints.indexOf(breakpoint);

	switch (operator) {
		case 'eq':
			return curBreakpointIndex === conditionalBreakpointIndex;
			break;
		case 'lt':
			return curBreakpointIndex < conditionalBreakpointIndex;
			break;
		case 'ht':
			return curBreakpointIndex > conditionalBreakpointIndex;
			break;
		default:
			return false;
			break;
	}
};

// Brandung.Vars.currentBreakpoint < 768
Brandung.Function.assertBreakpoint('sm', 'lt', 'md');
Brandung.Function.assertBreakpoint('md', 'eq', 'md');
Brandung.Function.assertBreakpoint('md', 'ht', 'xs');