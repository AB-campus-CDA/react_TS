import React from 'react';
import {CountryList} from "./AllFlagsList";
import Tag from "./Tag";


type SelectedFieldProps = {
    selected: CountryList;
}



export default function SelectedField({selected}: SelectedFieldProps) {

    return (
        <div className={`border mar_lg`}>
            <p className={`h2 pad_md`}>Votre sélection :</p>

            {selected.length ?
                <div className={`flexR wrap mar_md`}>
                    {selected.sort((a,b)=>a.name.localeCompare(b.name)).map((country)=> {
                        return (
                            <Tag country={country} />
                        )
                    } )}
                </div>
                : null
            }

        </div>
    )
}