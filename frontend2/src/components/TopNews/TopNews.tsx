import React from 'react';
import styles from '../TopNews/TopNews.module.scss';
import LeopardImg from '../../images/leopardphoto.jpg';

const TopNews = () => {
    return(
        <div className = { styles.topNewsCard }>
            <div className = { styles.topNewsImg }>
                <img src={ LeopardImg } alt="" />
            </div>
            <div className={ styles.topNewscontent }>
                <div className = { styles.topNewsDate }>March 13, 2022</div>
                <div className = { styles.topNewsHeader }>Two endangered amur leopards born in Illinios zoo</div>
                <div className = { styles.topNewsText }>COAL VALLEY, Ill. (Gray News) – An Illinois zoo is celebrating after the successful births of two endangered cubs.
Niabi Zoo in Coal Valley, Illinois, announced the birth of the Amur leopard cubs in a Facebook post Tuesday.
Fewer than 100 individual Amur leopards exist in the wild and it is the most critically endangered big cat in the world, according to the zoo.</div>
            </div>
        </div>
    )
}

export default TopNews;