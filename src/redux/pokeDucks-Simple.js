import axios from 'axios'

//constants
const initialState = {
    array : [], 
    offset : 0
}

const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
const GET_NEXTPOKEMONS_SUCCESS = 'GET_NEXTPOKEMONS_SUCCESS';


//reducer (SIEMPRE devuelve un state )
export default function pokeReducer( state = initialState , action ){
    switch(action.type){
        case GET_POKEMONS_SUCCESS :
            return {...state, array: action.payload }

        case GET_NEXTPOKEMONS_SUCCESS :
            return{...state, array: action.payload.array, offset: action.payload.offset}

        default: 
            return state
    }
}

//actions -- dispatch activa el reducer, y getState trae la data del state
export const getPokemonsAction = () => async ( dispatch, getState ) => {

    //El metodo getState trae todo el store por lo q se debe espec. que prop queremos,,,, 
    const offset = getState().pokemons.offset
    

    try{
        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: resp.data.results //el resultado de API
        })
        
    }catch (error){
        console.log(error)
    }
}

//en el 1° () pasamos como parametro el numero dinamico para la request de la API
export const nextPokemonAction = (nextNumber) => async ( dispatch, getState ) => {

    const {offset} = getState().pokemons;
    const nextOffset = offset + nextNumber; 

    try {
        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${nextOffset}&limit=20`);
        dispatch({
            type: GET_NEXTPOKEMONS_SUCCESS,
            payload: {
                array: resp.data.results,
                offset: nextOffset
            }
        })
    } catch (error) {
        console.log(error)
    }
}