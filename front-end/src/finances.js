import React, { useState } from 'react';
import './finances.css';

// paid/requesting $[amount] to/from @user for [text]
function TransactionForm({ onSubmit }) {
    const [paidOrRequesting, setPaidOrRequesting] = useState('Paid');
    const [amount, setAmount] = useState('');
    const [toOrFrom, settoOrFrom] = useState('');
    const [user, setUser] = useState('@user');
    const [forWhat, setforWhat] = useState('purpose');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            paidOrRequesting,
            amount,
            toOrFrom,
            user,
            forWhat
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                <select value={paidOrRequesting} onChange={(event) => setPaidOrRequesting(event.target.value)}>
                    <option value="Paid">Paid</option>
                    <option value="Requesting">Requesting</option>
                </select>
            </label>
            <label>
                amount $
                <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
            </label>
            <label>
                <select value={toOrFrom} onChange={(event) => settoOrFrom(event.target.value)}>
                    <option value="to">to</option>
                    <option value="from">from</option>
                </select>
            </label>
            <label>
                <input type="text" value={user} onChange={(event) => setUser(event.target.value)} />
            </label>
            <label> for
                <input type="text" value={forWhat} onChange={(event) => setforWhat(event.target.value)} />
                .
            </label>
            <button type="submit">Add transaction</button>
        </form>
    )
}

function Finances() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };


    const [transactions, setTransactions] = useState([]);

    const handleAddTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
        setIsFormVisible(false);
    };

    return (
        <div className="page-body">
            <h1>Finances</h1>
            <TransactionList transactions={transactions} />
            <button onClick={handleButtonClick}>Add new transaction</button>
            {isFormVisible && (
                <div className="overlay">
                    <div className="form">
                        <TransactionForm onSubmit={handleAddTransaction} />
                    </div>
                </div>
            )}
        </div>
    );
}

function TransactionList({ transactions }) {
    return (
        <ul>
            {transactions.map((transaction, index) => (
                <li key={index}>
                    {transaction.paidOrRequesting} {transaction.amount} {transaction.toOrFrom} {transaction.user} {transaction.forWhat}
                </li>
            ))}
        </ul>
    );
}

export default Finances;