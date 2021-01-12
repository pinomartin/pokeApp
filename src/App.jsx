import { Pokemons } from "./components/Pokemons";
import { Provider } from 'react-redux'
//para que los componentes puedan leer la tienda es necesarios "envolverlos" en un provider

import generateStore from './redux/store'


function App() {

  const store = generateStore(); //funcion que devuelve el Store

  return (
    <div className="container mt-2">

      <Provider store={ store }>
        
        <Pokemons />

      </Provider>
    </div>

  );
}

export default App;
