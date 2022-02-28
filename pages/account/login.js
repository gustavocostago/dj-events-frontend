import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {FaUser} from 'react-icons/fa'
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/AuthForm.module.css'

export default function LoginPage() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login,error} = useContext(AuthContext)

  const handleSubmit = (e) =>{
    e.preventDefault()
    login({email,password})
  }
  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1><FaUser/> Login</h1>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password</label>
            <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <input type='submit' value='Login' className='btn'/>
        </form>
        <p>
          Don't have a account? <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  )
}