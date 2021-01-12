import axios from 'axios'

//constants
const initialState = { //Hacemos una copia de la respuesta de la API
   count: 0,
   next: null,
   previous: null,
   results: []
}

const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
const GET_NEXTPOKEMONS_SUCCESS = 'GET_NEXTPOKEMONS_SUCCESS';
const GET_PREVIOUSPOKEMONS_SUCCESS = 'GET_PREVIOUSPOKEMONS_SUCCESS';
const GET_SINGLEPOKEMON_SUCCESS = 'GET_SINGLEPOKEMON_SUCCESS';


//reducer (SIEMPRE devuelve un state )
export default function pokeReducer( state = initialState , action ){
    switch(action.type){
        case GET_POKEMONS_SUCCESS :
            return {...state, ...action.payload }

        case GET_NEXTPOKEMONS_SUCCESS :
            return{...state, ...action.payload}

        case GET_PREVIOUSPOKEMONS_SUCCESS :
            return{...state, ...action.payload}

        case GET_SINGLEPOKEMON_SUCCESS :
            return{...state, singlePokemon: action.payload}

        default: 
            return state
    }
}

//actions -- dispatch activa el reducer, y getState trae la data del state
export const getPokemonsAction = () => async ( dispatch, getState ) => {

    if(localStorage.getItem('ApiResult')){//si encuentra data en el LS que cargue el dispatch con eso
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem('ApiResult')) 
        })
        return 
    }

    //El metodo getState trae todo el store por lo q se debe espec. que prop queremos,,,, 
    try{
        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=$0&limit=20`)
        dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: resp.data //el resultado de API
        })

        localStorage.setItem('ApiResult', JSON.stringify(resp.data))//Pasar a String en Object

    }catch (error){
        console.log(error)
    }
}

//en el 1° () pasamos como parametro el numero dinamico para la request de la API
export const nextPokemonAction = () => async ( dispatch, getState ) => {

    const {next} = getState().pokemons;//esto devuelve la URL de los 20 siguientes

    if(localStorage.getItem(next)){
        dispatch({
            type: GET_NEXTPOKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(next)) 
        })
        return 
    }

    try {
        const resp = await axios.get( next );
        dispatch({
            type: GET_NEXTPOKEMONS_SUCCESS,
            payload: resp.data
        })

        localStorage.setItem(next, JSON.stringify(resp.data))

    } catch (error) {
        console.log(error)
    }
}

export const previousPokemonAction = () => async ( dispatch, getState ) => {
    
    const {previous} = getState().pokemons;

    if(localStorage.getItem(previous)){
        dispatch({
            type: GET_PREVIOUSPOKEMONS_SUCCESS,
            payload: JSON.parse(localStorage.getItem(previous)) 
        })
        return 
    }
    
    try {
        const resp = await axios.get( previous );
        dispatch({
            type: GET_PREVIOUSPOKEMONS_SUCCESS,
            payload: resp.data
        })

        localStorage.setItem(previous, JSON.stringify(resp.data))

    } catch (error) {
        console.log(error);
    }
}


export const getSinglePokeDetail = ( url = 'https://pokeapi.co/api/v2/pokemon/1/' ) => async ( dispatch ) => {

    // if(url === undefined) {
    //     url = 'https://pokeapi.co/api/v2/pokemon/1/'
    // }

    try {
        const res = await axios.get( url )
        dispatch({
            type: GET_SINGLEPOKEMON_SUCCESS,
            payload: {
                name: res.data.name,
                weight: res.data.weight,
                height: res.data.height,
                img: res.data.sprites.front_default
            }
        })

    } catch (error) {
        console.log(error)
    }
}