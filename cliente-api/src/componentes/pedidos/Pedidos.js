import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Pedido from './Pedido';

const Pedidos = () => {

	const [pedidos,guardarPedidos] = useState([]);

	const consultarAPI = () => {
		clienteAxios.get('/pedidos')
		.then(respuesta => {
			guardarPedidos(respuesta.data.pedidos);
		}).catch(err => console.error(err));
	}

	useEffect(() => {
		consultarAPI();
	},[])

	return (
		<>
			<ul className="listado-pedidos">
            {
            	pedidos.map(pedido => (
            		<Pedido 
						key={pedido._id}
						pedido={pedido}
					/>
            	))
            }    
        	</ul>
		</>
	);
}


export default Pedidos;