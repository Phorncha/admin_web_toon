import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';

import '../Dashboard/CSS/favorite.css'

const IncomeChart = () => {
    const [incomeData, setIncomeData] = useState([]);
    const getBarColor = (entry) => {
      // Example logic: apply gradient color for bars with value > 50
      return entry.value > 50 ? 'gradient-bar' : 'normal-bar';
  };

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const incomeCollectionRef = collection(db, 'Income');
                const snapshot = await getDocs(incomeCollectionRef);

                const dataArr = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    // Format timestamp to a readable format using moment.js
                    data.PurchaseTime = moment(data.PurchaseTime.toDate()).format('YYYY-MM-DD HH:mm:ss');
                    dataArr.push(data);
                });
                setIncomeData(dataArr);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        fetchIncomeData();

    }, []);

   
    return (
        <div className="income-container">
          
            <h1>Income Data</h1>
            <BarChart width={800} height={400} data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="storyId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="coin" fill="#E46C88" />
                
            </BarChart>
            </div>
    );
};

export default IncomeChart;
