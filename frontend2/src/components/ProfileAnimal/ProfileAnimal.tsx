import React, {useEffect, useState} from "react";
import styles from "./ProfileAnimal.module.scss";
import styles1 from "../SpeciesPage/SpeciesPage.module.scss";
import {useParams} from "react-router-dom";
import {AnimalProfile} from "../../models/AnimalProfile.entity";
import {HttpService} from "../../utils/HttpService";
import {ResponseModel} from "../../models/ResponseModel";

const ProfileAnimal = () => {
  let { id } = useParams(); //animalProfile/:id
  const [animalData, setAnimalData] = useState<AnimalProfile | undefined>(undefined);
  useEffect(()=>{
    if(id && +id){
      HttpService.getAnimalData(id)
        .then(axiosResponse => {
          const response:ResponseModel = axiosResponse.data;
          setAnimalData(response.payload)
          console.log(response);
        })
    }
  },[])
  return (
    <div className={styles1.container}>
      <div className={styles1.main}>
        asdf
      </div>
    </div>
  )
}

export default ProfileAnimal;