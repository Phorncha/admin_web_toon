import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 

function Favorite() {

    const [valuesWithCounts, setValuesWithCounts] = useState([]);

    useEffect(() => {
      const fetchArrayValues = async () => {
        const collectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(collectionRef);
  
        const countByValue = {};
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const valuesArray = data['favorite']; // Replace 'your_array_field' with your actual array field name
  
          // Count occurrences of each value in the array
          valuesArray.forEach(value => {
            countByValue[value] = (countByValue[value] || 0) + 1;
          });
        });
  
        // Convert countByValue object to an array of objects with value and count properties
        const valuesWithCountsArray = Object.keys(countByValue).map(value => ({
          value,
          count: countByValue[value],
        }));
  
        setValuesWithCounts(valuesWithCountsArray);
      };
  
      fetchArrayValues();
    }, []);
  
    return (
      <ul className='main-container'>
        <ul className="main-title">
        <h1>DashBoard</h1>
         </ul>
            <ul className='card'>
              <ul className='color-card'>
          {valuesWithCounts.map(item => (
            <div key={item.value}>
              การ์ตูนรหัสเรื่อง: {item.value} | Count: {item.count}
            </div>
            
          ))}
    </ul>
          </ul>
          </ul>
       
            
            
        
     
    );


//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const collectionRef = collection(db, 'users');
//       const q = query(collectionRef, where('favorite', 'array-contains', 'RB'));

//       const querySnapshot = await getDocs(q);
//       const totalCount = querySnapshot.size;
//       setCount(totalCount);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>

//       <h1>Count: {count}</h1>
//     </div>
//   );
}

export default Favorite;

