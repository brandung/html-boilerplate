/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.func.getOrientation = function () {
	var windowWidth = window.innerWidth,
		windowHeight = window.innerHeight,
		orientation;

	if(windowWidth <= windowHeight) {
		orientation = 'portrait'
	} else {
		orientation = 'landscape';
	}

	return orientation;
};