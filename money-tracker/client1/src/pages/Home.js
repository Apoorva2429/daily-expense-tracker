import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css'
import { Input, Modal, Form, Select, message, Table } from 'antd';
import AddEditTransaction from '../components/AddEditTransaction';
import Spinner from '../components/Spinner';
import axios from 'axios';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState('table');
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('mymoney-user'));
      setLoading(true);
      const result = await axios.post('/api/transactions/get-all-transactions', {
        userId: user._id, frequency: frequency,
        ...(frequency == 'custom' && { selectedRange }),
        type: type
      });
      setTableData(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!')
    }
  }

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      const result = await axios.post('/api/transactions/delete-transaction', {
        transactionId: record._id
      });
      message.success('Transaction Deleted Successfully!');
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!')
    }
  }

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Reference",
      dataIndex: "reference"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return <div>
          <EditOutlined onClick={() => {
            setSelectedItemForEdit(record);
            setShowAddEditTransactionModal(true);
          }} />
          <DeleteOutlined className='mx-3' onClick={()=>deleteTransaction(record)}/>
        </div>
      }
    }
  ]


  return (
    <DefaultLayout>
      {loading && <Spinner></Spinner>}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom Range</Select.Option>
            </Select>

            {frequency == 'custom' && (
              <div className='mt-2'>
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)}></RangePicker>
              </div>
            )}
          </div>
          <div className='d-flex flex-column mx-5'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </div>
        </div>
        <div style={{ marginRight: '-600px' }}>
          <div className='d-flex'>
            <div>
              <div className="view-switch">
                <UnorderedListOutlined className={`mx-3 ${viewType === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => { setViewType('table') }} size={30} />
                <AreaChartOutlined className={`${viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => { setViewType('analytics') }} size={30} />
              </div>
            </div>
          </div>
        </div>
        <button className="primary" onClick={() => {
          setShowAddEditTransactionModal(true);
        }}>ADD NEW</button>
      </div>
      <div className="table-analytics" style={{ marginTop: '0.5rem' }}>
        {viewType === 'table' ? <div className="table">
          <Table columns={columns} dataSource={tableData}></Table>
        </div> : <Analytics transactions={tableData} />}
      </div>
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}>
        </AddEditTransaction>
      )}
    </DefaultLayout>
  )
}

export default Home

// render: (record)=><label>{moment(record.date).format('YYYY-MM-DD')}</label>