import React from 'react';

const ProductosPedido = ({pedido}) => {	

	return (
		
		<li>
            <p>{pedido.producto.nombre}</p>
            <p>Precio: $ {pedido.producto.precio}</p>
            <p>Cantidad: {pedido.cantidad}</p>
        </li>	
	)
}

export default ProductosPedido;