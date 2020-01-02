import React, {Fragment, useState, useEffect,useContext} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Producto from './Producto';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import {CRMContext} from '../../context/CRMContext';

const Productos = (props) => {

	const [productos,guardarProductos] = useState([]);
	const [auth] = useContext(CRMContext);

	const consultarApi = async () => {

		const productosAPI = await clienteAxios.get('/productos',{headers:{
			Authorization: 'Bearer '+auth.token
		}});

		guardarProductos(productosAPI.data.productos);
		
	}

	useEffect(() => {
		
		if(auth.auth){
			try {
				consultarApi();
	
				return () => { // esta funcion se debe correr siempre cada vez que se llene el state,
					//la funcion borra el los datos en la funcion de actualizar el state y hace un mejor 
					//manejo de memoria, y se debe pasar como parametro la funcion en las dependencias del 
					//useEffect
					guardarProductos([]);
				}
			} catch (error) {
				if(error.response.status === 500){ // si viene un token pero no valido o vencido,
					//redirecciona a iniciar sesion
					props.history.push('/iniciar-sesion')
				} 
			}
		}else{
			props.history.push('/iniciar-sesion');
		}


	},[guardarProductos]);

	if(!productos.length) return <Spinner/>; /*Cargar el spinner antes de cargar los productos*/

	return (
		
		<Fragment>
			<h2>Productos</h2>

            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> 
            	<i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
          	  	{productos.map((producto,i) => ( // para renderizar los componentes dentro de un ciclo
          	  		// siempre se debe usar el map porque devuelve un array por cada iteracion
  	               	<Producto
  	               		key={i}
  	               		producto={producto}
  	               	/>
  	            ))}
            </ul>
		</Fragment>
	);
}


export default withRouter(Productos);