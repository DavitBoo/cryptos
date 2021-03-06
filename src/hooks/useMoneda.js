import React, {Fragment, useState} from 'react';
//a pesar de ser un custom hook, las dependecias tipo @emotion pueden ser utilizadas.
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {

    //definir state de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select 
                onChange={ e =>  actualizarState(e.target.value)}
                value={state}
            >
                <option value="">- Seleccione -</option>
                {opciones.map(opcion => (<option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>))}
            </Select>
        </Fragment>
    );

    //retornar state, interfaz funcion que modifica el state
    return[state, Seleccionar]
}

export default useMoneda;