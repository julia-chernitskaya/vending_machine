import React, { PropTypes }  from 'react';
import {Map, List, fromJS}	 from 'immutable';
import PureComponent 				 from '../libs/pure-component';
import { stopEvent }				 from '../libs/func';
import classNames            from 'classnames';

import './index.scss';

export default class Good extends PureComponent {
	
	static propTypes = {
		price: 		PropTypes.number,
		photo: 		PropTypes.string,
		name:			PropTypes.string,
		quantity: PropTypes.number,
		toBuy: 		PropTypes.number,
		onChange: PropTypes.func
	}
	
	constructor(props) {
		super(props);
		
		this.bindCallbacks("addMe", "removeMe");
	}
	
	addMe(e) {
		stopEvent(e);
		this.props.onChange && ("function" == typeof this.props.onChange) && this.props.onChange(this.props.price);
	}
	
	removeMe(e) {
		stopEvent(e);
		this.props.onChange && ("function" == typeof this.props.onChange) && this.props.onChange(-this.props.price);
	}
	
	render() {
		const { price, photo, name , toBuy, quantity} = this.props;
		return (
			<div className={ classNames("machine-good machine-good bordered",
																	{"machine-good-selected" : !!toBuy,
																		"machine-good-unavailable" : ( quantity <= 0 ),
																	})} onClick = { this.addMe }>
				<div className="machine-good-content noselect">
					{photo && <img className="machine-good-img noselect" src={ photo }/>}
				</div>
				<span className="machine-good-price noselect">${ price }</span>
				<span className="machine-good-name noselect">{ name }</span>
				{ !!toBuy && <span className="machine-good-to-buy noselect" onClick = { this.removeMe }>{ toBuy }</span> }
			</div>
		);
	}
}