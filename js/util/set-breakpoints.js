/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 24.08.2015
 * MIT License (MIT)
 */
Brandung.Util.setBreakpoints = function () {
	Brandung.Vars.breakpoints = JSON.parse(Brandung.Function.getComputedStyle('body', ':before', 'content'));
}();