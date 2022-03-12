import React from 'react';
import styles from './SpeciesPage.module.scss'
import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline } from 'react-leaflet'
import slika from '../../images/beloglavi-sup-2.jpg'

export const SpeciesPage: React.FC<any> = (props) => {
    const polygon: [number, number][][] = [
        [
          [
            9.4921875,
            44.02442151965934
          ],
          [
            17.9296875,
            44.02442151965934
          ],
          [
            17.9296875,
            49.724479188712984
          ],
          [
            9.4921875,
            49.724479188712984
          ],
          [
            9.4921875,
            44.02442151965934
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
                    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    maxZoom={17}
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Polygon pathOptions={{color: 'black', fillColor: 'green', weight: 3} } positions={polygon} />
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
