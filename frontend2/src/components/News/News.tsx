import React from 'react';
import styles from '../News/News.module.scss';
import TopNews from '../TopNews/TopNews';
import NewsCard from '../NewsCard/NewsCard';
import Koala from '../../images/koala.jpg';
import ProfilePic from '../../images/profilepic.png'
import AnimalTrophy from '../../images/animaltrophy.jpg'
import Chick from '../../images/chicks.jpg'

const News = () => {
    return(
    <section className={styles.news}>
        <div className={styles.newsContainer}>
            <h1 className = { styles.newsTitle }>News</h1>
            <TopNews/>
            <div className={styles.listNews}>
                <NewsCard naslovVesti="Koalas: Australia lists marsupial as endangered species" tekstVesti="Australia has listed the koala as an endangered species across most of its east coast, after a dramatic decline in numbers.

The once-thriving marsupial has been ravaged by land clearing, bushfires, drought, disease and other threats.

The federal government said the listing was for Queensland, New South Wales and the Australian Capital Territory (ACT).

It has been urged to do more to protect koalas from rapidly diminishing habitats and climate change." slikaVesti={ Koala } autor={"Branislav Stojanovic"} slikaAutora={ ProfilePic } datum={"February 10, 2022"} zivotinja="Koalas"/>
                
                <NewsCard naslovVesti="UK plan to ban animal trophies too slow - conservation groups" tekstVesti="Conservation groups and campaigners have called on the government to move faster with plans to ban the import of animal hunting trophies.

On Friday, the government published its long-awaited response to a public consultation on the issue and promised a ban.

But it stopped short of naming a date when legislation would be introduced." slikaVesti={ AnimalTrophy } autor={"Aleksandar Jovanovic"} slikaAutora={ ProfilePic } datum={"February 19, 2022"} zivotinja="General"/>
                
                <NewsCard naslovVesti="Chester Zoo: Two red-billed curassow chicks hatch" tekstVesti="Two chicks of an endangered species of bird have hatched at Chester Zoo.

The zoo has welcomed two red-billed curassow chicks after they were incubated for 30 days.

The birds are native to the Atlantic Rainforests in the south of Brazil and it is estimated fewer than 200 of them remain in the wild" slikaVesti={ Chick } autor={"Uros Stanimirovic"} slikaAutora={ ProfilePic } datum={"March 10, 2022"} zivotinja="Birds"/>
            </div>
        </div>
    </section>
    )
}

export default News;