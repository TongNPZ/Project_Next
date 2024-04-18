"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  return (
    <div className='text-white' style={{ backgroundColor: '#47345F', minHeight: '100vh' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h2 className='mt-5 mb-3 text-center'>Profile</h2>
            <div>
              <Form>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>อีเมลผู้ใช้</Form.Label>
                  <Form.Control type='email' placeholder='Enter email' />
                  <Form.Text className='text-white'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <br />
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>รหัสผ่าน</Form.Label>
                  <Form.Control type='password' placeholder='Password' />
                </Form.Group>
                <br />
                <Form.Group controlId='formBasicCheckbox'>
                  <Form.Check type='checkbox' label='จดจำรหัสผ่าน' />
                </Form.Group>
                <br />
                <Button variant='primary' type='submit'>
                  เข้าสู่ระบบ
                </Button>
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
