import React  from 'react';
import fetch  from 'isomorphic-fetch';

export function stopEvent(e) {
	if (e) {
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
	}
	return e;
}

export function postFetch(url, data = {}) {
	data.method = 'POST';
	data.credentials = 'include';
	data.headers || (data.headers = {});
	data.headers['Accept']       || (data.headers['Accept']       = 'application/json');
	data.headers['Content-Type'] || (data.headers['Content-Type'] = 'application/json');
	return fetch(url, data);
}