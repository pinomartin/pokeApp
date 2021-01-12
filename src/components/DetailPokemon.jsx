import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSinglePokeDetail } from '../redux/pokeDucks'

export const DetailPokemon = () => {

    const dispatch = useDispatch();

    React.useEffect( () => {
     const fetchData = () => {
            dispatch( getSinglePokeDetail() )
        }
        fetchData()
    }, [dispatch])


    const pokemon = useSelector(store => store.pokemons.singlePokemon);

    

    return pokemon ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemon.img} alt={pokemon.name} className="img-fluid"/>
                <div className="card-title text-uppercase">
                    {pokemon.name}
                </div>
                <div className="card-text small">
                    Height: {pokemon.height} || Weight: {pokemon.weight}
                </div>
            </div>
        </div>
    ) 
    :
    null
}
