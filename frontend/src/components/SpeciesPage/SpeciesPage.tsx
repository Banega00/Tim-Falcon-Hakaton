import React from 'react';
import styles from './SpeciesPage.module.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import slika from '/src/images/beloglavi-sup-2.jpg'

export const SpeciesPage: React.FC<any> = (props) => {
    return (
        <div className={styles.main}>
            {'Griffon vulture'}
            <img className={styles.mainImg} src="/src/images/beloglavi-sup-2.jpg" alt="beloglavi sup slika" />
            <MapContainer center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
