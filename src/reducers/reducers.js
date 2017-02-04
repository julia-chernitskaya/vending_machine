/**
 * Created by kitsune on 04.02.17.
 */
import { handleAction }      from 'redux-actions';
import {List, Map}	 				 from 'immutable';

const clear = (state, action) => {
	return state.set('goods', state.get('goods').map( good => {
																															return good.set('toBuy', 0);
																														}))
							.set('total', 0);
}

const buy = (state, action) => {
	return state.set('goods', state.get('goods').map( good => {
				return good.set('quantity', good.get('quantity') - (good.get('toBuy') || 0 )).set('toBuy', 0);
	}))
	.set('total', 0);
}

const changeCurrentPack = (state, action) => {
	const id = action.payload.id;
	const amount = action.payload.amount;
	const good = state.get('goods').get(id);
	const newBuy = Math.min((good.get('toBuy') ? good.get('toBuy') : 0 )+ Math.sign(amount), good.get('quantity'));
	
	return state.set('goods', state.get('goods').set(id, good.set('toBuy', newBuy)))
							.set('total', state.get('total') + ((good.get('toBuy')+ Math.sign(amount) > good.get('quantity')) ? 0 : amount));
}

const init = (state, action) => {
	return state.set('goods', action.payload).set('total', 0);
}

export default function rootReducer(state, action) {
	return List([
		handleAction('CLEAR_ALL', clear, Map() ),
		handleAction('BUY_ALL',   buy, Map() ),
		handleAction('CHANGE_PACK', changeCurrentPack, Map() ),
		handleAction('INIT', init, Map() ),
	]).reduce((s,r) => r(s, action) || s, state) ;
}
