import React, {useEffect, useState} from 'react';
import {Country} from "../App";

type SelectableProps = {
    country: {
        name: string;
        flagUrl: string;
    };
    selectState: {list:Country[], setter:React.Dispatch<React.SetStateAction<Country[]>>};
    clearSignal: boolean;
}


export default function Selectable({country, selectState, clearSignal}: SelectableProps) {
    const [isHovered, setIsHovered] =   useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    useEffect(()=> {
        setIsSelected(false)
    }, [clearSignal])

    function handleHover() {
        setIsHovered(true)
    }

    function handleClick() {
        if (isSelected) {
            setIsSelected(false)
            if (selectState.list.includes(country)) {
                // find and remove
                let index = selectState.list.indexOf(country)
                selectState.setter(selectState.list.slice(0,index).concat(selectState.list.slice(index+1)))
            }
        } else {
            setIsSelected(true)
            if (!selectState.list.includes(country)) {
                selectState.setter(selectState.list.concat([country]))
            }
        }
    }

    return (
        <div className={`country_card clickable ${isSelected ? ' selected ' : null} ${isHovered ? ' hovered ' : null}`}
             onMouseEnter={()=>handleHover()}
             onMouseLeave={()=>setIsHovered(false)}
             onClick={()=>handleClick()}
        >
            <div className={`flexC`}>
                <img src={country.flagUrl} alt={country.name} className={`card_image`}/>
                <p className={`legend ${isSelected ? ' selected ' : null} ${isHovered ? ' hovered ' : null}`}>{country.name}</p>
            </div>
        </div>
    )

}