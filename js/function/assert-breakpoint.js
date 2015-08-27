/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 20.08.2015
 * MIT License (MIT)
 */
Brandung.Function.assertBreakpoint = function (operator, breakpoint) {
	var breakpoints = Object.keys(Brandung.Vars.breakpoints),
		curBreakpointIndex = breakpoints.indexOf(Brandung.Vars.currentBreakpoint),
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