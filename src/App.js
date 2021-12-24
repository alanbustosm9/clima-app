import { useEffect, useState } from "react";
import { Clima } from "./components/Clima";
import { Error } from "./components/Error";
import { Formulario } from "./components/Formulario";
import { Header } from "./components/Header";


function App() {

  const [ busqueda, setBusqueda ] = useState({
    ciudad: '',
    pais: ''
  })
  
  const { ciudad, pais } = busqueda;
  
  const [ consultar, setConsultar ] = useState(false)

  const [ resultado, setResultado ] = useState({})

  const [ error, setError ] = useState(false)


  useEffect(() => {
    const consultarAPI = async () => {

      if ( consultar ) {
        const appId = 'e6659424126e885dd46a4dd31b590b40'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
  
        const respuesta = await fetch( url )
        const resultado = await respuesta.json()
  
        setResultado( resultado )   
        setConsultar( false )

        if ( resultado.cod === "404" ) {
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    consultarAPI()
    
  }, [ consultar, ciudad, pais ])

  let componente;
  if ( error ) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                  resultado={ resultado }
                />
  }

  


  return (
    <>
      <Header
        titulo='Clima App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={ busqueda }
                setBusqueda={ setBusqueda }
                setConsultar={ setConsultar }
              />
            </div>

            <div className="col m6 s12">
              { componente }
            </div>

          </div>
        </div>
      </div>

      
    </>
  );
}

export default App;
