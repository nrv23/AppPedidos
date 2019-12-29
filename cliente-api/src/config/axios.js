import axios from 'axios';

const clienteAxios = axios.create({ // configurar una url base
	baseURL: 'http://localhost:5000'
});


export default clienteAxios;