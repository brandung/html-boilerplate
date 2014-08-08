/**
 * dbug.js v1.0
 *
 * Code for debug functions
 * On build process, code will be inserted into global.js
 *
 * Grunt Task:
 * grunt project:sync --dbug
 *
 * @require {loadModule}
 *
 * @author: Simon Kemmerling
 *
 * Copyright 2014, brandung GmbH & Co. KG
 * http://www.brandung.de
 *
 * MIT License (MIT)
 */


/**
 * insert bra-module-widget
 * https://github.com/brandung/bra-module-widget
 */
$('body').loadModule([
		'%%private%%/js/dbug/bra/bra-module-widget/bra-module-widget.js',
		'%%private%%/js/dbug/bra/bra-module-widget/bra-module-widget.css'
	],
	function () {
		$('body').bra_moduleWidget();

		// hide widget on small displays
		var showWidget = function () {
			if (Brandung.Mobile.mediaDevice === 'smartphone') {
				$('#bra-module-widget').hide();
			} else {
				$('#bra-module-widget').show();
			}
		};

		$(window).load(function () {
			showWidget();
		});

		$(window).resize(function () {
			showWidget();
		});

	}, 'unique');