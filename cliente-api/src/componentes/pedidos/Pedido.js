import React from 'react';
import ProductosPedido from './ProductosPedido';

const Pedido = (props) => {

	const {cliente, _id, pedido, total}  = props.pedido;
	
	return (

		<li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {_id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedidos: </p>
                    <ul>
                    	{
                    		pedido.map((articulo,i )=> (
                    			 <ProductosPedido
                    			 	key={i}
                    			 	pedido={articulo}
                    			 />
                    		))
                    	}
                    </ul>
                </div>
                <p className="total">Total: $ {total}</p>
            </div>
            <div className="acciones">
                <a href="#" className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Pedido
                </a>

                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
	);
}

export default Pedido;