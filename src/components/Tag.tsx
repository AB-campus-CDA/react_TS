import React, {useState} from 'react';

type TagProps = {
    country: {
        name: string;
        flagUrl: string;
    };
}


export default function Tag({country}: TagProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    function handleHover() {
        setIsHovered(true)
    }

    return (
        <div className={`mini_card`}
             onMouseEnter={()=>handleHover()}
             onMouseLeave={()=>setIsHovered(false)}
        >
                <img src={country.flagUrl} alt={country.name} className={`mini_image ${isHovered ? 'hovered' : null}`}/>
        </div>
    )

}