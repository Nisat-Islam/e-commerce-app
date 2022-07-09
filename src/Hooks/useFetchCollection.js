import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

import { db } from '../firebase/firebase.config';

const useFetchCollection = (c, _q) => {
  const [foods, setFoods] = useState([]);
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, c);
    if (q) {
      ref = query(ref, where(...q));
    }
    const fetcher = async () => {
      const unsub = await onSnapshot(ref, (snapshot) => {
        const foodItems = [];
        snapshot.docs.forEach((doc) =>
          foodItems.push({
            ...doc.data(),
            id: doc.id,
          })
        );

        setFoods(foodItems);
      });
      return () => unsub();
    };
    fetcher();
  }, [c, q]);

  return { foods };
};

export default useFetchCollection;
