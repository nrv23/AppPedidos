import React, {useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

const Clientes = () => {

	//declarar el state 
	const [clientes,guardarCliente] = useState([]);


	const consultarApi = async () => {

		const clientesAPI = await clienteAxios.get('/clientes');

		if(clientesAPI.data.length > 0){
			guardarCliente(clientesAPI.data);
		}
		
	}

	useEffect(() => {
		//dentro del hook useEffect no se debe ejecutar codigo plano, siempre funciones, es
		//una buena practica
		consultarApi();
	}, []); // pasar un arreglo vacio cuando no hayan dependencias necesarias en useEffect
			// porque a veces useEffect se queda enciclado

	return (
		
		<Fragment>
			<h2>Clientes</h2>
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