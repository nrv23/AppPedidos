import React, {useState,useEffect,useContext} from 'react';
import clienteAxios from '../../config/axios';
import Pedido from './Pedido';
import {CRMContext} from '../../context/CRMContext';
import Spinner from '../layout/Spinner';

const Pedidos = (props) => {

	const [pedidos,guardarPedidos] = useState([]);
	const [auth] = useContext(CRMContext);

	const consultarAPI = () => {
		clienteAxios.get('/pedidos',{
            headers: {
				Authorization: 'Bearer '+auth.token
			}
        })
		.then(respuesta => {

			const listaPedidos = respuesta.data.pedidos;
			guardarPedidos(listaPedidos);
			
		}).catch(err => console.error(err));
	}

	useEffect(() => {
		//consultarAPI();

		if(auth.token !== ''){ // se ha generado un token
			//dentro del hook useEffect no se debe ejecutar codigo plano, siempre funciones, es
		   //una buena practica
		   try {
   
				consultarAPI();
      
		   } catch (error) {
			   if(error.response.status === 500){ // si viene un token pero no valido o vencido,
				   //redirecciona a iniciar sesion
				   props.history.push('/iniciar-sesion')
			   }   
		   }
   
		  }else{
			props.history.push('/iniciar-sesion');
		  }
		
	},[guardarPedidos])

	if(pedidos.length < 1) return <Spinner/>

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