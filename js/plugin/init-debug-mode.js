/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
Brandung.plugin.initDebugMode = function () {
	if (Brandung.vars.isDev) {
		$('body').bra_moduleWidget();

		// hide widget on small displays
		var showWidget = function () {
			if (Brandung.vars.currentBreakpoint < 768) {
				$('#bra-module-widget').hide();
			} else {
				$('#bra-module-widget').show();
			}
		};

		Brandung.vars.$window.load(function () {
			showWidget();
		}).resize(function () {
			showWidget();
		});
	}
}();