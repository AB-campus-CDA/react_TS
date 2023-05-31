import React, {useEffect, useState} from 'react';
import * as EmailValidator from 'email-validator';

import Modal from "./Modal";
import {Country} from "../App";


type ValidatorProps = {
    selected: Country[];
    setClearSignal: React.Dispatch<React.SetStateAction<boolean>>
}

namespace Status {
    export const initialValue = "idle"
    export type possibleValues = "idle"|"validatable"|"sendable";
}

namespace ValidatorEvents {
    export const emailIsValid = "emailIsValid"
    export const emailIsNotValid = "emailIsNotValid"
}

const btnCaption = {
    validatable: "Valider",
    sendable: "Envoyer"
}


export default function Validator({selected, setClearSignal}: ValidatorProps): JSX.Element | null {

    const [validatorStatus, setValidatorStatus] =       useState<Status.possibleValues>(Status.initialValue)
    const [requestValidation, setRequestValidation] =   useState<boolean>(false)
    const [email, setEmail] =                           useState<string | null>(null)
    const [modalMessage, setModalMessage] =             useState<string | null>(null)


    useEffect(() => {
        // subscribe to validator events
        document.addEventListener(ValidatorEvents.emailIsValid, (event: Event)=>{
            const customEv = event as CustomEvent<string>;
            setEmail(customEv.detail);
        })
        document.addEventListener(ValidatorEvents.emailIsNotValid, ()=>setEmail(null))

        if (selected.length && validatorStatus === Status.initialValue) {
            setValidatorStatus("validatable")
        }
        if (selected.length === 0) {
            setValidatorStatus("idle")
            setRequestValidation(false)
        }

        // unsubscribe to validator events
        return () => {
            document.removeEventListener(ValidatorEvents.emailIsValid, ()=>setEmail(null));
            document.removeEventListener(ValidatorEvents.emailIsNotValid, ()=>setEmail(null))
        }

    }, [selected])

    useEffect(() => {
        if (email) {
            setValidatorStatus("sendable")
        } else if (validatorStatus === "sendable") {
            setValidatorStatus("validatable")
        }
    }, [email])

    useEffect(() => {
        if (email && modalMessage === null) {
            setClearSignal(true)
            setValidatorStatus("idle")
            setEmail(null)
        }
    }, [modalMessage])


    function handleBtnClick() {
        if (validatorStatus === "validatable") {
            setRequestValidation(true)
        }
        if (validatorStatus === "sendable") {
            fakeSend()
            setTimeout(()=> {
                setModalMessage(null)
            }, 1500)
        }
    }

    function fakeSend() {
        setModalMessage("youpi !! consulte ta boite email pour voir la jolie liste de pays !!")
    }


    return (
        validatorStatus === Status.initialValue ? null :
            <div className={`border mar_lg flexR align-center relative`}>

                {!modalMessage ? null : <Modal
                    children={modalMessage} centered={true}
                    selfclose={() => setModalMessage(null)}/> }

                <div className={`mar_md`}>
                    <button className={`pad_btn clickable`}
                            onClick={()=>handleBtnClick()}
                    >{btnCaption[validatorStatus]}</button>
                </div>

                {!requestValidation ? null :
                    <div className={`flex-1`}>
                        <VerifiedEmail />
                    </div>
                }

            </div>
    )
}

function VerifiedEmail() {
    const [email, setEmail] = useState("")

    function handleChange(value: string) {
        setEmail(value)

        if (EmailValidator.validate(value)) {
            const emailIsValid = new CustomEvent<string>(ValidatorEvents.emailIsValid, {detail: value})
            document.dispatchEvent(emailIsValid)
        } else {
            const emailIsNotValid = new CustomEvent<string>(ValidatorEvents.emailIsNotValid)
            document.dispatchEvent(emailIsNotValid)
        }

    }

    return (
        <div>
            <label htmlFor="email">Entrez votre email :</label>
            <input type="email" id="email"
                   className={`pad_input maxInput`}
                   placeholder={'email@demo.lol'}
                   onChange={event => handleChange(event.target.value)}
                   value={email}
            />
        </div>
    )
}
