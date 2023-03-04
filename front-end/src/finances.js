import React, { useState } from 'react';

function TransactionForm({ onSubmit }) {
    const [paidOrRequesting, setPaidOrRequesting] = useState('Paid');
    const [toOrFrom, setToOrFrom] = useState('@user');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            paidOrRequesting,
            toOrFrom,
            amount,
        });
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Paid/Requesting:
                <select value={paidOrRequesting} onChange={(e) => setPaidOrRequesting(e.target.value)}>
                    <option value="Paid">Paid</option>
                    <option value="Requesting">Requesting</option>
                </select>
            </label>
            <br />
            <label>
                To/From:
                <input type="text" value={toOrFrom} onChange={(e) => setToOrFrom(e.target.value)} />
            </label>

            <br />
            <label>
                Amount:
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Transaction</button>
        </form>
    );
}

function Finances() {
    const [transactions, setTransactions] = useState([]);

    const handleAddTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    return (
        <div>
            <h1>Finances</h1>
            <TransactionForm onSubmit={handleAddTransaction} />
            <TransactionList transactions={transactions} />
        </div>
    );
}

function TransactionList({ transactions }) {
    return (
        <ul>
            {transactions.map((transaction, index) => (
                <li key={index}>
                    {transaction.paidOrRequesting} {transaction.amount} {transaction.toOrFrom}
                </li>
            ))}
        </ul>
    );
}

export default Finances;