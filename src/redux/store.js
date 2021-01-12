//store es para poder leer el Duck , no se modifica nada del store,,, solo del Duck
//en store se combinan todos los reducers 

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' //para hacer promesas con Redux
//SIEMPRE se llama al reducer del Duck
import pokeReducer from './pokeDucks'

const rootReducer = combineReducers({ //toma un objeto de los cuales se van a consumir los datos de State en los componentes, cada prop es un REDUCER
    pokemons: pokeReducer 
})//lo unico q se  va a modificar es el rootReducer  ya qe es el que tiene toda la data / states

//Para configurar la extension de Google Chrome REDUX DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk )))

    return store;
}