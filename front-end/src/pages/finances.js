import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import '../css/finances.css';
import '../index.css';


// paid/requesting $[amount] to/from @user for [text]
function TransactionForm({ onSubmit }) {
    const [paidOrRequesting, setPaidOrRequesting] = useState('Paid');
    const [amount, setAmount] = useState('');
    const [toOrFrom, settoOrFrom] = useState('');
    const [user, setUser] = useState('@user');
    const [forWhat, setforWhat] = useState('purpose');
    const [date, setDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            paidOrRequesting,
            amount,
            toOrFrom,
            user,
            forWhat,
            date
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
            <label>for</label>
            <label>
                <input type="text" value={forWhat} onChange={(event) => setforWhat(event.target.value)} />
            </label>
            <label>on</label>
            <label>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
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

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            setIsFormVisible(false);
        }
    };

    const [transactions, setTransactions] = useState([]);

    const handleAddTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
        setIsFormVisible(false);
    };

    useEffect(() => {
        fetch('https://my.api.mockaroo.com/finances.json?key=8eff7c60')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="page-body">
            <div className='content'>
                <h1>Finances</h1>
                <TransactionList transactions={transactions} />
                <button className='button' onClick={handleButtonClick}>Add new transaction</button>
                {isFormVisible && (
                    <div className="overlay" onClick={handleOverlayClick}>
                        <div className="form">
                            <TransactionForm onSubmit={handleAddTransaction} />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

function TransactionList({ transactions }) {
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedTransactions = transactions.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    const handleSortByChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div>
            <div className="sort-by-container">
                <label htmlFor="sort-by">Sort by date: </label>
                <select id="sort-by" value={sortOrder} onChange={handleSortByChange}>
                    <option value="asc">ascending</option>
                    <option value="desc">descending</option>
                </select>
            </div>
            <ul>
                {sortedTransactions.map((transaction, index) => (
                    <li key={index}>
                        <div className='imessage'>
                            <p className='from-me'>
                                {transaction.paidOrRequesting} ${transaction.amount} {transaction.toOrFrom} {transaction.user} for {transaction.forWhat} on {transaction.date}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default Finances;