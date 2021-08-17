import {createStore,applyMiddleware} from 'redux'
import auth from '../Reducer/index' 
import thunk from 'redux-thunk';

export const store = createStore(auth,applyMiddleware(thunk));
 
export default store
