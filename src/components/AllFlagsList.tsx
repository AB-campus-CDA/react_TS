import React from 'react';
import Loader from "./Loader";
import Selectable from "./Selectable";

type AllFlagsListProps = {
    data: CountryList | null;
    selectState: {list:CountryList, setter:React.Dispatch<React.SetStateAction<CountryList>>};
}

export type CountryList = {
    name: string;
    flagUrl: string;
}[]



export default function AllFlagsList({data, selectState}: AllFlagsListProps) {

    return (
        <div className={`border mar_lg halfV scrollable relative`}>
            <p className={`h2 pad_md sticky`}>Sélectionnez des pays :</p>

            {!data ? <Loader/> :
            <div className={`flexR wrap `}>
                {data.sort((a,b)=>a.name.localeCompare(b.name)).map((country)=> {
                    return (
                        <Selectable country={country} key={country.name} selectState={selectState} />
                    )
                } )}
            </div>
            }

        </div>
    )
}