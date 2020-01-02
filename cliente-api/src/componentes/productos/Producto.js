import React,{useContext} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {CRMContext} from '../../context/CRMContext';

const Producto = (props) => {

	const {_id, nombre, precio, imagen} = props.producto;
	const [auth] = useContext(CRMContext);

	const eliminarProducto = id => {

		if(auth.auth){
			
		Swal.fire({
			title: 'Está seguro?',
			text: 'El registro del producto no se podrá recuperar',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Borrar',
			cancelButtonText: 'Cancelar'
			}).then((result) => {
				if (result.value) {
					try {
						const url=`/productos/${_id}`;
						clienteAxios.delete(url,{
							headers: {
								Authorization: 'Bearer '+auth.token
							}
						})
						.then(respuesta => {	
							if(respuesta.status === 200){
								Swal.fire( 
								'Eliminado!',
								respuesta.data.mensaje,
								'success'
								)
							}
						})
					} catch (error) {
						if(error.response.status === 500){ // si viene un token pero no valido o vencido,
							//redirecciona a iniciar sesion
							props.history.push('/iniciar-sesion')
						}  
					}
				}
			})
		}else{
			props.history.push('/iniciar-sesion')
		}
	}

	return (		

	 	<li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                {
                	//al meter la etiqueta img dentro de dos parentesis, estoy indicando
                	// un return implicito
                	imagen ? ( <img src={`http://localhost:5000/${imagen}`} alt="imagen"/> ) : null
                }
            </div>
            <div className="acciones">
                <Link to={"/productos/editar/"+_id} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" 
                		onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
	);
}


export default withRouter(Producto);