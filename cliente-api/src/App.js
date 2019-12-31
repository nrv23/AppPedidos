import React, {Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';
import Clientes from './componentes/clientes/Clientes';
import Productos from './componentes/productos/Productos';
import Pedidos from './componentes/pedidos/Pedidos';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import EditarCliente from './componentes/clientes/EditarCliente';
import NuevoProducto from './componentes/productos/NuevoProducto';
import EditarProducto from './componentes/productos/EditarProducto';

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9"> 
            {/*/Routing del sistema*/}
            <Switch>
              <Route exact path="/" component={Clientes}></Route>
              <Route exact path="/clientes/nuevo" component={NuevoCliente}></Route>
              <Route exact path="/clientes/editar/:id" component={EditarCliente}></Route>
              <Route exact path="/productos" component={Productos}></Route>
              <Route exact path="/productos/nuevo" component={NuevoProducto}></Route>
              <Route exact path="/productos/editar/:id" component={EditarProducto}></Route> 

              <Route exact path="/pedidos" component={Pedidos}></Route>

            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
