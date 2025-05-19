import React, { useState } from "react";
import Header from "../components/Header";
import { Cards } from "../components/Cards";
import "/home/aman/Desktop/React/finance-tracker/src/index.css";
import TransactionTable from "../components/TransactionTable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import StatisticGraph from "../components/StatisticGraph";
import PieChart from "../components/PieChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);

  return (
    <div>
      <Header />
      {user && (
        <div>
          <Cards
            transactions={transactions}
            setTransactions={(data) => setTransactions(data)}
          />
          <div className="charts">
            <StatisticGraph transactions={transactions} />
            <PieChart transactions={transactions} />
          </div>
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
