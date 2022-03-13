import React, { useState } from 'react';
import styles from "./EndangeredSpecies.module.scss";
import EndangeredSpeciesCard from '../EndangeredSpeciesCard/EndangeredSpeciesCard';
import Sheep from '../../images/goat.png';
import Leopard from '../../images/jaguar.png';
import Rhino from '../../images/rhino.png';
import Snail from '../../images/snail.png';
import Kakapo from '../../images/parrot.png';
import Albatros from '../../images/crane.png';
import Vaquita from '../../images/dolphin.png'
import { ConservationStatus } from '../../models/Enums';



const EndangeredSpecies = () => {
    const [conservationStatus, setConservationStatus] = useState<number>(1);
    const statusesArray = Object.values(ConservationStatus)
    let handleConservationStatus = (event) =>{
        setConservationStatus(+event.target.value)
    }
    return(
        <section className={styles.endangeredSpecies}>
            <div className={styles.filteri}>
                <div className={styles.stanisteContainer}>
                    <div className={styles.stanisteNaslovContainer}>
                        <h1>Habitat</h1>
                        <div className="boxes">

                        <input type="checkbox" id="box-1"/>
                        <label htmlFor="box-1">Water</label>

                        <input type="checkbox" id="box-2"/>
                        <label htmlFor="box-2">Land</label>

                        <input type="checkbox" id="box-3"/>
                        <label htmlFor="box-3">Forest</label>
                    </div>
                </div>
            </div>
                <div className={styles.kontinentContainer}>
                    <div className={styles.kontinentNaslovContainer}>
                    <h1>Continent</h1>
                    <div className="boxes">

                        <input type="checkbox" id="box-4"/>
                        <label htmlFor="box-4">Europe</label>

                        <input type="checkbox" id="box-5"/>
                        <label htmlFor="box-5">North America</label>

                        <input type="checkbox" id="box-6"/>
                        <label htmlFor="box-6">South America</label>

                        <input type="checkbox" id="box-7"/>
                        <label htmlFor="box-7">Asia</label>

                        <input type="checkbox" id="box-8"/>
                        <label htmlFor="box-6">Africa</label>

                        <input type="checkbox" id="box-9"/>
                        <label htmlFor="box-9">Australia</label>
                    </div>
                    </div>
                </div>
            </div>
            <div className={styles.endangeredSpeciesContainer}>
            <h1>Endangered Species</h1>
            <div className={styles.rangeContainer}>
                <label htmlFor="conservationStatus">
                Conservation Status
                </label>
                <input type="range" name="conservationStatus" onChange={handleConservationStatus} min="1" max="8" defaultValue={1}/>
                {conservationStatus && <div>{statusesArray[statusesArray.length-conservationStatus]}</div>}
            </div>
            <div className={styles.cards}>
                <EndangeredSpeciesCard img={ Sheep } text="Barbary Sheep" left= "5,000 - 10,000" habitat="North America, Europe"/>
                <EndangeredSpeciesCard img={ Leopard } text="Amur Leopard" left= "70" habitat="Asia"/>
                <EndangeredSpeciesCard img={ Rhino } text="White Rhino" left= "2" habitat="Africa"/>
                <EndangeredSpeciesCard img={ Kakapo } text="Kakapo" left= "208" habitat="Australia"/>
                <EndangeredSpeciesCard img={ Snail } text="Oahu Tree Snails" left= "19 - 41" habitat="North America"/>
                <EndangeredSpeciesCard img={ Vaquita } text="Vaquita" left= "10" habitat="South America"/>
                <EndangeredSpeciesCard img={ Albatros } text="Amsterdam Albatros" left= "130" habitat="North America, Europe"/>
            </div>
            </div>
        </section>
    )
}

export default EndangeredSpecies;