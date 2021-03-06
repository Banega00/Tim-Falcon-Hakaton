import { SpeciesController } from './../api/species.controller';
import express from "express";
import { checkAuthenticated } from '../authorization/passport-configuration';

const router = express.Router()

const speciesController = new SpeciesController()

router.get("/species", speciesController.getAllSpecies)
router.get("/species/:id", speciesController.getSpeciesById)
router.delete("/species/:id", speciesController.deleteSpeciesById)

export const SpeciesRouter = router;