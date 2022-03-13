import {User} from "../models/User.entity";

export const flipCoordinates = (coords: [number, number]): [number, number] => [coords[1], coords[0]]

export const flipCoordinatesArray = (coordArray: [number, number][]): [number, number][] => {
    return coordArray.map(duzinaSirina => flipCoordinates(duzinaSirina))
}

export const getUser = ():User => {
    return JSON.parse(localStorage.getItem('user')!);
}