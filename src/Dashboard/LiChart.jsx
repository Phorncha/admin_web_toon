import React, {useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


function LiChart (){
const [cartoonsData, setCartoonsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(collectionRef);

      const cartoons = [];
      querySnapshot.forEach(doc => {
        // Get specific fields from the document
        const { id, title, score_action, score_comedy, score_fantasy, score_horror, score_romance } = doc.data();
        cartoons.push({ id, title, score_action, score_comedy, score_fantasy, score_horror, score_romance });
      });

      setCartoonsData(cartoons);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cartoons Data:</h1>
      <ul>
        {cartoonsData.map(cartoon => (
          <div key={cartoon.id}>
            Title: {cartoon.title} score_action: {cartoon.score_action}| |score_comedy: {cartoon.score_comedy}
            | |score_comedy: {cartoon.score_fantasy}| |score_comedy: {cartoon.score_horror}| |score_comedy: {cartoon.score_romance}
          </div>
        ))}
      </ul>
    </div>

    

  );

        }
export default LiChart
