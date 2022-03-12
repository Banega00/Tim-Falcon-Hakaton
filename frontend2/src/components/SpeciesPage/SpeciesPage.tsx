import React, { useEffect, useState } from 'react';
// import styles from './SpeciesPage.module.scss'
import styles from './SpeciesPage.module.scss'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import slika from '../../images/beloglavi-sup-2.jpg'
import { flipCoordinatesArray } from '../../utils/util-functions';
import { useParams } from 'react-router-dom';
import { HttpService } from '../../utils/HttpService';

export const SpeciesPage: React.FC<any> = () => {
  let { id } = useParams();
  const [speciesData, setSpeciesData] = useState(undefined);
  useEffect(()=>{
    if(id && +id){
      HttpService.getSpeciesData(id)
    }
  },[])
  const polygons: [number, number][][] = [
    [
      [
        19.599609375,
        45.120052841530544
      ],
      [
        21.884765625,
        43.70759350405294
      ],
      [
        22.9833984375,
        45.55252525134013
      ],
      [
        19.599609375,
        45.120052841530544
      ]
    ],
    [
      [
        11.3818359375,
        46.800059446787316
      ],
      [
        13.9306640625,
        49.866316729538674
      ],
      [
        9.580078125,
        49.15296965617042
      ],
      [
        9.0966796875,
        47.84265762816538
      ],
      [
        11.3818359375,
        46.800059446787316
      ]
    ]
  ]

  return (
    <div className={styles.main}>
      {'Griffon vulture'}
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
        {polygons.map(polygon => <Polygon pathOptions={{ color: 'black', fillColor: 'green', weight: 3 }} positions={flipCoordinatesArray(polygon)} />)}
      </MapContainer>

      <div>
        Podaci o vrsti
      </div>


      <div>
        Broj jedinki: 20
      </div>
    </div>
  );
}
