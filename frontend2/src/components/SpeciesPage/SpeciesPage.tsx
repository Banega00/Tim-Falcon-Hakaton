import React, { useEffect, useState } from 'react';
// import styles from './SpeciesPage.module.scss'
import styles from './SpeciesPage.module.scss'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import slika from '../../images/beloglavi-sup-2.jpg'
import { flipCoordinatesArray } from '../../utils/util-functions';
import { useParams } from 'react-router-dom';
import { HttpService } from '../../utils/HttpService';
import { Species } from '../../models/Species.entity';
import { ResponseModel } from '../../models/ResponseModel';

export const colorBasedOnNumber = (num:number | undefined)=>{
  if(!num) return 'black'
  if(num < 10) return 'red'
  if(num < 50) return 'orange'
  if(num < 100) return 'yellow'
  if(num < 500) return 'greem'
}

export const SpeciesPage: React.FC<any> = () => {
  let { id } = useParams();
  const [speciesData, setSpeciesData] = useState<Species | undefined>(undefined);
  useEffect(()=>{
    if(id && +id){
      HttpService.getSpeciesData(id)
      .then(axiosResponse =>{
        const response:ResponseModel = axiosResponse.data;
        setSpeciesData(response.payload)
      })
    }
  },[])

  return (
    <div className={styles.main}>
      {speciesData && <div>{speciesData.name}</div>}
      {/* <div className={styles.mainImg} src="/src/images/beloglavi-sup-2.jpg"/> */}
      <img className={styles.mainImg} src={slika} alt="" />

      <MapContainer className={styles.mapa} center={[51.505, -0.09]} zoom={3}>
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          maxZoom={8}
        />
        <Marker position={[44.8125,
          20.4612]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {speciesData?.geoData && speciesData?.alive && speciesData.geoData.map((polygon, index) => <Polygon pathOptions={{ color: 'black', fillColor: colorBasedOnNumber(speciesData?.alive[index]), weight: 1, fillOpacity:0.5 }} positions={flipCoordinatesArray(polygon)} />)})
      </MapContainer>

      <div>
        O vrsti:
        {speciesData && speciesData.description}
      </div>

      <div>
        Broj jedinki:
        {speciesData && speciesData.alive}
      </div>


    </div>
  );
}
