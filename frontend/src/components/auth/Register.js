import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error) {
      if (error.username) {
        setAlert(error.username.join(), 'danger');
      }
      if (error.email) {
        setAlert(error.email.join(), 'danger');
      } else {
        setAlert('Undefined Error!', 'danger');
      }
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });

  const { username, email, password1, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      username === '' ||
      email === '' ||
      password1 === '' ||
      password2 === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password1 !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        username,
        password1,
        password2,
        email
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='userrname'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            required
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password1'>Password</label>
          <input
            type='password'
            name='password1'
            value={password1}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
