import types from './actionType';
import initState from './state';

export default function reducer(state=initState,{type,data}){
    let newState=state;
    switch(type){
        case types.SET_LOGIN_STATE:
            newState=state.setIn(["view","islogin"],data);
    }
        return newState;
}