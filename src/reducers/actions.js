/**
 * Created by kitsune on 04.02.17.
 */

import { createAction } from 'redux-actions';

export const clear		           = createAction('CLEAR_ALL');
export const buy	            	 = createAction('BUY_ALL');
export const changeCurrentPack 	 = createAction('CHANGE_PACK');
export const init							 	 = createAction('INIT');