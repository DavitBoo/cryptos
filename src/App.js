import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';
import axios from 'axios';

 const Contenedor =  styled.div`
   max-width: 900px;
   margin: 0 auto;
   @media (min-width:992px){
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     column-gap: 2rem;
   }
 `;

 const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem;
 `;

 const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

    &::after {
      content: "";
      width: 150px;
      height: 6px;
      background-color: #66a2fe;
      display: block;
    }
 `;

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardaCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async() => {
      //evitamos la ejecución en el arranque
      if(moneda === '') return;
      
      //consultar la API para obtener cotizacioón
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`; 

      const resultado = await axios.get(url);

      //mostar spinner
      guardarCargando(true);
      
      //ocultar spinner y mostrar resultado
      setTimeout(() => {
        //cambiar el estado del spinner
        guardarCargando(false);

        //guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]); //con las variables dentro de los corchetes vamos a poder acceder dinamicamente a la respuesta del API
      },1500 );

      

    }
    cotizarCriptomoneda();
      
  }, [moneda, criptomoneda]);

  //mostrar spinnero resultado
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado} />

  return (
   <Contenedor>
     
      <div>
          <Heading>
              Estate al día del valor de tus cryptos
          </Heading>
          <Formulario
            guardarMoneda = {guardarMoneda}
            guardaCriptomoneda = {guardaCriptomoneda}
          />

          
      </div>
      <div>
        <Imagen
          src={imagen}
          alt="imagen crypto"
        />
        {componente}
      </div>
   </Contenedor>
  );
}

export default App;
