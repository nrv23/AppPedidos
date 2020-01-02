import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link,withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import Spinner from '../layout/Spinner';
import {CRMContext} from '../../context/CRMContext'; // importar el context para poder obtener el token y consultar la API

const Clientes = (props) => {

    //declarar el state 
    const [clientes, guardarClientes] = useState([]);
    const [auth,guardarAuth] = useContext(CRMContext);
 
    const consultarApi = () => {

        clienteAxios.get('/clientes',{
            headers: {
                Authorization: 'Bearer '+auth.token
            }
        }).then(respuesta => {
            guardarClientes(respuesta.data);
        });
    }

    useEffect(() => {
       if(auth.token !== ''){ // se ha generado un token
         //dentro del hook useEffect no se debe ejecutar codigo plano, siempre funciones, es
        //una buena practica
        try {

            consultarApi();

            return () => {
                guardarClientes([]);
            }

        } catch (error) {
            if(error.response.status === 500){ // si viene un token pero no valido o vencido,
                //redirecciona a iniciar sesion
                props.history.push('/iniciar-sesion')
            }   
        }

       }else{
         props.history.push('/iniciar-sesion');
       }
    }, [guardarClientes]); // pasar un arreglo vacio cuando no hayan dependencias necesarias en useEffect
    // porque a veces useEffect se queda enciclado
    // este paso le envio como parametro el state de cliente, cuando esa de clientes  se cargue 
    // o se actualice, react renderiza de nuevo el componente

    if(!auth.auth){ props.history.push('/iniciar-sesion');}

	if(!clientes.length) return <Spinner/>

    return (

        <Fragment>
			<h2 > Clientes </h2> 
			<Link to = { "/clientes/nuevo" }
				className="btn btn-verde nvo-cliente" >
				<i className = "fas fa-plus-circle" > </i>
				Nuevo Cliente </Link>
			<ul className = "listado-clientes" > {
				clientes.map((cliente, i) => ( // doble parentesis significa un return implicito
					<Cliente 
						key={i}
						cliente={cliente}
					/>
				))
			} </ul> 
		</Fragment>
    );
}


export default withRouter(Clientes);