import {useEffect, useState} from 'react'
import axios from "axios";

import AllFlagsList from "./components/AllFlagsList";
import SelectedField from './components/SelectedField';
import Validator from "./components/Validator";


export type APICountry = {
    name: {
        common: string
    };
    flags: {
        png: string
    };
}

export type Country = {
    name: string;
    flagUrl: string;
}


function App(): JSX.Element {
    const [data, setData] =                 useState< Country[] | null>(null)
    const [selected, setSelected] =         useState< Country[] >([])
    const [clearSignal, setClearSignal] =   useState<boolean>(false)
    const selectState = {list:selected, setter:setSelected}


    useEffect(()=> {
        if (!data) {
            console.log("fetching data ...")
            axios('https://restcountries.com/v3.1/all?fields=name,flags')
                .then((resp: any) => setData(resp.data.map((country: APICountry)=>{return {name: country.name.common, flagUrl: country.flags.png}})))
        }
    }, [])

    useEffect(()=> {
        if (clearSignal) {
            setClearSignal(false)
            setSelected([])
        }
    }, [clearSignal])


    return (
      <main className={`pad_xl relative full-screen`}>

          {/* title */}
          <p className={`flexR justif-center border mar_lg`}>
              {/* @ts-ignore */}
              <h1>LES {data?.length} PAYS DU MONDE</h1>
          </p>

          {/* list of all flags */}
          <AllFlagsList data={data} selectState={selectState} clearSignal={clearSignal} />

          {/* user selection */}
          <SelectedField selected={selected} />

          {/* validation block */}
          <Validator selected={selected} setClearSignal={setClearSignal}/>

      </main>
  )
}

export default App
