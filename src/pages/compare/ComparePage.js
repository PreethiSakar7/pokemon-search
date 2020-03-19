import React, {useEffect, useState} from 'react'
import { Button, Badge, Container, Modal, ProgressBar, Form } from 'react-bootstrap';
import './comparePage.css'

function ComparePage(props) {

    const [fromPoke, setFromPoke] = useState({});
    const [ToPoke, setToPoke] = useState({});

    useEffect( () => {
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
            return selectedItem;
    }

    const getValue =(idx) => {
       console.log(ToPoke.stats[idx])
    }
    return (
        <Container fluid className="compare-layout">
            <div className="compare-header">
                <a href="/">Go Back</a> 
                <h2>
                Compare Statistic
                </h2>
            </div>
            <div className="compare-area">
                {
                   fromPoke?.stats?.map( (val, idx) => {
                        return <div className="content" key={idx}>
                            <span>
                                {val.stat.name} 
                            </span>
                            <span>
                                { val.base_stat}
                            </span>
                            <span>
                                { `${ToPoke?.stats?.[idx]?.base_stat}`}
                            </span>
                        </div>
                    })
                }
            </div>
        </Container>
    );
}

export default ComparePage;