import React, { use } from 'react';
import '../resources/default-layout.css';
import { Button, Dropdown, Space } from 'antd';
import { useActionData, useNavigate } from 'react-router-dom';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('mymoney-user'));
  const navigate = useNavigate();
  const items = [
    {
      key: '1',
      label: (
        <Button style={{border: 'none'}}  onClick={() => {
          localStorage.removeItem('mymoney-user');
          navigate('/login');
        }}>Logout</Button>
      ),
    }
  ];
  return (
    <div className='layout'>
      <div className='header d-flex justify-content-between align-items-center'>
        <div>
          <h1 className='logo'>MY MONEY</h1>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <button className='primary'>{user.name}</button>
          </Dropdown>
        </div>
      </div>

      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout