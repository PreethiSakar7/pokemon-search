import React, { Fragment, useState, useContext, useEffect, useRef } from 'react';

import './homePage.css'
//lib
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Badge, Container, Modal, ProgressBar, Form } from 'react-bootstrap';

import PokeCard from '../../components/card/Card'

import Context from '../../store/context';

function HomePage() {

    const [selected, setSelected] = useState([]);
    const showFav = useRef();
   
    const { pokemonList, action } = useContext(Context);
    const [displayList, setDisplayList] = useState([]);

    useEffect(() => {
        let firstArray = pokemonList.slice(0, 50);
        setDisplayList([...firstArray]);
    }, [pokemonList.length]);

    const showOnlyFav = () => {
       if (showFav.current.checked) {
            let result = pokemonList.filter(poke => poke.isFav === true);
            setDisplayList([...result.slice(0, 50)]);
       } else {
           let firstArray = pokemonList.slice(0, 50)
        setDisplayList([...firstArray]);
       }
    }

    return (
        <Container fluid>
            <div className="search-bar">
            <div className="switch-fav">
            <Form.Check 
                ref={showFav}
                type="switch"
                id="custom-switch"
                label="Show Favourites"
                onChange={showOnlyFav}
            />  
            </div>
                <input
                    value={selected}
                    onChange={(e) => {
                        let query = e.target.value;
                        setSelected(query);
                        let result = pokemonList.filter(poke => {
                            return poke.name.includes(query)
                        });
                        setDisplayList([...result.slice(0, 50)]);
                    }}
                    placeholder="Search"
                    className="form-control search-input"
                ></input>
            </div>
            <div className="card-view">
                {
                    displayList.map((val, index) => {
                        return <PokeCard key={index} poke={val} isEditable={!showFav.current.checked}></PokeCard>
                    })
                }
            </div>
        </Container>
    );
}

export default HomePage;