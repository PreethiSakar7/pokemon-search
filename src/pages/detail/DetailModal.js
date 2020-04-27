import React from 'react'

import { Badge, ProgressBar} from 'react-bootstrap';


function DetailModal(props) {

    
    const getStatsDisply = (stat) => {
        
        if(stat.base_stat <= 30) {
            return <ProgressBar variant="danger" now={stat.base_stat} label={stat.base_stat} />
        } else if (stat.base_stat > 30 && stat.base_stat <= 60) {
            return <ProgressBar variant="warning" now={stat.base_stat} label={stat.base_stat}/>
        } else if (stat.base_stat > 60) {
            return <ProgressBar variant="success" now={stat.base_stat} label={stat.base_stat}/>
        }
    }

    return (

                        <div className="detail-display">
                        <div className="image-area">
                            <div className="image-normal">
                                <span>NORMAL</span>
                                <img src={props.pokemon?.images?.front_default} alt="fornt" width="96" height="96" />
                                <img src={props.pokemon?.images?.back_default} alt="back" width="96" height="96"/>
                            </div>
                            <div className="image-normal">
                                <span>SHINE</span>
                                <img src={props.pokemon?.images?.front_shiny} alt="shine-fornt" width="96" height="96"/>
                                <img src={props.pokemon?.images?.back_shiny} alt="shine-back" width="96" height="96"/>
                            </div>
                        </div>
                        {/* <div className="content-area"> */}
                            <div className="base-area">
                                <h4>BASE</h4>
                                <div className="base-card">
                                    <label>Order</label>
                                    <span>{props.pokemon?.order}</span>
                                </div>
                                <div className="base-card">
                                    <label>Type</label>
                                    <span>
                                    {props.pokemon?.types?.map((name, idx) => {
                                        return <Badge key={idx} variant="primary">{name}</Badge>
                                    })
                                    }
                                    </span>
                                </div>
                                <div className="base-card">
                                    <label>species</label>
                                    <span>{props.pokemon?.species}</span>
                                </div>
                                <div className="base-card">
                                    <label>height</label>
                                    <span>{props.pokemon?.height}</span>
                                </div>
                                <div className="base-card">
                                    <label>weight</label>
                                    <span>{props.pokemon?.weight}</span>
                                </div>
                                <div className="base-card">
                                    <label>Order</label>
                                    <span>{props.pokemon?.order}</span>
                                </div>
                            </div>
                            <div className="stat-area">
                                <h4>STAT</h4>
                                {
                                    props.pokemon?.stats?.map( (val, idx) => {
                                        return <div key={idx}>
                                            <span>
                                                {val.stat.name} 
                                            </span>
                                            <span>
                                                { getStatsDisply(val)}
                                            </span>
                                        </div>
                                    })
                                }
                            </div>
                    </div>
    );
}

export default DetailModal;