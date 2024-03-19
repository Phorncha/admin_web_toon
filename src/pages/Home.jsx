import React, { useEffect, useState } from 'react';
import './css/Home.css';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Favorite from '../Dashboard/Favorite';
import LiChart from '../Dashboard/LiChart';
import Income from '../Dashboard/Income';


function Home() {
  
  const isLoggedIn = localStorage.getItem('loggedInUsername');

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>             
            <Favorite/>
          <LiChart />
          <Income/>
          
        </>
      ) : (
        <>
          <h2>รายละเอียด</h2>
          <p>นี่เป็น project เกี่ยวกับการจัดการการ์ตูนบนเว็บไชต์</p>
          <p>เชื่อมต่อกับ Firebase เพื่อเก็บข้อมูลโดยใช้ React ในการเขียน</p>
          <p>โดยสามารถดูรายละเอียด เพิ่ม ลบ แก้ไข ข้อมูลต่างๆ ของการ์ตูนได้</p>
        </>
      )}
    </div>
  );
}

export default Home;
