import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-burger-builder-4b067.firebaseio.com/'
});

export default instance;