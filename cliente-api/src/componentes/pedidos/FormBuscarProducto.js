import React from 'react';

const FormBuscarProducto = (props) => {

	/*<> al pasar etiquetas de html sin nombrarlas, es basicamente como un fragment
		la etiqueta rodea todo pero react no la compila como una etiqueta de la estructura html
		 <h1>Hola</h1>
		</>*/


	return (

		<form method="POST"
			onSubmit={props.buscarProducto}
		>
            <legend>Busca un Producto y agrega una cantidad</legend>
            <div className="campo">
                <label>Productos:</label>
                <input type="text" placeholder="Nombre Producto" name="productos"
                	onChange={props.leerDatosBusqueda}
                />
            </div>
            <input type="submit" className="btn btn-azul btn-block" value="Buscar Producto"/>
        </form>
	)
}


export default FormBuscarProducto;