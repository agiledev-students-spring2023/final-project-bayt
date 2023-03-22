import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/finances.css";
import "../index.css";

// paid/requesting $[amount] to/from @user for [text]
function TransactionForm({ onSubmit }) {
  const [paidOrRequesting, setPaidOrRequesting] = useState("Paid");
  const [amount, setAmount] = useState("");
  const [toOrFrom, settoOrFrom] = useState("");
  const [user, setUser] = useState("@user");
  const [forWhat, setforWhat] = useState("purpose");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      paidOrRequesting,
      amount,
      toOrFrom,
      user,
      forWhat,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        <select
          value={paidOrRequesting}
          onChange={(event) => setPaidOrRequesting(event.target.value)}
        >
          <option value="Paid">Paid</option>
          <option value="Requesting">Requesting</option>
        </select>
      </label>
      <label>
        amount $
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <label>
        <select
          value={toOrFrom}
          onChange={(event) => settoOrFrom(event.target.value)}
        >
          <option value="to">to</option>
          <option value="from">from</option>
        </select>
      </label>
      <label>
        <input
          type="text"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
      </label>
      <label>for</label>
      <label>
        <input
          type="text"
          value={forWhat}
          onChange={(event) => setforWhat(event.target.value)}
        />
      </label>
      <label>on</label>
      <label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        .
      </label>
      <button type="submit">Add transaction</button>
    </form>
  );
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
    setTransactions(finances_json);
  }, []);

  return (
    <>
      <Header title="Finances" />
      <div className="content">
        <div className="finances-page-content">
          <div className="transactionListContainer">
            <TransactionList transactions={transactions} />
          </div>
          <div className="addTransactionButton">
            <button className="button" onClick={handleButtonClick}>
              Add new transaction
            </button>
          </div>

          {isFormVisible && (
            <div className="overlay" onClick={handleOverlayClick}>
              <div className="form">
                <TransactionForm onSubmit={handleAddTransaction} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function TransactionList({ transactions }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedTransactions = transactions.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const handleSortByChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="finances-content">
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
            <div className="imessage">
              <p className="from-me">
                {transaction.paidOrRequesting} ${transaction.amount}{" "}
                {transaction.toOrFrom} {transaction.user} for{" "}
                {transaction.forWhat} on {transaction.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Finances;

let finances_json = [
  {
    paidOrRequesting: "Paid",
    amount: 68,
    toOrFrom: "from",
    user: "nunc",
    forWhat: "ut suscipit",
    date: "6/3/2022",
  },
  {
    paidOrRequesting: "Paid",
    amount: 25,
    toOrFrom: "to",
    user: "nibh",
    forWhat: "neque",
    date: "2/28/2023",
  },
  {
    paidOrRequesting: "Paid",
    amount: 45,
    toOrFrom: "from",
    user: "vitae",
    forWhat: "sit",
    date: "4/3/2022",
  },
  {
    paidOrRequesting: "Requesting",
    amount: 47,
    toOrFrom: "from",
    user: "mauris",
    forWhat: "auctor",
    date: "8/11/2022",
  },
  {
    paidOrRequesting: "Paid",
    amount: 59,
    toOrFrom: "from",
    user: "diam",
    forWhat: "nam tristique",
    date: "8/9/2022",
  },
  {
    paidOrRequesting: "Paid",
    amount: 90,
    toOrFrom: "from",
    user: "justo",
    forWhat: "sapien",
    date: "4/18/2022",
  },
  {
    paidOrRequesting: "Requesting",
    amount: 88,
    toOrFrom: "from",
    user: "eu",
    forWhat: "tempor",
    date: "8/31/2022",
  },
  {
    paidOrRequesting: "Paid",
    amount: 15,
    toOrFrom: "from",
    user: "maecenas",
    forWhat: "sapien",
    date: "2/4/2023",
  },
  {
    paidOrRequesting: "Paid",
    amount: 87,
    toOrFrom: "to",
    user: "consequat",
    forWhat: "aenean lectus",
    date: "1/25/2023",
  },
  {
    paidOrRequesting: "Paid",
    amount: 22,
    toOrFrom: "from",
    user: "hac",
    forWhat: "platea",
    date: "11/25/2022",
  },
];
