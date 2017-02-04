import React  from 'react';

export default class PureComponent extends React.Component {
	bindCallbacks(...names) {
		names.forEach( name => {
			if ("function" == typeof this[name]) {
				this[name] = this[name].bind(this);
			} else if ("object" == typeof this[name] && this[name].length) {
				this.bindCallbacks(this[name]);
			}
		}, this);
	}

}