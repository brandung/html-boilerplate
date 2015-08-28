/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 19.08.2015
 * MIT License (MIT)
 */
Brandung.Function.getUnique = function (getProdUnique) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	}

	Brandung.Vars.isDev = /(^http(s)?:\/\/(dev\.|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})))|(localtunnel\.me)/ig.test(window.location.origin);

	if (Brandung.Vars.isDev && !getProdUnique) {
		return new Date().getTime();
	} else {
		return '<@unique@>';
	}
};