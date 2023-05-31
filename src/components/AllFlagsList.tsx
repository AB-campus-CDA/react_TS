import React from 'react';
import Loader from "./Loader";
import Selectable from "./Selectable";
import {Country} from "../App";

type AllFlagsListProps = {
    data: Country[] | null;
    selectState: {list:Country[], setter:React.Dispatch<React.SetStateAction<Country[]>>};
    clearSignal: boolean;
}



export default function AllFlagsList({data, selectState, clearSignal}: AllFlagsListProps): JSX.Element {

    return (
        <div className={`border mar_lg halfV scrollable relative`}>
            <p className={`h2 pad_md sticky`}>Sélectionnez des pays :</p>

            {!data ? <Loader/> :
            <div className={`flexR wrap `}>
                {data.sort((a,b)=>a.name.localeCompare(b.name)).map((country)=> {
                    return (
                        <Selectable country={country} key={country.name} selectState={selectState} clearSignal={clearSignal} />
                    )
                } )}
            </div>
            }

        </div>
    )
}