import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCat, faCrow, faDog, faHorse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Header(){
    const catIcon = faCat as IconProp;
    const dogIcon = faDog as IconProp;
    const horseIcon = faHorse as IconProp;
    const birdIcon = faCrow as IconProp;

    return (
        <>
            <header>
                <h1>Bettys Zoo</h1>
                <div className="icons">
                    <FontAwesomeIcon icon={catIcon} />
                    <FontAwesomeIcon icon={dogIcon} />
                    <FontAwesomeIcon icon={horseIcon} />
                    <FontAwesomeIcon icon={birdIcon} />
                </div>
            </header>
        </>
    )
}