// we need to check if a token is passed in, if yes we set it to the global header if not then we will delete it.
import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;  // x-auth-token is a key we used to send the token
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}
export default setAuthToken;
