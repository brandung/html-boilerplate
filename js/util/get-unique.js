/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
brandung.util.getUnique = function (getProdUnique) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	}

	brandung.vars.isDev = /^(https|http):\/\/(dev\.|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))/ig.test(window.location.origin);

	if (brandung.vars.isDev && !getProdUnique) {
		return new Date().getTime();
	} else {
		return '<@unique@>';
	}
};