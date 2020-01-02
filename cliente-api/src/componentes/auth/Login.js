import React,{useState,useContext} from 'react';
import {withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {CRMContext} from '../../context/CRMContext';

const Login = (props) => {

    const {history} = props;
    const [auth,guardarAuth] = useContext(CRMContext);
    const [login, guardarLogin] = useState({
        email: '',
        password: ''
    });

    const leerDatos = e => {

        guardarLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const iniciarSesion = async e => {
        e.preventDefault();
  
        try{

            const usuarioLogueado = await clienteAxios.post('/iniciar-sesion',login);
            const {token} = usuarioLogueado.data;
            //almacenar el token en localstorage
            localStorage.setItem("token",token);
            
            guardarAuth({token, auth: true});
            
            history.push('/');

        }catch(err) {
           if(err.response){ //error generado por express
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: err.response.data.mensaje
                });
           }else{
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error'
                });
           }
        }
    }

    return ( 
        <div className="login">
            <h2>Iniciar Sesión</h2>
            <div className="contenedor-formulario">
                <form method="POST" onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Tu email" required onChange={leerDatos}/>
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Tu password" required onChange={leerDatos}/>
                    </div>
                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block"/>
                </form>
            </div>
        </div>       
    )
}

export default withRouter(Login);