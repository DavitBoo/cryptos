import React, {useEffect, useState} from 'react'; //useEffect para cuando el componente esté cargado
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';


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

const Formulario = ({guardarMoneda, guardaCriptomoneda}) => {
    //useState del listado de criptomonedas
    const [listacripto, guardaCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        {codigo: 'MXN', nombre: 'Peso mexicano' },
        {codigo: 'EUR', nombre: 'Euro' },
        {codigo: 'GBP', nombre: 'Libra esterlina' }
    ]

    //utilizar hook, useMoneda
    const [ moneda, SelectMonedas] = useMoneda('Elige moneda', "", MONEDAS); //se quita actualizarState, porque ya va a estar en el Hoock useMoneda
    

    //utilziar hook, useCriptomoneda
    const[criptomoneda, SelecCripto] = useCriptomoneda('Elige Criptomoneda', '', listacripto);

    //ejecutar llamada a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            // a diferencia de fetch, cuando haces consultas con axios es más sencillo

            const resultado = await axios.get(url);
            guardaCriptomonedas(resultado.data.Data);
            
        }
        consultarAPI();
    }, []); //solo vuelve a escribir si la propiedad dentro del array (segundo argumento) cambia

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si campos están llenos
        if(moneda === "" || criptomoneda === ""){
            guardarError(true);
            return;
        }
        //pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);  //le vamos a pasa el que cambia el state
        guardaCriptomoneda(criptomoneda); //le vamos a pasa el que cambia el state
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <SelectMonedas/>
            <SelecCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;