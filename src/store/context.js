import {createContext} from 'react'

const Context = createContext({
    name: null,
    isFav: false,
    isCompare: false
});

export default Context;