import React from 'react';
import Masonry from 'react-masonry-css';
import styles from "./.EndangeredSpecies.module.scss";

const EndangeredSpecies = () => {

    return(
        <section className='endangeredSpecies'>
            <div className='endangeredSpeciesContainer'>
            <h1 className='endangeredSpeciesTitle'>Endangered Species</h1>
            
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
            

            </Masonry>
            </div>
        </section>
    )
}

export default EndangeredSpecies;