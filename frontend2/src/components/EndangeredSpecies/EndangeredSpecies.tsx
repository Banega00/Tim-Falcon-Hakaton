import React, {useEffect, useState} from 'react';
import styles from "./EndangeredSpecies.module.scss";
import EndangeredSpeciesCard from '../EndangeredSpeciesCard/EndangeredSpeciesCard';
import {Biome, ConservationStatus, ContinentEnum} from '../../models/Enums';
import {Species} from '../../models/Species.entity';
import {HttpService} from '../../utils/HttpService';
import {useParams} from 'react-router-dom';

export const arraySum = (array) =>{
    let sum = 0;
    array.forEach(element => {
      sum+=+element;
    });
    return sum;
  }

const EndangeredSpecies = () => {
    let { id } = useParams();
    let idNumber;
    id && (idNumber=+id);

   
    
    const [speciesArray, setSpeciesArray] = useState<Species[]>([])
    const [filteredSpeciesArray, setFilteredSpeciesArray] = useState<Species[]>([])
    const [selectedHabitats, setSelectedHabitats] = useState<Biome[]>([])
    const [selectedContinents, setSelectedContinents] = useState<ContinentEnum[]>([])
    const [conservationStatus, setConservationStatus] = useState<number>(0);
    
    if(idNumber){
        if(!selectedContinents || selectedContinents.length==0){
            setSelectedContinents([Object.values(ContinentEnum)[idNumber-1]])
        }
    }

    const filteredSpecies = () =>{
        console.log("FILTRIRAM")
        setFilteredSpeciesArray(speciesArray.filter(species => {
            if(selectedHabitats && selectedHabitats.length >0 && !selectedHabitats.includes(species.biome))return false;
            if(!species.continent) return false;
            if(selectedContinents && selectedContinents.length >0 && !species.continent.some(continent => selectedContinents.includes(continent))) return false
            if(conservationStatus && statusesArray[statusesArray.length-conservationStatus] != species.conservationStatus) return false
            return true
        }))
    }

    useEffect(filteredSpecies,[selectedContinents, selectedHabitats, conservationStatus])

    const filterHabitat = (event) =>{
        let exists = false;
        const newSelectedHabitats = selectedHabitats.filter(habitat => {
            if(habitat == event.target.value){
                event.target.checked = false;
                exists=true;
                return false;
            }
            return true;
        })

        if(!exists) {
            event.target.checked = true;
            newSelectedHabitats.push(event.target.value)
        }
        setSelectedHabitats(newSelectedHabitats)
    }

    const filterContinents = (event) =>{
        let exists = false;
        const newContinents = selectedContinents.filter(continent => {
            if(continent == event.target.value){
                exists=true;
                return false;
            }
            return true;
        })

        if(!exists) newContinents.push(event.target.value)

        setSelectedContinents(newContinents)
        filteredSpecies()
    }
    useEffect(()=>{
        HttpService.getAllSpecies()
        .then(response =>{
            console.log(response.data.payload)
            setSpeciesArray(response.data.payload)
            setFilteredSpeciesArray(response.data.payload)
        })
        .catch(console.log)
    },[])
    const statusesArray = Object.values(ConservationStatus)
    let handleConservationStatus = (event) =>{
        setConservationStatus(+event.target.value)
        filteredSpecies()
    }
    return(
        <section className={styles.endangeredSpecies}>
            <div className={styles.filteri}>
                <div className={styles.stanisteContainer}>
                    <div className={styles.stanisteNaslovContainer}>
                        <h1>Habitat</h1>
                        <div className="boxes">

                        <input type="checkbox" id="box-1" value="Water" onChange={filterHabitat}/>
                        <label htmlFor="box-1">Water</label>

                        <input type="checkbox" value="Grassland" id="box-2" onChange={filterHabitat}/>
                        <label htmlFor="box-2">Grassland</label>

                        <input type="checkbox" value="Forest" id="box-3" onChange={filterHabitat}/>
                        <label htmlFor="box-3">Forest</label>

                        <input type="checkbox" value="Desert" id="box-4" onChange={filterHabitat}/>
                        <label htmlFor="box-4">Desert</label>

                        <input type="checkbox" value="Tundra" id="box-5" onChange={filterHabitat}/>
                        <label htmlFor="box-5">Tundra</label>
                    </div>
                </div>
            </div>
                <div className={styles.kontinentContainer}>
                    <div className={styles.kontinentNaslovContainer}>
                    <h1>Continent</h1>
                    <div className="boxes">

                        <input checked={(idNumber && idNumber==1)} type="checkbox" id="boxx-1" value="Europe" onChange={filterContinents}/>
                        <label htmlFor="boxx-1">Europe</label>

                        <input checked={(idNumber && idNumber==4)} type="checkbox" id="boxx-2" value="North America" onChange={filterContinents}/>
                        <label htmlFor="boxx-2">North America</label>

                        <input checked={(idNumber && idNumber==5)} type="checkbox" id="boxx-3" value="South America" onChange={filterContinents}/>
                        <label htmlFor="boxx-3">South America</label>

                        <input checked={(idNumber && idNumber==2)} type="checkbox" id="boxx-4" value="Asia" onChange={filterContinents}/>
                        <label htmlFor="boxx-4">Asia</label>

                        <input checked={(idNumber && idNumber==3)} type="checkbox" id="boxx-5" value="Africa" onChange={filterContinents}/>
                        <label htmlFor="boxx-5">Africa</label>

                        <input checked={(idNumber && idNumber==6)} type="checkbox" id="boxx-6" value="Australia" onChange={filterContinents}/>
                        <label htmlFor="boxx-6">Australia</label>

                        <input type="checkbox" id="boxx-7" value="Antartica" onChange={filterContinents}/>
                        <label htmlFor="boxx-7">Antartica</label>
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
                {filteredSpeciesArray && filteredSpeciesArray.map(species => <EndangeredSpeciesCard id={species.id} img={ species.images[0] } text={species.name} total={arraySum(species.alive)} remaining= {species.alive} continent={species.continent} badgeText={species.conservationStatus.toString()}
                />)}
                
                {/* <EndangeredSpeciesCard img={ Leopard } text="Amur Leopard" left= "70" habitat="Asia"/>
                <EndangeredSpeciesCard img={ Rhino } text="White Rhino" left= "2" habitat="Africa"/>
                <EndangeredSpeciesCard img={ Kakapo } text="Kakapo" left= "208" habitat="Australia"/>
                <EndangeredSpeciesCard img={ Snail } text="Oahu Tree Snails" left= "19 - 41" habitat="North America"/>
                <EndangeredSpeciesCard img={ Vaquita } text="Vaquita" left= "10" habitat="South America"/>
                <EndangeredSpeciesCard img={ Albatros } text="Amsterdam Albatros" left= "130" habitat="North America, Europe"/> */}
            </div>
            </div>
        </section>
    )
}

export default EndangeredSpecies;