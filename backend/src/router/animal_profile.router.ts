import { AnimalProfileController } from './../api/animal_profile.controller';
import express from "express";

const router = express.Router()

const animalProfileController = new AnimalProfileController()

router.get("/animalProfiles", animalProfileController.getAllAnimalProfiles)
router.get("/animalProfile/:id", animalProfileController.getAnimalProfileById)
router.delete("/animalProfile/:id", animalProfileController.deleteAnimalProfileById)

export const AnimalProfileRouter = router;