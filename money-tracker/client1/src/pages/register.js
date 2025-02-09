import { Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios';
import Spinner from '../components/Spinner'

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(true);
    const onFinish = async (values) => {
        try {
            setLoading(true);
            await axios.post('/api/users/register', values);
            setLoading(false);
            message.success('Registration successfull')
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong')
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
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish}>
                    <h1>REGISTER</h1>
                    
                        <Form.Item label='Name' name='name'>
                            <Input>
                            </Input>
                        </Form.Item>
                        <Form.Item label='Email' name='email'>
                            <Input>
                            </Input>
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input type='password'>
                            </Input>
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/login'>Already Registered, Click Here To Login</Link>
                            <button className='secondary' type='submit'>REGISTER</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register