import React from 'react'
import '../resources/analytics.css'
import { Progress } from 'antd';

function Analytics({ transactions }) {
    console.log(transactions);
    const totalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income');
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length / totalTransactions) * 100;
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100;

    const categories = ['salary', 'freelance', 'food', 'entertainment', 'travel', 'shopping', 'education', 'investment', 'rent', 'medical'];

    return (
        <div className='analytics'>
            <div className="row">
                <div className="col-md-4 mt-2">
                    <div className="transactions-count">
                        <h4>Total Transactions : {totalTransactions}</h4>
                        <hr></hr>
                        <h5>Income : {totalIncomeTransactions.length}</h5>
                        <h5>Expense : {totalExpenseTransactions.length}</h5>

                        <div className='progress-bars'>
                            <Progress className='mx-5' strokeColor='#18af17' type='circle' percent={totalIncomeTransactionsPercentage.toFixed(0)}></Progress>
                            <Progress strokeColor='#e84a21' type='circle' percent={totalExpenseTransactionsPercentage.toFixed(0)}></Progress>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-2">
                    <div className="transactions-count">
                        <h4>Total Turnover : {totalTurnover}</h4>
                        <hr></hr>
                        <h5>Income : {totalIncomeTurnover}</h5>
                        <h5>Expense : {totalExpenseTurnover}</h5>

                        <div className='progress-bars'>
                            <Progress className='mx-5' strokeColor='#18af17' type='circle' percent={totalIncomeTurnoverPercentage.toFixed(0)}></Progress>
                            <Progress strokeColor='#e84a21' type='circle' percent={totalExpenseTurnoverPercentage.toFixed(0)}></Progress>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-md-6">
                    <div className="income-category-analysis">
                        <h4>Income - Category Wise</h4>
                        {categories.map((category)=>{
                            const amount = transactions.filter(t=>t.type==='income' && t.category===category).reduce((acc,t)=>acc+t.amount,0)
                           return (
                           amount>0 && <div className='category-card'>
                           <h5>{category}</h5>
                            <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}></Progress>
                            </div>)
                        })}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="income-category-analysis">
                        <h4>Expense - Category Wise</h4>
                        {categories.map((category)=>{
                            const amount = transactions.filter(t=>t.type==='expense' && t.category===category).reduce((acc,t)=>acc+t.amount,0)
                           return (
                           amount>0 && <div className='category-card'>
                           <h5>{category}</h5>
                            <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)}></Progress>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics;