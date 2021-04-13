import React from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
        transition: background-color .3s ease;

    }
`;

const Formulario = () => {
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        {codigo: 'MXN', nombre: 'Peso mexicano' },
        {codigo: 'EUR', nombre: 'Euro' },
        {codigo: 'GBP', nombre: 'Libra esterlina' }
    ]

    //utilizar hook, useMoneda
    const [ moneda, SelectMonedas] = useMoneda('Elige moneda', "", MONEDAS); //se quita actualizarState, porque ya va a estar en el Hoock useMoneda

    return ( 
        <form>
            <SelectMonedas

            />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;