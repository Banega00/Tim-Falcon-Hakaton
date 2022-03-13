import React, {useEffect, useState} from "react";
import styles from "./ProfileAnimal.module.scss";
import styles1 from "../SpeciesPage/SpeciesPage.module.scss";
import {useParams} from "react-router-dom";
import {AnimalProfile} from "../../models/AnimalProfile.entity";
import {HttpService} from "../../utils/HttpService";
import {ResponseModel} from "../../models/ResponseModel";
import {Carousel} from "react-responsive-carousel";
import img1 from "../../images/beloglavi_sup1.jpg"
import img2 from "../../images/pngwing.com.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProfileAnimal = () => {
  let { id } = useParams(); //animalProfile/:id
  const [animalData, setAnimalData] = useState<AnimalProfile>(new AnimalProfile());
  useEffect(()=>{
    if(id && +id){
      HttpService.getAnimalData(id)
        .then(axiosResponse => {
          const response:ResponseModel = axiosResponse.data;
          setAnimalData(response.payload)
          console.log(response.payload);
        })
    }
  },[])

  const[chatBot, setChatBot] = useState(false);

  return (
    <div className={styles1.container}>
      <div className={chatBot ? styles.overlay + " " + styles.active : styles.overlay}></div>
      <div className={styles1.main}>
        <h1>Ime</h1>
        {/*<p><span style={{color: 'gray'}}>Species:</span> Sepcies</p>*/}
        <Carousel className={styles.carousel}>
          <div>
            {/*{animalData && <img className={styles.mainImg} src={require(`../../images/${animalData?.images[0]}`)} alt="" />}*/}
            <img src={img1}/>
          </div>
          <div>
            <img src={img2}/>
          </div>
        </Carousel>
      </div>

      <a className={styles.chatIcon} onClick={() => {
        if (chatBot)
          setChatBot(false);
        else
          setChatBot(true);
      }}>
      </a>
      <div className={chatBot ? styles.chatBotContainer + " " + styles.active : styles.chatBotContainer}>
      </div>
    </div>
  )
}

export default ProfileAnimal;