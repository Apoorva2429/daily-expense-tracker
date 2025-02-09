import React, { useState } from 'react';
import { Input, Modal, Form, Select, message } from 'antd';
import Spinner from './Spinner';
import axios from 'axios';

function AddEditTransaction({showAddEditTransactionModal, setShowAddEditTransactionModal, selectedItemForEdit, setSelectedItemForEdit,  getTransactions}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
        const user = JSON.parse(localStorage.getItem('mymoney-user'));
        setLoading(true);
        if(selectedItemForEdit){
            const result = await axios.post('/api/transactions/edit-transaction', {
                payload: {
                    ...values,
                    userId: user._id
                },
                transactionId: selectedItemForEdit._id});
            message.success('Transaction Updated Successfully!');
            getTransactions();
        } else {
            const result = await axios.post('/api/transactions/add-transaction', {...values, userId: user._id});
            message.success('Transaction Added Successfully!');
            getTransactions();
        }
        setLoading(false);
        setShowAddEditTransactionModal(false);
        setSelectedItemForEdit(null);
    } catch (error) {
        message.error('Something went wrong!');
        setLoading(false);
    }
  }

    return (
        <Modal title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'} open={showAddEditTransactionModal} onCancel={() => {
            setShowAddEditTransactionModal(false);
        }} footer={false}>
            {loading && <Spinner></Spinner>}
            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
                <Form.Item label='Amount' name='amount'>
                    <Input type='text'></Input>
                </Form.Item>
                <Form.Item label='Type' name='type'>
                    <Select>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Category' name='category'>
                    <Select>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='freelance'>Freelance</Select.Option>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='entertainment'>Entertainment</Select.Option>
                        <Select.Option value='travel'>Travel</Select.Option>
                        <Select.Option value='shopping'>Shopping</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='investment'>Investment</Select.Option>
                        <Select.Option value='rent'>Rent</Select.Option>
                        <Select.Option value='medical'>Medical</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Date' name='date'>
                    <Input type='date'></Input>
                </Form.Item>
                <Form.Item label='Reference' name='reference'>
                    <Input type='text'></Input>
                </Form.Item>
                <Form.Item label='Description' name='description'>
                    <Input type='text'></Input>
                </Form.Item>

                <div className='d-flex justify-content-end'>
                    <button className="primary" type='submit'>SAVE</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditTransaction