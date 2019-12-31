import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Producto from './Producto';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

const Productos = () => {

	const [productos,guardarProductos] = useState([]);

	const consultarApi = async () => {

		const productosAPI = await clienteAxios.get('/productos');

		guardarProductos(productosAPI.data.productos);
		
	}

	useEffect(() => {
		consultarApi();
	},[productos]);

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


export default Productos;