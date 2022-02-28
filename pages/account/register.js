import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {FaUser} from 'react-icons/fa'
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/AuthForm.module.css'

export default function LoginPage() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const {register,error} = useContext(AuthContext)
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(password !== passwordConfirm){
      toast.error('Passwords dont match!')
      return
    }
    register({username,email,password})
  }
  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1><FaUser/> Register</h1>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input type='text' name='username' id='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div>
            <label>Email</label>
            <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password</label>
            <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            <label>Confirm Password</label>
            <input type='password' name='passwordConfirm' id='passwordConfirm' value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)}/>
          </div>
          <input type='submit' value='Login' className='btn'/>
        </form>
        <p>
          Already have an account? <Link href='/account/login'>Login</Link>
        </p>
      </div>
    </Layout>
  )
}