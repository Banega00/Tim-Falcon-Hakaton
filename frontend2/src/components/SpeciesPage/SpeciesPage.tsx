import React, { useEffect, useState } from 'react';
// import styles from './SpeciesPage.module.scss'
import styles from './SpeciesPage.module.scss'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import slika from '../../images/falcon-logo-1.png'
import { flipCoordinatesArray, getUser } from '../../utils/util-functions';
import { useNavigate, useParams } from 'react-router-dom';
import { HttpService } from '../../utils/HttpService';
import { Species } from '../../models/Species.entity';
import { ResponseModel } from '../../models/ResponseModel';
import AnimalProfileCard from "../AnimalProfileCard/AnimalProfileCard";
import { FaHeart } from 'react-icons/fa';
import { arraySum } from '../EndangeredSpecies/EndangeredSpecies';

export const colorBasedOnNumber = (num: number | undefined) => {
  if (!num) return 'black'
  if (num < 10) return 'red'
  if (num < 50) return 'orange'
  if (num < 100) return 'yellow'
  if (num < 500) return 'green'
}

export const SpeciesPage: React.FC<any> = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [speciesData, setSpeciesData] = useState<Species | undefined>(undefined);
  useEffect(() => {
    if (id && +id) {
      HttpService.getSpeciesData(id)
        .then(axiosResponse => {
          const response: ResponseModel = axiosResponse.data;
          setSpeciesData(response.payload)
          setAnimals(response.payload.animalProfiles)
        })
    }
  }, [])

  const isUserAlreadyFollow = () => {
    const loggedInUser = getUser()
    if (!loggedInUser) return false
    const bool = speciesData?.users.some(user => user.id === loggedInUser.id)
    return bool;
  }

  const followSpecies = (event) => {
    event.target.classList.add('alreadyFollow')
    const user = getUser();
    if (user) {
      if (isUserAlreadyFollow()) return;
    } else {
      navigate('/login')
    }

    speciesData && HttpService.followSpecies(speciesData.id!);
    return true;
  }

  const [animals, setAnimals] = useState([
    { pfp: slika, name: "Pera", followers: 305, age: 12 },
    { pfp: slika, name: "Pera", followers: 305, age: 12 },
    { pfp: slika, name: "Pera", followers: 305, age: 12 },
  ])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.firstPart}>
          <div>
            {speciesData && <div className={styles.sName}><p>{speciesData.name}</p></div>}
            <div className={isUserAlreadyFollow() ? styles.followBtn + " " + styles.alreadyFollow : styles.followBtn}>
              {<FaHeart className={styles.heart} onClick={followSpecies} />}
            </div>
          </div>
          {/* <div className={styles.mainImg} src="/src/images/beloglavi-sup-2.jpg"/> */}
          {speciesData && <img className={styles.mainImg} src={require(`../../images/${speciesData?.images[0]}`)} alt="" />}
          <div className={styles.about}>
            <span className={styles.span}>About:</span>: {speciesData && speciesData.description}
          </div>

          <div className={styles.about}>
            <span className={styles.span}>Alive:</span> {speciesData && arraySum(speciesData.alive)}
          </div>
          <MapContainer className={styles.mapa} center={[51.505, -0.09]} zoom={3}>
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxZoom={8}
            />
            {/* <Marker position={[44.8125,
            20.4612]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
            {speciesData?.geoData && speciesData?.alive && speciesData.geoData.map((polygon, index) => <Polygon pathOptions={{ color: 'black', fillColor: colorBasedOnNumber(speciesData?.alive[index]), weight: 1, fillOpacity: 0.5 }} positions={flipCoordinatesArray(polygon)} />)})
          </MapContainer>
        </div>


        <div className={styles.organizations}>
          <h1>Help me, save me.</h1>
          {speciesData?.organizations?.map(organization =>
            <div className={styles.organization}>
              <img src={require(`../../images/organization/${organization.logoImage}`)} />
              <h1>{organization.name}</h1>
              <button><a href={organization.webSiteURL}>Donate here!</a></button>
            </div>)}

        </div>

        <div className={styles.organizations}>
          {animals.map((animal) =>
            <>
              <AnimalProfileCard animal={animal}></AnimalProfileCard>
            </>
          )}
        </div>


      </div>
    </div>
  );
}


