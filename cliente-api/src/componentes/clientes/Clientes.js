import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import Spinner from '../layout/Spinner';

const Clientes = () => {

	//declarar el state 
	const [clientes,guardarClientes] = useState([]);


	const consultarApi =  () => {

		clienteAxios.get('/clientes')
		.then(respuesta => {
			guardarClientes(respuesta.data);
		});
	}

	useEffect(() => {
		//dentro del hook useEffect no se debe ejecutar codigo plano, siempre funciones, es
		//una buena practica
		consultarApi();

		return () => {
			guardarClientes([]);
		}
	}, [guardarClientes]); // pasar un arreglo vacio cuando no hayan dependencias necesarias en useEffect
			// porque a veces useEffect se queda enciclado
			// este paso le envio como parametro el state de cliente, cuando esa de clientes  se cargue 
			// o se actualice, react renderiza de nuevo el componente

	if(!clientes.length) return <Spinner/>

	return (
		
		<Fragment>
			<h2>Clientes</h2>
			 <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
			 	<i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

			<ul className="listado-clientes">
				{clientes.map((cliente, i) => ( // doble parentesis significa un return implicito
					<Cliente 
						key={i}
						cliente={cliente}
					/>
				))}
			</ul>
		</Fragment>
	);
}


export default Clientes;