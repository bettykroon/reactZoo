import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeftLong, faFaceGrinStars, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Animal } from "../../models/Animal";
import "./AnimalInfo.css";

export function AnimalInfo(){
    const [isFed, setIsFed] = useState(false);

    const goBackIcon = faArrowLeftLong as IconProp;
    const happyIcon = faFaceGrinStars as IconProp;
    const sadIcon = faFaceSadTear as IconProp;

    let zoo: Animal[] = [];
    let animals = localStorage.getItem('animals') || '[]';
    zoo = JSON.parse(animals);
    
    let { name } = useParams();  

    let html = (<><FontAwesomeIcon icon={happyIcon}/> <span>I'm Happy</span></>);

    function fedAnimal(){
        console.log("MAAAAT");
        let data = JSON.parse(localStorage.getItem('animals') || '[]');
        for (let i = 0; i < data.length; i++) {
            if(name === data[i].name){
                data[i].isFed = true;
                data[i].lastFed = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
                setIsFed(true);
            }   
        }
        localStorage.setItem('animals', JSON.stringify(data));
    }

    function timeSinceFood(){
        let data = JSON.parse(localStorage.getItem('animals') || '[]');
        for (let i = 0; i < data.length; i++) {
            if(name === data[i].name){
                let hoursSinceFood = Date.parse(data[i].lastFed);
                let rightNow = (new Date()).valueOf();
                
                let hoursBetweenFood = ((rightNow - hoursSinceFood) / (1000 * 60 * 60));
                console.log("result", ((rightNow - hoursSinceFood) / (1000 * 60 * 60)));

                if(hoursBetweenFood > 3){
                    console.log("HUNGRY");
                    data[i].isFed = false;
                }

                if(hoursBetweenFood > 4){
                    html = (<><FontAwesomeIcon icon={sadIcon}/> <span>I'm Hungry</span></>);
                } 
            }   
        }
        localStorage.setItem('animals', JSON.stringify(data));
    }

    timeSinceFood();

    for (let i = 0; i < zoo.length; i++) {
        if(name === zoo[i].name){
            return (
                <>
                    <div className="button">
                        <button><Link className="backLink" to={"/"}><FontAwesomeIcon icon={goBackIcon}/></Link></button>
                    </div>
        
                    <div className="animals">
                        <div className="animal">
                            <div className="happyOrSad">{html}</div>
                            <h2>{zoo[i].name}</h2>
                            <img src={zoo[i].image} alt="" />
                            <p>{zoo[i].longDesc}</p>
                            <br />
                            <b>4 snabba:</b>
                            <p>Födelse år: {zoo[i].birthYear}</p>
                            <p>Namn på latin: {zoo[i].latinName}</p>
                            <p>Mediciner: {zoo[i].meds}</p>
                            <p>Blev matad senast: {zoo[i].lastFed}</p>
                            <br />

                            {!zoo[i].isFed && !isFed && <button className="foodBtn" onClick={fedAnimal}>Mata mig</button>}
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
    <>
    </>)

}