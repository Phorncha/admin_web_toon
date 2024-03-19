import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../Dashboard/CSS/income.css';

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const incomeCollectionRef = collection(db, 'Income');
                const snapshot = await getDocs(incomeCollectionRef);

                const dataArr = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    dataArr.push(data);
                });
                setIncomeData(dataArr);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        fetchIncomeData();

    }, []);

    // Calculate income totals for each storyId
    const incomeTotals = incomeData.reduce((acc, curr) => {
        if (acc[curr.storyId]) {
            acc[curr.storyId].totalIncome += curr.amount;
            acc[curr.storyId].coin = curr.coin;
            acc[curr.storyId].title = curr.title;
        } else {
            acc[curr.storyId] = {
                totalIncome: curr.amount,
                coin: curr.coin,
                title: curr.title
            };
        }
        return acc;
    }, {});

    // Convert incomeTotals to an array
    const sortedIncome = Object.entries(incomeTotals).sort((a, b) => b[1].totalIncome - a[1].totalIncome);

    return (
        <div className="income-container">
            <div className="card">
                <div className="income-name">
                    <h1>INCOME</h1>
                </div>
                <div className="row">
                    <table className="color-card">
                        <div className="table-frame">
                            <table className="table">
                                
                                <thead>
                                    <tr>
                                        <th>Story ID</th>
                                        <th>Title</th>
                                        <th>Total Income</th>
                                        <th>Coin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedIncome.map(([storyId, { totalIncome, coin, title }], index) => (
                                        <tr key={index}>
                                            <td>{storyId}</td>
                                            <td>{title}</td>
                                            <td>{totalIncome}</td>
                                            <td>{coin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </table>
                    <ul className="card-Most-Income">
                        <div className="Most-Income">
                            <h1>Most Income</h1>
                        </div>

                        <ul className="card-data">
                            <thead>
                                <tr>
                                    <th>Story ID</th>
                                    <th>Title</th>
                                    <th>Coin</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {sortedIncome.length > 0 && (
                                    <tr>
                                        <td>{sortedIncome[0][0]}</td>
                                        <td>{sortedIncome[0][1].title}</td>
                                        <td>{sortedIncome[0][1].coin}</td>
                                    </tr>
                                )}
                            </tbody> */}
                        </ul>
                    </ul>

                </div>


               
            </div>
            {/* <div className="card">
                <div className="income-name">
                    <h1>Most Income</h1>
                </div>
                <ul className='color-card'>
                    {sortedIncome.length > 0 && (
                        <li>
                            <strong>Story ID:</strong> {sortedIncome[0][0]}<br />
                            <strong>Title:</strong> {sortedIncome[0][1].title}<br />
                            <strong>Total Income:</strong> {sortedIncome[0][1].totalIncome}<br />
                            <strong>Coin:</strong> {sortedIncome[0][1].coin}<br />
                        </li>
                    )}
                </ul>
            </div> */}
            {/* <div className="card">
                <div className="income-name">
                    <h1>Least Income</h1>
                </div>
                <ul className='color-card'>
                   
                    {sortedIncome.length > 0 && (
                        <li>
                            <strong>Story ID:</strong> {sortedIncome[sortedIncome.length - 1][0]}<br />
                            <strong>Title:</strong> {sortedIncome[sortedIncome.length - 1][1].title}<br />
                            <strong>Total Income:</strong> {sortedIncome[sortedIncome.length - 1][1].totalIncome}<br />
                            <strong>Coin:</strong> {sortedIncome[sortedIncome.length - 1][1].coin}<br />
                        </li>
                    )}
                </ul>
            </div> */}
        </div>
    );
};

export default Income;
