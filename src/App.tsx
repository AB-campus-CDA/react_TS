import {useEffect, useState} from 'react'
import axios from "axios";
import AllFlagsList, {CountryList} from "./components/AllFlagsList";
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




function App() {
    const [data, setData] = useState(null)
    const [fetching, setFetching] = useState(false)
    const [modal, setModal] = useState(null)
    const [selected, setSelected] = useState<CountryList>([])

    const selectState = {list:selected, setter:setSelected}


    useEffect(()=> {
        if (!data && !fetching) {
            setFetching(true)
            console.log("fetching data ...")
            axios('https://restcountries.com/v3.1/all?fields=name,flags')
                .then((resp: any) => setData(resp.data.map((country: APICountry)=>{return {name: country.name.common, flagUrl: country.flags.png}})))
        }
    }, [])


    return (
      <main className={`pad_xl`}>

          {/* title */}
          <p className={`flexR justif-center border mar_lg`}>
              {/* @ts-ignore */}
              <h1>LES {data?.length} PAYS DU MONDE</h1>
          </p>

          {/* list of all flags */}
          <AllFlagsList data={data} selectState={selectState} />

          {/* user selection */}
          <SelectedField selected={selected} />

          {/* validation block */}
          <Validator selected={selected} />

      </main>
  )
}

export default App
