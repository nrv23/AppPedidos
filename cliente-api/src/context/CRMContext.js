import React, { useState } from 'react';

const CRMContext = React.createContext([{}, () => {}]);

// el context se define dependiendo del tipo de valores que le voy a pasar, en este caso el state es 
// un array que tiene un objeto y una funcion que actualiza ese objeto

const CRMProvider = props => {
    const [auth, guardarAuth] = useState({ // este state simboliza el context 
        token: '', // al principio no hay token
        auth: false // al principio esta falso porque no hay un token verificado
    });

    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children /*este context va rodear toda la aplicacion por
            
            lo tanto se le pasa el props.children para poder pasarle este props a todos 
            los componentes de la aplicacion*/} 
        </CRMContext.Provider>
    )
}


export {CRMContext, CRMProvider};