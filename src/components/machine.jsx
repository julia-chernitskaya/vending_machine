import React, { PropTypes }  from 'react';
import {Map, List, fromJS}	 from 'immutable';
import Good 								 from './good';
import PureComponent				 from '../libs/pure-component';
import { postFetch }				 from '../libs/func';

import './index.scss';

export default class Machine extends PureComponent {
	
	static propTypes = {
		initialGoods: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.array])
	}
	
	constructor(props) {
		super(props);
		
		this.props.actions.init(this.props.initialGoods);
		this.bindCallbacks("changeSum", "buy", "clear");
	}
	
	changeSum(amount, id) {
		this.props.actions.changeCurrentPack({ amount: amount,
																					 id: id});
	}
	
	buy() {
		const data = this.props.goods.map( o => {
			return o.get("toBuy") || 0;
		});
		postFetch("", {
			body: JSON.stringify(data)
		}).then(response => response.json())
				.then(data => {})
			.catch(e=> {
				//let's suppose that everything went right
				this.props.actions.buy();
			});
	}
	
	clear() {
		this.props.actions.clear();
	}
	
	render() {
		const { goods } = this.props;
		return (
				<div className="machine bordered">
					<div className="machine-header"/>
					<div className="machine-content">
						{
							goods && goods.count() && (() => {
								const goodsMap = goods.map((o, oi) => {
									return(
											<Good name = { o.get("name")}
														photo = { o.get("photo") }
														price = { o.get("price") }
														quantity = {o.get("quantity")}
														key = { oi }
														toBuy = { o.get("toBuy") ?  o.get("toBuy") : 0 }
														onChange = { (sum) => { this.changeSum(sum, oi) }}
											/>
									);
								});
								return goodsMap.toArray();
							})()}
					</div>
					<div className="machine-buttons bordered">
						<span className="machine-button-total">$ { this.props.total ? this.props.total : 0 }</span>
						<div className="machine-button bordered noselect" onClick = { this.buy }>BUY</div>
						<div className="machine-button bordered noselect" onClick = { this.clear }>CLEAR</div>
					</div>
				</div>
		);
	}
}