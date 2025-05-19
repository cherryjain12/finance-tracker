import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import React, { useState, useEffect } from "react";
import { Row } from "antd";
import SingleCard from "./SingleCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import CommonModal from "./CommonModal";
import { toast } from "react-toastify";
import { collection, getDocs, query, addDoc } from "firebase/firestore";

export const Cards = ({ transactions, setTransactions }) => {
  const [user] = useAuthState(auth);
  const [isIncomeModalOpen, setIncomeModal] = useState(false);
  const [isExpenseModalOpen, setExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const evaluateBalance = () => {
    let addIncome = 0,
      addExpense = 0;
    transactions.map((trans) => {
      if (trans.type === "income") {
        addIncome = addIncome + trans.amount;
      } else {
        addExpense = addExpense + trans.amount;
      }
    });
    setIncome(addIncome);
    setExpense(addExpense);
    setBalance(addIncome - addExpense);
  };

  function addTrans(data) {
    addTransaction(user, data);
    data.type === "income" ? setIncomeModal(false) : setExpenseModal(false);
  }
  async function addTransaction(user, data) {
    try {
      if (!data.name || !data.amount || !data.date) {
        toast.error("fill out all fields");
        return;
      }
      await addDoc(collection(db, `users/${user.uid}/transactions`), data);
      toast.success("Transaction Added!");
      setTransactions((prev) => [...prev, data]);
    } catch (e) {
      toast.error("Couldn't add transaction");
    }
  }

  async function fetchTransactions() {
    try {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      // Get documents from Firestore
      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(transactions);
    } catch (error) {
      toast.error(`Error fetching transactions: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchTransactions();
    evaluateBalance();
  }, []);

  useEffect(() => {
    evaluateBalance();
  }, [transactions]);

  return (
    <>
      <Row className="cards-row">
        <SingleCard
          amount={balance}
          title="Current balance"
          btnText="Reset Balance"
          btnAction={() => setBalance(0)}
        />
        <SingleCard
          amount={income}
          title="Total Income"
          btnText="Add Income"
          btnAction={() => setIncomeModal(true)}
        />
        <SingleCard
          amount={expense}
          title="Total Expenses"
          btnText="Add Expense"
          btnAction={() => setExpenseModal(true)}
        />
        {isIncomeModalOpen && (
          <CommonModal
            title="Add Income"
            kind="income"
            isModalOpen={isIncomeModalOpen}
            cancelModal={() => setIncomeModal(false)}
            onClick={addTrans}
          />
        )}
        {isExpenseModalOpen && (
          <CommonModal
            title="Add Expense"
            kind="expense"
            isModalOpen={isExpenseModalOpen}
            cancelModal={() => setExpenseModal(false)}
            onClick={addTrans}
          />
        )}
      </Row>
    </>
  );
};
