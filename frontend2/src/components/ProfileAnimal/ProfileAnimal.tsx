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
import {isAsyncFunction} from "util/types";
import chatIcon from "../../images/chat.png";
import slika from "../../images/falcon-logo-1.png";

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
  const[chats, setChats] = useState([<></>])

  const sendMessage = (message) => {
    console.log("yo?")
    let oldChats = [...chats];
    switch (message) {
      case "Hello!":
        oldChats.push(<div className={styles.myQuestion}><p>{message}</p></div>);
        oldChats.push(<div className={styles.botResponse}>Hello there!</div>);
        setChats(oldChats);
        break;
      case "How old are you?":
        oldChats.push(<div className={styles.myQuestion}>{message}</div>);
        oldChats.push(<div className={styles.botResponse}>I'm {animalData.monthsOld} months old.</div>);
        setChats(oldChats);
        break;
      case "Where are you from?":
        oldChats.push(<div className={styles.myQuestion}>{message}</div>);
        oldChats.push(<div className={styles.botResponse}>I'm from {animalData.location}</div>);
        setChats(oldChats);
        break;
      case "What do you eat?":
        oldChats.push(<div className={styles.myQuestion}>{message}</div>);
        oldChats.push(<div className={styles.botResponse}>I eat food.</div>);
        setChats(oldChats);
        break;
    }
  }

  return (
    <div className={styles1.container}>
      <div className={chatBot ? styles.overlay + " " + styles.active : styles.overlay}></div>
      <div className={styles1.main}>
        <h1>{animalData.name}</h1>
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

        <div className={styles1.organizations}>
          <h1>Help me, save me.</h1>
          <div className={styles1.organization}>
            <img src={slika}/>
            <h1>Company name</h1>
            <button>Donate here!</button>
          </div>
          <div className={styles1.organization}>
            <img src={slika}/>
            <h1>Company name</h1>
            <button>Donate here!</button>
          </div>
          <div className={styles1.organization}>
            <img src={slika}/>
            <h1>Company name</h1>
            <button>Donate here!</button>
          </div>
        </div>
      </div>

      <a className={styles.chatIcon} onClick={() => {
        if (chatBot)
          setChatBot(false);
        else
          setChatBot(true);
      }}>
        <img src={chatIcon}/>
      </a>
      <div className={chatBot ? styles.chatBotContainer + " " + styles.active : styles.chatBotContainer}>
        <div className={styles.myMessageSelector}>
          <button onClick={() => sendMessage("Hello!")}>Hello!</button>
          <button onClick={() => sendMessage("How old are you?")}>How old are you?</button>
          <button onClick={() => sendMessage("Where are you from?")}>Where are you from?</button>
          <button onClick={() => sendMessage("What do you eat?")}>What do you eat?</button>
          {chats}
        </div>
      </div>
    </div>
  )
}

export default ProfileAnimal;