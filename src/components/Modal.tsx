import React from 'react';


type ModalProps = {
    selfclose: () => void;
    children: string | JSX.Element;
    centered: boolean
}


export default function Modal({selfclose, children, centered}: ModalProps): JSX.Element {
    return (
        <div className={`modal ${centered ? " justif-center align-center" : null }`}
             onClick={() => selfclose()}>
            <div className={`content`}>
                {children}
            </div>
        </div>
    )

}