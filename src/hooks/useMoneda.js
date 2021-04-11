import React, {Fragment, useState} from 'react';

const useMoneda = () => {

    //definir state de nuestro custom hook
    const [state, actualizarState] = useState('');

    const Seleccionar = () => (
        <Fragment>
            <label>Moneda</label>
            <select>
                <option value="MXN">Peso mexicano</option>
            </select>
        </Fragment>
    );

    //retornar state, interfaz funcion que modifica el state
    return[state, Seleccionar, actualizarState]
}

export default useMoneda;