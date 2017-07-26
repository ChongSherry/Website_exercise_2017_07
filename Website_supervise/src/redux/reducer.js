import types from './actionType';
import initState from './state';

export default function reducer(state=initState,{type,data}){
    let newState=state;
    switch(type){
        case types.SET_LOGIN_STATE:
            newState=state.setIn(["view","islogin"],data)
        break;
        case types.LOADING:
            newState=state.setIn(["load","loading"],data)
        break;
        case types.COLLAPSED_VIEW_SIDER:
            newState=state.setIn(["view","collapsed"],data)
        break;
    }
    return newState;
}