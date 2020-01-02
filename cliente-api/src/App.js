import React, {Fragment,useContext} from 'react';
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
import NuevoPedido from './componentes/pedidos/NuevoPedido';
import Login from './componentes/auth/Login';
import {CRMContext,CRMProvider} from './context/CRMContext';

function App() {

  //utilizar el context en los componentes

  const [auth,guardarAuth] = useContext(CRMContext); // obtener el state del context

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth,guardarAuth]}> {/*Usando el provider envio esos valores a todos
        los componentes*/}
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
                <Route exact path="/pedidos/nuevo" component={NuevoPedido}></Route>  
                <Route exact path="/pedidos" component={Pedidos}></Route>
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}></Route>  
                <Route exact path="/iniciar-sesion" component={Login}></Route>
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
