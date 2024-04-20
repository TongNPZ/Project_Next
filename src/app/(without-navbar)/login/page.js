"use client"
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [token, setToken] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // สร้างข้อมูลที่จะส่งไปยัง API
            const data = {
                userEmail: email,
                userPassword: password,
                // rememberMe: rememberMe
            };
            // ทำการ POST ข้อมูลไปยัง API
            const response = await fetch('http://26.90.237.200:3000/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            // ตรวจสอบว่าส่งข้อมูลไปยัง API สำเร็จหรือไม่

            if (response.ok) {
                const responseData = await response.json();
                console.log('การเข้าสู่ระบบสำเร็จ');
                console.log(responseData);
                console.log(data);
                // ทำตามขั้นตอนต่อไปที่คุณต้องการ
            } else {
                console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
                console.log(data);

            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
        }
    };

    return (
        <div className='text-white' style={{ backgroundColor: '#47345F', minHeight: '100vh' }}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <h2 className='mt-5 mb-3 text-center'>Profile</h2>
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='formBasicEmail'>
                                    <Form.Label>อีเมลผู้ใช้</Form.Label>
                                    <Form.Control
                                        type='username'
                                        placeholder='ชื่อผู้ใช้'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Text className='text-white'>
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <br />
                                <Form.Group controlId='formBasicPassword'>
                                    <Form.Label>รหัสผ่าน</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='รหัสผ่าน'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <br />
                                <Form.Group controlId='formBasicCheckbox'>
                                    <Form.Check
                                        type='checkbox'
                                        label='จดจำรหัสผ่าน'
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                </Form.Group>
                                <br />
                                <button className='button' type='submit'>
                                    เข้าสู่ระบบ
                                </button>
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='mt-5 mb-3 text-center'>
                            <h1>
                                พวงเพชร 4
                            </h1>
                            <p>“พวกเพชร บ้านเลอค่าดุจอัญมณี”</p>
                            <h1>
                                จองได้แล้ววันนี้ !!!
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
