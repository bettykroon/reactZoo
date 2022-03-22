import { Link } from "react-router-dom";
import { Animal } from "../../models/Animal";
import "./Zoo.css";

export function Zoo(){
    let zoo: Animal[] = [];
    let animalsWhoNeedFood: Animal[] = [];

    let animalsInLS = localStorage.getItem('animals') || '[]';
    zoo = JSON.parse(animalsInLS);

    let lis = zoo.map((animal) => {
        return <Link className="links" to={`/animal/${animal.name}`} key={animal.id}>
            <li>
                <h2>{ animal.name }</h2>
                <img src={ animal.image } alt="" />
                <p>{animal.desc}</p> 
            </li>
        </Link>
    });

    function weNeedFood(){
        let data = JSON.parse(localStorage.getItem('animals') || '[]');
        for (let i = 0; i < data.length; i++) {
            //console.log(zoo[i].lastFed);
            let hoursSinceFood = Date.parse(data[i].lastFed);
            let rightNow = (new Date()).valueOf();
            
            let hoursBetweenFood = ((rightNow - hoursSinceFood) / (1000 * 60 * 60));
            //console.log("result", hoursBetweenFood);

            if(hoursBetweenFood > 4){
                console.log(data[i].name);
                animalsWhoNeedFood.push(data[i]);
                localStorage.setItem('needFood', JSON.stringify(animalsWhoNeedFood));
                console.log(animalsWhoNeedFood);
            }
        }
    }
    weNeedFood();

    let giveMeFood = animalsWhoNeedFood.map((hungryAnimal) => {
        return <Link className="links" to={`/animal/${hungryAnimal.name}`} key={hungryAnimal.id}>
                <li><h2>{ hungryAnimal.name }</h2></li>
            </Link>
    })
    
    return (
    <> 
        <ul>{lis}</ul>
        <h2>WE NEED FOOD</h2>
        <ul>{giveMeFood}</ul>
    </>)
}