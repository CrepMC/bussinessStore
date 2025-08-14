// AdminLogin page placeholder
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, password }));
    if (res.meta.requestStatus === 'fulfilled') {
      localStorage.setItem('token', res.payload.token);
      nav('/admin');
    } else alert('Login fail');
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto' }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={submit}>
        <input
          id='admin-email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          id='admin-password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button>Login</button>
      </form>
    </div>
  );
}
