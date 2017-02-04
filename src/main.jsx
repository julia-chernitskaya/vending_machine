import React 										from 'react';
import ReactDOM 			 					from 'react-dom';
import Machine 				 					from './components/machine';
import {Map, List, fromJS}	 		from 'immutable';
import { createStore,
	bindActionCreators } 					from 'redux';
import * as actions  						from './reducers/actions';
import reducers      						from './reducers/reducers';
import configureStore,
			{mapStateToProps,
				mapActionsToProps} 			from './store/configureStore'
import { Provider, connect }    from 'react-redux';
require('file-loader?name=[name].[ext]!./index.html');
require('file-loader?name=[name].[ext]!./main.css');

const store = configureStore()

const initialGoods = fromJS([
															{ photo: "/img/1.png", name: "Cola Light",  quantity: 10, price: 10.25},
															{ photo: "/img/2.png", name: "Coca Cola",  quantity: 10, price: 10.25},
															{ photo: "/img/3.png", name: "Beer",  quantity: 2, price: 8.25},
															{ photo: "/img/4.png", name: "Pepsi",  quantity: 10, price: 10.25},
															{ photo: "/img/5.png", name: "Juice",  quantity: 1, price: 10.25},
															{ photo: "/img/6.png", name: "A lot of Cola",  quantity: 100, price: 100.25},
															{ photo: "/img/7.png", name: "Sprite Lite",  quantity: 10, price: 12.00},
															{ photo: "/img/8.png", name: "Sprite",  quantity: 10, price: 10.25},
															{ photo: "/img/9.png", name: "Iced Cola",  quantity: 10, price: 10.25}
														]);



const MachineContent = connect(mapStateToProps, mapActionsToProps(actions))(Machine);
ReactDOM.render(
		<Provider store={store}>
			<MachineContent initialGoods = { initialGoods }/>
		</Provider>, document.getElementById('app')
)