import React, { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { CRMContext } from '../../context/CRMContext';

const EditarCliente = (props) => {

    //match obtiene todos los pàrametros que se envian por la URL
    const { id } = props.match.params; // obtengo el id que viene en la url
    const [auth] = useContext(CRMContext);

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        correo: '',
        telefono: ''
    });

    const buscarCliente = (id) => {

        clienteAxios.get('/clientes/' + id, {
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            }).then(respuesta => {
                datosCliente(respuesta.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => { // siempre se deben pasar en un array de dependencias todos los parametros
        // de cada funcion que se corran dentro del useEffect
        if (auth.token !== '') {
            try {
                buscarCliente(id);
            } catch (error) {
                if (error.response.status === 500) { // si viene un token pero no valido o vencido,
                    //redirecciona a iniciar sesion
                    props.history.push('/iniciar-sesion')
                }
            }
        } else {
            props.history.push('/iniciar-sesion')
        }
    }, [id]);

    const actualizarState = e => {

        datosCliente({
            ...cliente, // copia el state actual para no sobrescribir el state con lo ultimo escrito
            [e.target.name]: e.target.value
        });

        //mapea con el name de los campos en los campos del objeto de state para llenar el state
    }

    const validarCliente = () => {

        const { nombre, apellido, empresa, telefono } = cliente;
        let valido = !nombre.length || !apellido.length || !empresa.length || !telefono.length;
        //valido devuelve true si alguno de los campos esta vacio

        return valido;
    }

    const actualizarCliente = e => {
        e.preventDefault();

        if (auth.auth) {
            try {
                clienteAxios.put('/clientes/' + cliente._id, cliente, { //peticion post que envia headers al servidor
                        headers: {
                            Authorization: 'Bearer ' + auth.token
                        }
                    })
                    .then(respuesta => {
                        if (respuesta.data.code === 11000) {
                            //error de MOngo, correo duplicado
                            Swal.fire({
                                type: 'error',
                                title: 'Error',
                                text: 'El correo ya existe, inserte otro correo'
                            });

                        } else {

                            Swal.fire('Actualizar Cliente',
                                'Cliente actualizado',
                                'success');
                        }

                        props.history.push('/'); // redireccionar a clientes
                    })
            } catch (error) {
                if (error.response.status === 500) { // si viene un token pero no valido o vencido,
                    //redirecciona a iniciar sesion
                    props.history.push('/iniciar-sesion')
                }
            }
        } else {
            props.history.push('/iniciar-sesion');
        }
    }

    if (!auth.auth) {
        props.history.push('/iniciar-sesion');
    }
    return (

        <
        Fragment >
        <
        h2 > Editar Cliente < /h2> <
        form onSubmit = { actualizarCliente } >
        <
        legend > Llena todos los campos < /legend>

        <
        div className = "campo" >
        <
        label > Nombre: < /label> <
        input type = "text"
        placeholder = "Nombre Cliente"
        name = "nombre"
        onChange = { actualizarState }
        value = { cliente.nombre }
        /> <
        /div> <
        div className = "campo" >
        <
        label > Apellido: < /label> <
        input type = "text"
        placeholder = "Apellido Cliente"
        name = "apellido"
        onChange = { actualizarState }
        value = { cliente.apellido }
        /> <
        /div> <
        div className = "campo" >
        <
        label > Empresa: < /label> <
        input type = "text"
        placeholder = "Empresa Cliente"
        name = "empresa"
        onChange = { actualizarState }
        value = { cliente.empresa }
        /> <
        /div> <
        div className = "campo" >
        <
        label > Email: < /label> <
        input type = "email"
        placeholder = "Email Cliente"
        name = "correo"
        onChange = { actualizarState }
        value = { cliente.correo }
        /> <
        /div> <
        div className = "campo" >
        <
        label > Teléfono: < /label> <
        input type = "tel"
        placeholder = "Teléfono Cliente"
        name = "telefono"
        onChange = { actualizarState }
        value = { cliente.telefono }
        /> <
        /div> <
        div className = "enviar" >
        <
        input type = "submit"
        className = "btn btn-azul"
        value = "Guardar Cambios"
        disabled = { validarCliente() }
        /> <
        /div> <
        /form> <
        /Fragment>
    );
}


export default withRouter(EditarCliente);

//HOC High Order COmponent, es una funcion que toma un componente y devuelve otro

//withRouter es un HOC