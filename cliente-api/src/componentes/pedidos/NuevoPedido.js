import React,{useState,Fragment,useEffect,useContext} from 'react';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadPedido from './FormCantidadPedido';
import {CRMContext} from '../../context/CRMContext';

const NuevoPedido = (props) =>{

	const idcliente = props.match.params.id;
	const [cliente, guardarCliente] = useState({});
	const [busqueda, guardarBusqueda] = useState('');
	const [productos, guardarProductos] = useState([]); //lista de productos por pedido
	const [total, guardarTotal] = useState(0);
	const [auth] = useContext(CRMContext);

	const consultarAPI = () => {
		///pedidos/:id
		if(auth.token!== ''){
			try {
				clienteAxios.get('/clientes/'+idcliente,{
					headers: {
						Authorization: 'Bearer '+auth.token
					}
				})
				.then(response =>  {
					guardarCliente(response.data);
				});
			} catch (error) {
				if(error.response.status === 500){ // si viene un token pero no valido o vencido,
					//redirecciona a iniciar sesion
					props.history.push('/iniciar-sesion')
				} 
			}
		}else{
			props.history.push('/iniciar-sesion');
		}
	}

	const buscarProducto = e => {
		e.preventDefault();

		if(auth.auth){
			console.log('Bearer '+auth.token)
			try {
				const query = busqueda;
				const url ='/productos/busqueda/'+query;
				
				clienteAxios.post(url,{
					headers: {
						Authorization: 'Bearer '+auth.token
					}
				}).then(response => {
					if(response.data.mensaje){
						Swal.fire({
							type: 'error',
							title: 'Búsqueda',
							text: 'No hay resultados'
						})
					}else{

						let productoResultado = response.data[0];
						productoResultado.producto = response.data[0]._id; //agregar la llave producto (copia del id del producto)
						productoResultado.cantidad= 0;
						
						guardarProductos([...productos, productoResultado]);
					}
				})
			} catch (error) {
				if(error.response.status === 500){ // si viene un token pero no valido o vencido,
					//redirecciona a iniciar sesion
					props.history.push('/iniciar-sesion')
				} 
			}
		}else{
			props.history.push('/iniciar-sesion');
		}
	}	

	const leerDatosBusqueda = e =>{
		guardarBusqueda(e.target.value);
	}


	const actualizarCantidad = (index, tipo) => {
		
		const listaProductos = [...productos]; // spread operator para sacar copia del state

		if(tipo === 'SUM'){
		
			listaProductos[index].cantidad += 1
			guardarProductos(listaProductos)
		
		}else{
			
			if(listaProductos[index].cantidad === 0) return; // no puede bajar mas de 0
			listaProductos[index].cantidad -= 1
		}

		guardarProductos(listaProductos)
	}

	const actualizarTotal = () => {

		if(productos.length === 0){ // No hay productos cargados 
			guardarTotal(0);
			return;
		}
		
		let nuevoTotal = 0;
		productos.forEach(producto => nuevoTotal+= (producto.cantidad * producto.precio));

		guardarTotal(nuevoTotal);
	}

	const eliminarProducto = index => {
		const listaProductos = [...productos];
		 listaProductos.splice( index, 1 ); // tambien se puede usar .filter para filtrar por el id del elemento
		 guardarProductos(listaProductos);
	}

	const agregarPedido = e => {
		e.preventDefault();

		//crear el objeto del pedido a enviar a la bd

		if(auth.token !== ''){

			let listaProductos={};
			const {id} = props.match.params;
			const pedido ={
				cliente : id,
				pedido:  [],
				total
			}

			productos.forEach((producto,i) => {
				listaProductos[i] ={
					"producto": producto.producto,
					"cantidad": producto.cantidad
				}

				pedido.pedido.push(listaProductos[i]);
			})

			try {
				clienteAxios.post('/pedidos',pedido)
				.then(respuesta => {
					
					if(respuesta.status === 200){
						Swal.fire({
							type:'success',
							title: 'Nuevo Pedido',
							text: respuesta.data.mensaje
						})
						
					}else{
						Swal.fire({
							type:'error',
							title: 'Error',
							text: 'No se pudo agregar el pedido'
						})
					}

					props.history.push('/pedidos');
				})
			} catch(error) {
				if(error.response.status === 500){ // si viene un token pero no valido o vencido,
					//redirecciona a iniciar sesion
					props.history.push('/iniciar-sesion');
				} 
			}
		}else{
			props.history.push('/iniciar-sesion');
		}
	}

	useEffect(() => {
		consultarAPI();

		//actualizar totales

		actualizarTotal();
	}, [productos]);

	if(!cliente.nombre) return <Spinner/>

	const {nombre, apellido, telefono} = cliente;

	return (

		<Fragment>
			<h2>Nuevo Pedido</h2>
	            <div className="ficha-cliente">
	                <h3>Datos de Cliente</h3>
	                <p><b>Nombre:</b> {nombre} {apellido}</p>
	                <p><b>Teléfono:</b> {telefono}</p>
	            </div>
	            {/*Pasar funciones de un componente a otro por medio del props*/}
	            <FormBuscarProducto
        			buscarProducto={buscarProducto}
        			leerDatosBusqueda={leerDatosBusqueda}

	            />
	              	<ul className="resumen">
	                {
	                 	productos.map((producto,i) => ( 
	                 		<FormCantidadPedido
	                 			key={i}
	                 			producto = {producto}
	                 			actualizarCantidad={actualizarCantidad}
	                 			index={i}
	                 			eliminarProducto={eliminarProducto}
	                 		/>
	                 	))
	                }
	                </ul>
	               	<p className="total">Total a Pagar: <span>${total}</span></p>
	                
	                 {
	                 	(total > 0) ? (

	                 		<form
	                 			onSubmit={agregarPedido}
	                 		>
	                 			<input type="submit" className="btn btn-verde btn-block" value="Agregar Pedido"/>
	                 		</form>
	                 	): null
	                 }	                
		</Fragment>
	);
}

export default withRouter(NuevoPedido);