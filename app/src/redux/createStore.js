import {createStore, applyMiddleware, combineReducers} from 'redux';
import store from './reducer';
//组合reducer
const reducer = combineReducers({
    store
});

//自定义中间件
function logger({getState}) {
    return(next)=>(action)=>{
        //调用middleware链中下一个middleware的dispatch
        let returnValue = next(action);
        console.log('state after dispatch', getState());
        //一般会是action本身，除非后面的middleware修改了它

        return returnValue;
    }
}

const createStoreWithModifyLogger = applyMiddleware(logger)(createStore);

//创建store
const configureStore = (initialState) => createStoreWithModifyLogger(reducer, initialState);

export default configureStore;