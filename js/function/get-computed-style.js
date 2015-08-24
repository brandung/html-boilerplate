/**
 * brandung
 *
 * Copyright brandung GmbH & Co.KG
 * http://www.brandung.de/
 *
 * Date: 24.08.2015
 * MIT License (MIT)
 *
 * @param {String} element - Element selector, e.g. 'body', '.foobar > p'
 * @param {String} pseudo - Pseudoelement, e.g. ':before', ':after'
 * @param {String} property - CSS property, e.g. 'content', 'font-size'
 * @returns {*}
 */
Brandung.Function.getComputedStyle = function (element, pseudo, property) {
	pseudo = pseudo || null;

	return window.getComputedStyle(document.querySelector(element), pseudo).getPropertyValue(property).replace(/\"|'/g, '');
};