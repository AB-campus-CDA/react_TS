import React, {useEffect, useState} from 'react';
import {CountryList} from "./AllFlagsList";


type ValidatorProps = {
    selected: CountryList;
}

namespace Status {
    export const initialValue = "idle"
    export type possibleValues = "idle"|"validatable"|"sendable";
}

const btnCaption = {
    validatable: "Valider",
    sendable: "Envoyer"
}


export default function Validator({selected}: ValidatorProps) {
    const [validatorStatus, setValidatorStatus] = useState<Status.possibleValues>(Status.initialValue)
    const [requestValidation, setRequestValidation] = useState<boolean>(false)

    useEffect(() => {
        if (selected.length && validatorStatus === Status.initialValue) {
            setValidatorStatus("validatable")
        }
        if (selected.length === 0) {
            setValidatorStatus("idle")
        }
    }, [selected])


    function handleBtnClick() {
        if (validatorStatus === "validatable") {

        }
    }


    return (
        validatorStatus === Status.initialValue ? null :
            <div className={`border mar_lg`}>

                    <div className={`mar_md`}>
                        <button className={`pad_btn clickable`}
                                onClick={()=>handleBtnClick()}
                        >{btnCaption[validatorStatus]}</button>
                    </div>




            </div>
    )
}

function VerifiedEmail() {

    return (
        <input type="email"/>
    )
}