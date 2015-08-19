/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.plugin.initDebugMode = function () {
	if (brandung.vars.isDev) {
		$('body').bra_moduleWidget();

		// hide widget on small displays
		var showWidget = function () {
			if (brandung.vars.currentBreakpoint < 768) {
				$('#bra-module-widget').hide();
			} else {
				$('#bra-module-widget').show();
			}
		};

		brandung.vars.$window.load(function () {
			showWidget();
		}).resize(function () {
			showWidget();
		});
	}
}();