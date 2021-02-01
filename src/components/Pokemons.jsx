import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
//useDispatch: para consumir la accion 
//useSelector: para leer el array/state Principal, devuelve el store

import { getPokemonsAction, nextPokemonAction, previousPokemonAction, getSinglePokeDetail } from '../redux/pokeDucks'
import { DetailPokemon } from './DetailPokemon'
 
export const Pokemons = () => {

    const dispatch = useDispatch()

    //Accede al store que "brinda" el Provider de App.jsx
    const pokemons = useSelector(store => store.pokemons.results) 
    //accedemos a todo el store, se llama a la prop que queremos con el nombre q pusimos en rootReducer
    
    const next = useSelector(store => store.pokemons.next);
    const previous = useSelector(store => store.pokemons.previous);


    return (
        <div className="row mt-3">
            <div className="col-md-6">
            <h3>Pokemons List</h3>
            <hr/>
            <div className="d-flex justify-content-between">

            {
                pokemons.length === 0 && 
                <button 
                className="btn btn-dark"
                onClick={() => dispatch( getPokemonsAction() )}
                >
                    Get Pokemons
            </button>
            }

            {
                next && 
                <button 
                className="btn btn-dark"
                onClick={() => dispatch( nextPokemonAction() )}
                >
                    Next Pokemons
            </button>
            }

            {
                previous && 
                <button 
                className="btn btn-dark"
                onClick={() => dispatch( previousPokemonAction() )}
                >
                    Previous Pokemons
            </button>
            }
            </div>
            <ul className="list-group mt-3">
                {
                    pokemons.map(item => (
                        <li className="list-group-item text-capitalize" key={item.name}>
                            {item.name}
                            <button 
                                className="btn btn-warning float-right"
                                onClick={() => dispatch(getSinglePokeDetail (item.url))}
                            >
                                    Info</button>
                            </li>
                    ))        
                }
            </ul>
            </div>
            <div className="col-md-6 text-center">
                <h4>Pokemon Details</h4>
                <DetailPokemon />
            </div>
        </div>
    )
}
