import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import slugify from 'slugify';


export default function AddEventPage() {
    const [values,setValues] = useState({
        name: '',
        performers:'',
        venue:'',
        address:'',
        date:'',
        slug:'',
        description:''
    })
    const router = useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault()
        //Validação
        const hasEmptyFiels = Object.values(values).some((element)=> element === '')
        if(hasEmptyFiels){
            toast.error('Please fill in all fields')
        }
        const res = await fetch('http://localhost:1337/api/events',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({data:values})
        })
        if(!res.ok){
            toast.error('Something Went Wrong')
        }
        else{
            const evt = await res.json();
            router.push(`/events/${evt.data.attributes.slug}`)
        }
    }    
    const slug = slugify(values.name,{lower:true})
    const handleInputChange = (e) =>{        
        const {name,value} = e.target
        let updatedValue = {};    
        updatedValue = {"slug":slug};            
        setValues({...values,
            ...updatedValue,
            [name]:value})                 
    }    
  return (
    <Layout title='Add New Event'>
        <Link href='/events'>Go Back Home</Link>
        <h1>Add Event</h1>
        <ToastContainer position='top-center'/>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
            <div>
                <label htmlFor='name'>Event Name</label>
                <input
                type='text'
                id='name'
                name='name'
                value={values.name || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='performers'>Performers</label>
                <input
                type='text'
                name='performers'
                id='performers'
                value={values.performers || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='venue'>Venue</label>
                <input
                type='text'
                name='venue'
                id='venue'
                value={values.venue || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='address'>Address</label>
                <input
                type='text'
                name='address'
                id='address'
                value={values.address || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='date'>Date</label>
                <input
                type='date'
                name='date'
                id='date'
                value={values.date || ''}
                onChange={handleInputChange}
                />
            </div>
            </div>
            <div>
            <label htmlFor='description'>Event Description</label>
            <textarea
                type='text'
                name='description'
                id='description'
                value={values.description || ''}
                onChange={handleInputChange}
            ></textarea>
            </div>
            <button className='btn' type='submit'>Add Event</button>
        </form>
    </Layout>
  )
}
