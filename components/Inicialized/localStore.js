import {createStore, combineReducers} from 'redux'

const auxiusuario = {"id":1057577213,"correo":"andres.feego@gmail.com ","nombre":"Oscar Andres ","apellido":"Manrique","pass":"123456"}

function usuarioReducer(state=[],action){
    switch (action.type) {
        case 'SET_USUARIO':  
            return action.usuario;
        
        case 'CLEAR_USUARIO': 
            return [];
    

        default:
            return state;
    }
}


let rootReducer = combineReducers({
    usuario: usuarioReducer
});

export default createStore(rootReducer);