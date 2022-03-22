import axios from "axios";
import { useEffect, useState } from "react";
import { Zoo } from "../components/zoo/Zoo";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";

export function Service(){
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        if(animals.length > 0) return;

        axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
        console.log(response.data);
        
        let animalsFromApi = response.data.map((animal: IAnimal) => {
            return new Animal(animal.id, animal.imageUrl, animal.isFed, animal.lastFed, animal.latinName, animal.longDescription, animal.medicine, animal.name, animal.shortDescription, animal.yearOfBirth);
        });

        setAnimals(animalsFromApi);
        });
    });

    localStorage.setItem('animals', JSON.stringify(animals));

    return (
    <>
        <Zoo></Zoo>
    </>)
}