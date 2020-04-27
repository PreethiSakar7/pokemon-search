import React, { useState, useContext, useEffect } from 'react'

import './card.css'
import DetailModal from '../../pages/detail/DetailModal'

import { Modal, Spinner, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import Context from '../../store/context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHeart
} from '@fortawesome/free-regular-svg-icons';
import {
    faHeart as faHeartSolit,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faHeart,
    faHeartSolit
);

function PokeCard(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pokemon, setPokemon] = useState({});

    const [isLoading, setLoading] = useState(false);

    const { pokemonList, action } = useContext(Context);

    const [isFav, setIsFav] = useState(props.poke.isFav);

    useEffect(() => {
        setIsFav(props.poke.isFav);
        localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
    }, [props.poke.isFav]);

    const onPokemonSelected = async () => {
        // get the selected pokemon
        if (props.poke.name) {
            handleShow();
            setLoading(true);

            const url = 'https://pokeapi.co/api/v2/pokemon/' + props.poke.name;
            const response = await fetch(url);
            const jsonRes = await response.json();
            const selectedItem = {
                name: jsonRes.name,
                order: jsonRes.order,
                types: jsonRes.types.map(e => e.type.name),
                species: jsonRes.species.name,
                height: jsonRes.height,
                weight: jsonRes.weight,
                abilities: jsonRes.abilities,
                images: jsonRes.sprites,
                stats: jsonRes.stats
            }
            setPokemon({ ...selectedItem });
            setTimeout(() => {
                setLoading(false);
            }, 800)

        }
    }

    const setFav = () => {
        if (props.isEditable) {
            let setVal = !props.poke.isFav;
            action({ type: 'SET_FAV', payload: props.poke.name });
            setIsFav(setVal);
        }
    }

    const compareStats = () => {

        action({ type: 'SET_COMPARE', payload: props.poke.name });
        props.onCompareClick(props.poke.isCompare, props.poke.name)
    }

    return (
        <>
            <div className={`card ${props.isDisable ? 'disableCard' : ''} ${props.poke.isCompare ? 'selectedCard' : ''}`}>
                <div className="header-card">
                    <span className="icon-holder" onClick={setFav}>
                        {isFav ?
                            <FontAwesomeIcon icon={faHeartSolit} className="fav-icon" size="lg" /> :
                            <FontAwesomeIcon icon={faHeart} className="fav-icon" size="lg" />
                        }
                    </span>
                    <span key="custom-checkbox" className="compare-check">
                        <Form.Check
                            custom
                            value={props.poke.isCompare}
                            type="checkbox"
                            id={props.poke.id}
                            label=" "
                            onChange={compareStats}
                        />
                    </span>
                </div>
                <div className="card-image">
                    <img src={`https://pokeres.bastionbot.org/images/pokemon/${props.poke.id}.png`} alt="pokeman"></img>
                </div>
                <div className="card-footer" onClick={onPokemonSelected}>
                    <div className="card-footer-name">{props.poke.name}</div>
                    <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                click to view detail.
                        </Tooltip>
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" size="lg" />
                    </OverlayTrigger>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title >
                        {isFav ?
                            <FontAwesomeIcon icon={faHeartSolit} className="fav-icon secondary-cl" /> :
                            <FontAwesomeIcon icon={faHeart} className="fav-icon secondary-cl" />
                        }
                        {props.poke.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isLoading ?
                            <div className="spinerClass">
                                <Spinner animation="grow" variant="danger" />
                            </div> :
                            <DetailModal pokemon={pokemon} ></DetailModal>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PokeCard;