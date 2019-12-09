// this will be a form with a few fields so I am using useState hook to add a component level state
import React, {useState} from 'react';

const Login = () => {
    const [user, setUser] = useState({
        email:'',
        password: ''

    });
    // lets destructure so that we can use them as variables
    const {email, password}= user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        console.log('Login Submit');
    }
    return (
        <div className='form-container'>
        <h1>
        Account <span className='text-primary'>Login</span>
        </h1>
            <form onSubmit={onSubmit}>
                 <div className='form-group'>
                 <label htmlFor='email'>Email Address</label>
                 <input type='email' name='email' value={email} onChange={onChange}/>
                 </div>
                 <div className='form-group'>
                 <label htmlFor='password'>Password</label>
                 <input type='password' name='password' value={password} onChange={onChange}/>
                 </div>
            </form>
            <input type="submit" value="Login" className="btn btn-primary btn-block"/>
        </div>
    )
}
export default Login;