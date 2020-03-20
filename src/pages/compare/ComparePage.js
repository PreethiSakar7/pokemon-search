import React, { useEffect, useState } from 'react'
import { Button, Badge, Container, Modal, ProgressBar, Form } from 'react-bootstrap';
import './comparePage.css'

function ComparePage(props) {

    const [fromPoke, setFromPoke] = useState({});
    const [ToPoke, setToPoke] = useState({});

    useEffect(() => {
        const [from, to] = props.match.params.compareList.split(',');

        setFromPoke(getPoke(to));
        getPoke(from).then(
            (data) => {
                console.log(data);
                setFromPoke(data);
                console.log(fromPoke);
            }
        );
        getPoke(to).then(
            (data) => {
                console.log(data);
                setToPoke(data);
                console.log(ToPoke);
            }
        );
    }, []);

    const getPoke = async (name) => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + name;
        const response = await fetch(url);
        const jsonRes = await response.json();
        console.log(origin)
        const selectedItem = {
            name: jsonRes.name,
            id: jsonRes.id,
            order: jsonRes.order,
            types: jsonRes.types.map(e => e.type.name),
            species: jsonRes.species.name,
            height: jsonRes.height,
            weight: jsonRes.weight,
            abilities: jsonRes.abilities,
            images: jsonRes.sprites,
            stats: jsonRes.stats
        }
        return selectedItem;
    }

    const getValue = (idx) => {
        console.log(ToPoke.stats[idx])
    }
    return (
        <Container fluid className="compare-layout">
            <div className="compare-header">
            <Button href="/" variant="warning" 
                >Go Home</Button>

            </div>
            <div className="compare-area">
                <div className="content">
                    <span>
                        
                    </span>
                    <span className="header-col">
                        <span>
                            {fromPoke?.name}
                        </span>
                        <span>
                            <img src={`https://pokeres.bastionbot.org/images/pokemon/${fromPoke?.id}.png`} ></img>
                        </span>
                    </span>
                    <span className="header-col">
                        <span>
                            {ToPoke?.name}
                        </span>
                        <span>
                            <img src={`https://pokeres.bastionbot.org/images/pokemon/${ToPoke?.id}.png`} ></img>
                        </span>
                    </span>
                </div>
                {
                    fromPoke?.stats?.map((val, idx) => {
                        return <div className="content" key={idx}>
                            <span className="row-header">
                                {val.stat.name}
                            </span>
                            <span>
                                {val.base_stat}
                            </span>
                            <span>
                                {`${ToPoke?.stats?.[idx]?.base_stat}`}
                            </span>
                        </div>
                    })
                }
            </div>
        </Container>
    );
}

export default ComparePage;