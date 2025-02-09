import { Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const result = await axios.post('/api/users/login', values);
            localStorage.setItem('mymoney-user', JSON.stringify({...result.data, password: ''}));
            setLoading(false);
            message.success('Log In Successfull')
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Login Failed')
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('mymoney-user')){
            navigate("/");
        }
    }, [])

    return (
        <div className='register'>
            {loading && <Spinner></Spinner>}
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>LOGIN</h1>
                        
                        <Form.Item label='Email' name='email'>
                            <Input>
                            </Input>
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input type='password'>
                            </Input>
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/register'>Not Registered Yet, Click Here To Register</Link>
                            <button className='secondary' type='submit'>LOGIN</button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-5">
                    <div className='lottie'>
                        <dotlottie-player
                            src="https://lottie.host/5718da78-f5a9-4904-ba6b-eec8f756a08d/ykRmywO9IX.lottie"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay
                        ></dotlottie-player>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login