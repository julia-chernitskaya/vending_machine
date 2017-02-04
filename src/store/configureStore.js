/**
 * Created by kitsune on 04.02.17.
 */
import { createStore, applyMiddleware,bindActionCreators } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/reducers'

const enhancer = applyMiddleware(
		thunk
)

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, enhancer)
	
	if (module.hot) {
		module.hot.accept('../reducers/reducers', () => {
			store.replaceReducer(require('../reducers/reducers').default)
	})
	}
	
	return store
}

export function mapStateToProps(state) {
	return state.toObject();
}

export function mapActionsToProps(actions) {
	return (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
}