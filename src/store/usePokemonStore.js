import {useState} from 'react'

const usePokemonState = () => {
    const [pokemonList, setPokemonList] = useState([{name: 'loading...', favourt: 'false'}]);

    const action = (action) => {
        const {type, payload} = action;

        switch(type) {
            case 'SET_POKEMON_LIST' :
                return setPokemonList( () => [...payload]);
            case 'SET_FAV' :
                return pokemonList.map(poke => {
                    if(poke.name === payload) {
                      poke.isFav = !poke.isFav;
                    }
                    return poke;
                  });
            case 'SET_COMPARE':
                return pokemonList.map(poke => {
                    if (poke.name === payload) {
                        poke.isCompare = !poke.isCompare;
                    }
                    return poke;
                });
            default:
                return pokemonList;
        }
    }
    return {pokemonList, action}
}

export default usePokemonState;