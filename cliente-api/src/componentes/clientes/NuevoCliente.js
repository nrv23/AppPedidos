import React, {Fragment, useState} from 'react';
import {withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const NuevoCliente = ({history}) => {

	const [cliente, guardarCliente] = useState({
		nombre: '',
		apellido: '',
		empresa: '',
		correo: '',
		telefono: ''
	});

	const actualizarState = e => {

		guardarCliente({
			...cliente,// copia el state actual para no sobrescribir el state con lo ultimo escrito
			[e.target.name]: e.target.value
		}); 

		//mapea con el name de los campos en los campos del objeto de state para llenar el state
	}

	const validarCliente = () => {

		const {nombre,apellido,empresa,correo,telefono} = cliente;
		let valido = !nombre.length || !apellido.length || !empresa.length || !telefono.length;
		//valido devuelve true si alguno de los campos esta vacio

		return valido;
	}

	const agregarCliente =  e => {
		e.preventDefault();

		clienteAxios.post('/clientes', cliente)
			.then(respuesta => {
				
				if(respuesta.data.code === 11000){
					//error de MOngo, correo duplicado
					Swal.fire({
						type: 'error',
						title: 'Error',
						text: 'El correo ya existe, inserte otro correo'
					});

				}else{

					Swal.fire('Nuevo Cliente',
							  respuesta.data.mensaje,
							  'success');
				}	

				history.push('/'); // redireccionar a clientes
			});
	}

	return (

		 <Fragment>
            <h2>Nuevo Cliente</h2>
				<form
					onSubmit={agregarCliente}
				>
	                <legend>Llena todos los campos</legend>

	                <div className="campo">
	                    <label>Nombre:</label>
	                    <input 
	                    	type="text" 
		                    placeholder="Nombre Cliente" 
		                    name="nombre"
		                    onChange={actualizarState}
		                />
	                </div>
	                <div className="campo">
	                    <label>Apellido:</label>
	                    <input 
	                    	type="text" 
	                    	placeholder="Apellido Cliente" 
	                    	name="apellido"
	                    	onChange={actualizarState}
	                    />
	                </div>
	                <div className="campo">
	                    <label>Empresa:</label>
	                    <input 
	                    	type="text" 
	                    	placeholder="Empresa Cliente" 
	                    	name="empresa"
	                    	onChange={actualizarState}
	                    />
	                </div>
	                <div className="campo">
	                    <label>Email:</label>
	                    <input 
	                    	type="email" 
	                    	placeholder="Email Cliente" 
	                    	name="correo"
	                    	onChange={actualizarState}
	                    />
	                </div>
	                <div className="campo">
	                    <label>Teléfono:</label>
	                    <input 
	                    	type="tel" 
	                    	placeholder="Teléfono Cliente" 
	                    	name="telefono"
	                    	onChange={actualizarState}
	                    />
	                </div>
	                <div className="enviar">
	                    <input 
	                    	type="submit" 
	                    	className="btn btn-azul" 
	                    	value="Agregar Cliente"
	                    	disabled={validarCliente()}
	                    />
	                </div>
	            </form>
        </Fragment>
	);
}


export default withRouter(NuevoCliente); //withRouter es un HOC

/*
	
	Nota: Hay etiquetas como img o input que no tienen cierre, al correr esecodigo en html normal
	 no hay problema pero jsx es exigente con los cierres de las etiquetas por lo tanto para 
	 etiquetas que no tiene cierre en jsx la etiqueta se le debe poner al final una barra 

	 <img />

	cuando una funcion se pasa con parentesis en algun evento en react la funcion se va ejecutar 
	de una vez al carga el componente pero si la funcion no se pasa con parentesis, el componente
	espera a que pase un evento para ejecutar la funcion

	onChange={actualizarState} -> espera a que se ejecute un evento para ejecutar la funcion
	disable={validarCliente()} -> se ejecuta de una vez
*/