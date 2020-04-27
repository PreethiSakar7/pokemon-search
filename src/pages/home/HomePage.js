import React, { useState, useContext, useEffect, useRef } from 'react';

import './homePage.css'
//lib
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Container, Form } from 'react-bootstrap';

import PokeCard from '../../components/card/Card'

import Context from '../../store/context';

function HomePage(props) {

    const [selected, setSelected] = useState([]);
    const showFav = useRef();
   // let compareList = useRef();
   
    const { pokemonList, action } = useContext(Context);
    const [displayList, setDisplayList] = useState([]);
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        let firstArray = pokemonList.slice(0, 200);
        setDisplayList([...firstArray]);
    }, [pokemonList.length]);

    useEffect( () => {
        console.log(compareList);
        // setCompareList([...compareList, selectedName.current]);
    }, [compareList])

    const showOnlyFav = () => {
       if (showFav.current.checked) {
            let result = pokemonList.filter(poke => poke.isFav === true);
            setDisplayList([...result.slice(0, 200)]);
       } else {
           let firstArray = pokemonList.slice(0, 200)
        setDisplayList([...firstArray]);
       }
    }

    const maintainCompareList = (checked, name) => {
        if (checked) {
            setCompareList([...compareList, name]);
        } else {
            setCompareList(compareList.filter(item => item !== name));
        }
        console.log(compareList);
    }

    const goToCompare = () => {
        console.log('test');
        props.history.push(`/compare/${compareList}`)
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
                        setDisplayList([...result.slice(0, 200)]);
                    }}
                    placeholder="Search"
                    className="form-control search-input"
                ></input>
                <Button href="#" variant="warning" 
                disabled={!(compareList.length === 2)}
                style={ {opacity : compareList.length !== 2 ? '0.5' : '1', marginLeft: '20px'} }
                onClick={goToCompare}>Compare</Button>
            </div>
            <div className="card-view">
                {
                    displayList.map((val, index) => {
                        return <PokeCard 
                        key={index}
                        poke={val}
                        isDisable={compareList.length === 2 && !val.isCompare}
                        isEditable={!showFav.current.checked} 
                        onCompareClick={maintainCompareList}></PokeCard>
                    })
                }
            </div>
        </Container>
    );
}

export default HomePage;