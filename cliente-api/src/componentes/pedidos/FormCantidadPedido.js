import React from 'react';


const FormCantidadPedido = (props) => {

	const {producto,actualizarCantidad,index,eliminarProducto} = props;
	const {nombre, precio,cantidad} = props.producto;

	return (

	   	<li>
            <div className="texto-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus"
                    	onClick={() => actualizarCantidad(index,'MIN')}
                    ></i>
                    <p>{cantidad}</p>
                    <i className="fas fa-plus"
                    	onClick={() => actualizarCantidad(index,'SUM')}
                    ></i>
                </div>
                <button type="button" className="btn btn-rojo" onClick={() => eliminarProducto(index)}>
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
	)
}


export default FormCantidadPedido;