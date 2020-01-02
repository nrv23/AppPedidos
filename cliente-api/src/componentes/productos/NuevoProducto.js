import React, {Fragment, useState,useContext} from 'react';
import {withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {CRMContext} from '../../context/CRMContext';

const NuevoProducto = (props) => {
	
	const {history} = props;
	const [auth] = useContext(CRMContext);
	const [producto, guardarProducto] = useState({
		nombre: '',
		precio: ''
	})

	//state para la iamgen
	const [imagen, guardarImagen] = useState('');

	const actualizarState = e => {
		guardarProducto({
			...producto,
			[e.target.name]: e.target.value 
		})
	}

	const leerArchivo = e => {

		guardarImagen(e.target.files[0]);
	}

	const agregarProducto = async e => {
		e.preventDefault();
		if(auth.auth){

		//crear el form data para enviar la imagen al servidor
			const formData = new FormData();// esto me permite enviar archivos al servidor
			formData.append('nombre',producto.nombre);
			formData.append('precio',producto.precio);
			formData.append('imagen',imagen);

			//al enviar el formData al servidor llega como req.body y la imagen como req.file

			try {
				
				const respuesta =  await clienteAxios.post('/productos',formData,{
					headers:{ // enviar la cabecera para que el servidor reciba el objeto con la imagen
						'Content-Type': 'multipart/form-data',
						Authorization: 'Bearer '+auth.token
					}
				});
				
				if(respuesta.status === 200){
					Swal.fire(
						'Agregar Producto',
						respuesta.data.mensaje,
						'success'
					)
					history.push('/productos');

				}

			} catch(error) {
				// statements
				console.log(error);
				if(error.response.status === 500){ // si viene un token pero no valido o vencido,
					//redirecciona a iniciar sesion
					props.history.push('/iniciar-sesion')
				} else{  
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Error al agregar el producto'
					})
				}
			}
		}else{
			props.history.push('/iniciar-sesion')
		}
	}

	return (
		
		<Fragment>

			<h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto} method="POST">
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" 
                    		name="nombre"
                    		onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" 
                    		step="0.01" placeholder="Precio" 
                    		onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>

		</Fragment>
	);
}


export default withRouter(NuevoProducto);