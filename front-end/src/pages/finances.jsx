import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../css/finances.css";
import "../index.css";
import axios from "axios";

// paid/requesting $[amount] to/from @user for [text]
function TransactionForm({ onSubmit }) {
  const [paidOrRequesting, setPaidOrRequesting] = useState("Paid");
  const [amount, setAmount] = useState("0");
  const [toOrFrom, settoOrFrom] = useState("to");
  const [user, setUser] = useState("@user");
  const [forWhat, setforWhat] = useState("purpose");
  const [date, setDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const transaction = {
      paidOrRequesting,
      amount,
      toOrFrom,
      user,
      forWhat,
      date,
    };
    if (
      !paidOrRequesting ||
      !amount ||
      !toOrFrom ||
      !user ||
      !forWhat ||
      !date
    ) {
      alert("Please complete all fields");
      return;
    }
    try {
      const response = await axios.post("/api/finances", transaction, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      });
      onSubmit(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-items">
        <div className="pay">
          <label>
            <select
              className="sendorreceive-field"
              value={paidOrRequesting}
              onChange={(event) => setPaidOrRequesting(event.target.value)}>
              <option value="Paid">Paid</option>
              <option value="Requesting">Requesting</option>
            </select>
          </label>
          <label>
            $
            <input
              className="amount-field"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </label>
        </div>
        <div className="user">
          <label>
            <select
              className="tofrom-field"
              value={toOrFrom}
              onChange={(event) => settoOrFrom(event.target.value)}>
              <option value="to">to</option>
              <option value="from">from</option>
            </select>
            <input
              type="text"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </label>
        </div>
        <label>
          for
          <input
            className="for-field"
            type="text"
            value={forWhat}
            onChange={(event) => setforWhat(event.target.value)}
          />
        </label>
        <div className="date">
          <label>
            on
            <input
              className="on-field"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            .
          </label>
        </div>
      </div>
      <button type="submit">Add transaction</button>
    </form>
  );
}

function Finances() {
  const jwtToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get("/api/protected/finances/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // do nothing
      })
      .catch((err) => {
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []);

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsFormVisible(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/finances", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const transactions = await response.json();
      setTransactions(transactions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    fetchTransactions();
    setIsFormVisible(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header title="Finances" />
          <div className="content">
            <div className="finances-page-content">
              <div className="transactionListContainer">
                <TransactionList transactions={transactions} />
              </div>
              <div className="addTransactionButton">
                <button className="button" onClick={handleButtonClick}>
                  +
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
      ) : (
        <Navigate to="/login?error=protected" />
      )}
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
        <label htmlFor="sort-by">Sort by date:</label>
        <select id="sort-by" value={sortOrder} onChange={handleSortByChange}>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <ul className="list">
        {sortedTransactions.map((transaction, index) => (
          <li key={index}>
            <p>
              {transaction.paidOrRequesting} ${transaction.amount}{" "}
              {transaction.toOrFrom} {transaction.user} for{" "}
              {transaction.forWhat} on{" "}
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Finances;
