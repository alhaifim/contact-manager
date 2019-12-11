// this will be a form with a few fields so I am using useState hook to add a component level state
import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {setAlert} = alertContext;
    const {login, error, clearErrors, isAuthenticated } = authContext; // taking login function from AuthState
   
    useEffect(()=> {
        if(isAuthenticated){
            // to redirect in react we need to use props.history.push
            props.history.push('/');  // redirect to the homepage "dashboard"
        }
        
          if(error ==='Invalid Credentials'){
              setAlert(error, 'danger');
              clearErrors();
  
          }
         // eslint-disable-next-line 
      }, [error, isAuthenticated, props.history]); // we want this to run when the error is added to the state


    const [user, setUser] = useState({
        email:'',
        password: '' 
    });
    // lets destructure so that we can use them as variables
    const {email, password}= user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if(email==='' || password===''){
            setAlert('Please fill in all fields', 'danger');
        }else{
            login({
                email,
                password
            })
        }

    };
    return (
        <div className='form-container'>
        <h1>
        Account <span className='text-primary'>Login</span>
        </h1>
            <form onSubmit={onSubmit}>
                 <div className='form-group'>
                 <label htmlFor='email'>Email Address</label>
                 <input type='email' name='email' value={email} onChange={onChange} required/>
                 </div>
                 <div className='form-group'>
                 <label htmlFor='password'>Password</label>
                 <input type='password' name='password' value={password} onChange={onChange} required/>
                 </div>
                 <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
            
        </div>
    )
}
export default Login;