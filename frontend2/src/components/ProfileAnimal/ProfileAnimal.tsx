import React, { useEffect, useState } from "react";
import styles from "./ProfileAnimal.module.scss";
import styles1 from "../SpeciesPage/SpeciesPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AnimalProfile } from "../../models/AnimalProfile.entity";
import { HttpService } from "../../utils/HttpService";
import { ResponseModel } from "../../models/ResponseModel";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { isAsyncFunction } from "util/types";
import chatIcon from "../../images/chat.png";
import slika from "../../images/falcon-logo-1.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getUser } from "../../utils/util-functions";
import { FaHeart } from "react-icons/fa";

const ProfileAnimal = () => {
  const navigate = useNavigate(); 
  
  let { id } = useParams(); //animalProfile/:id
  const [animalData, setAnimalData] = useState<AnimalProfile>(new AnimalProfile());
  useEffect(() => {
    if (id && +id) {
      HttpService.getAnimalData(id)
        .then(axiosResponse => {
          const response: ResponseModel = axiosResponse.data;
          setAnimalData(response.payload)
          console.log(response.payload);
        })
    }
  }, [])

  const isUserAlreadyFollow = () => {
    const loggedInUser = getUser()
    if (!loggedInUser) return false
    const bool = animalData?.users.some(user => user.id === loggedInUser.id)
    return bool;
  }

  const followAnimal = (event) => {
    event.target.classList.add('alreadyFollow')
    const user = getUser();
    if (user) {
      if (isUserAlreadyFollow()) return;
    } else {
      navigate('/login')
    }

    animalData && HttpService.followAnimal(animalData.id!);
    return true;
  }

  const [chatBot, setChatBot] = useState(false);
  const [chats, setChats] = useState([<></>])

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
        oldChats.push(<div className={styles.botResponse}>I eat {animalData.food}</div>);
        setChats(oldChats);
        break;
    }
  }

  return (
    <div className={styles1.container}>
      <div className={chatBot ? styles.overlay + " " + styles.active : styles.overlay}></div>
      <div className={styles1.main}>
      <div style={{top:'20px'}} className={isUserAlreadyFollow() ? styles1.followBtn + " " + styles1.alreadyFollow : styles1.followBtn}>
              {<FaHeart onClick={followAnimal} />}
            </div>
        <h1>{animalData.name}</h1>
        {/*<p><span style={{color: 'gray'}}>Species:</span> Sepcies</p>*/}
        <Carousel className={styles.carousel}>
          <div>
            {/*{animalData && <img className={styles.mainImg} src={require(`../../images/${animalData?.images[0]}`)} alt="" />}*/}
            {animalData && animalData.images && animalData.images[0] && <img src={require(`../../images/${animalData.images[0]}`)} />}
          </div>
          <div>
            {animalData && animalData.images && animalData.images[1] && <img src={require(`../../images/${animalData.images[1]}`)} />}
          </div>
        </Carousel>

      <MapContainer style={{width:'400px', height:'200px'}} center={[51.505, -0.09]} zoom={3}>
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          maxZoom={8}
        />
        <Marker position={animalData && animalData.geoData ? [animalData.geoData![1],animalData.geoData![0]]: [0,0]}>
          <Popup>
            {animalData && animalData.location }
          </Popup>
        </Marker>
      </MapContainer>
      </div>

      <a className={styles.chatIcon} onClick={() => {
        if (chatBot)
          setChatBot(false);
        else
          setChatBot(true);
      }}>
        <img src={chatIcon} />
      </a>
      <div className={chatBot ? styles.chatBotContainer + " " + styles.active : styles.chatBotContainer}>
        <div className={styles.myMessageSelector}>
          <button style={{fontSize:'1.2rem', padding:'7px'}} onClick={() => sendMessage("Hello!")}>Hello!</button>
          <button style={{fontSize:'1.2rem', padding:'7px'}} onClick={() => sendMessage("How old are you?")}>How old are you?</button>
          <button style={{fontSize:'1.2rem', padding:'7px'}} onClick={() => sendMessage("Where are you from?")}>Where are you from?</button>
          <button style={{fontSize:'1.2rem', padding:'7px'}} onClick={() => sendMessage("What do you eat?")}>What do you eat?</button>
          {chats}
        </div>
      </div>
    </div>
  )
}

export default ProfileAnimal;