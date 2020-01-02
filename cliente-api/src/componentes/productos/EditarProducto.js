import React,{useState, useEffect,  Fragment,useContext} from 'react';
import {withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {CRMContext} from '../../context/CRMContext';

const EditarProducto = (props) => {

	const {id}= props.match.params; // este id viene de la url

	const [producto, guardarProducto] = useState({
		nombre: '',
		precio: '',
		imagen: ''
	})
	const [auth] = useContext(CRMContext);
	const [imagen, guardarImagen] = useState('');

	const leerArchivo = e => {

		guardarImagen(e.target.files[0]);
	}

	const actualizarState = e => {
		guardarProducto({
			...producto,
			[e.target.name]: e.target.value 
		})
	}

	const consultarAPI = (id) => {
		
		const url='/productos/'+id;
		clienteAxios.get(url,{
			headers:{
				Authorization: 'Bearer '+auth.token
			}
		})
		.then(response => {
			guardarProducto(response.data.producto);
		});
	
	}

	const actualizarProducto = (e) => { 

		e.preventDefault();

		if(auth.auth){
			//crear el objeto formData con la imagen
			const formData = new FormData();// esto me permite enviar archivos al servidor
			formData.append('nombre',producto.nombre);
			formData.append('precio',producto.precio);
			formData.append('imagen',imagen);

			const url='/productos/'+id;
			try {
				clienteAxios.put(url,formData,{
					headers:{
						Authorization: 'Bearer '+auth.token
					}
				})
				.then(response => {
					if(response.status === 200){
						Swal.fire(
							'Actualizar Producto',
							'Producto actualizado',
							'success'
						)

						props.history.push('/productos');
					}
				});
			} catch(error) {
				// statements
				console.log(error);
				if (error.response.status === 500) { // si viene un token pero no valido o vencido,
					//redirecciona a iniciar sesion
					props.history.push('/iniciar-sesion')
				}else{
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Error al actualizar el producto'
					})
				}
			}
		}else{
			props.history.push('/iniciar-sesion')
		}
	}

	useEffect(() => {
		if(auth.auth){
			try {
				consultarAPI(id);
			} catch (error) {
				if (error.response.status === 500) { // si viene un token pero no valido o vencido,
                    //redirecciona a iniciar sesion
                    props.history.push('/iniciar-sesion')
                }
			}
		}else{
			props.history.push('/productos');
		}
	}, [id]);

	if(producto.nombre ==='') return <Spinner/>

	return (
		
		<Fragment>

			<h2>Editar Producto</h2>

            <form method="POST"
            	onSubmit={actualizarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" 
                    		name="nombre"
                    		onChange={actualizarState}
                    		defaultValue={producto.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" 
                    		step="0.01" placeholder="Precio" 
                    		onChange={actualizarState}
                    		defaultValue={producto.precio}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" 
                    	onChange={leerArchivo}
                    />
                </div>

               {
               		producto.imagen ? (

	               		<div className="campo">
		                    <label>Imagen Actual</label>
		                    <img 
		                    	src={"http://localhost:5000/"+producto.imagen} 
		                    	alt={producto.nombre}
		                    	width="200" height="200"
		                     />
	                	</div>
               	):
               	(
               		<p>No hay una imagen disponible</p>
               	)
               }

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>

		</Fragment>
	);
}


export default withRouter(EditarProducto);