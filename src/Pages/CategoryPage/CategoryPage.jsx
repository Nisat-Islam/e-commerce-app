import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllProducts from '../../component/AllProducts/AllProducts';
import { db } from '../../firebase/firebase.config';

const CategoryPage = () => {
  const [foods, setFoods] = useState('');

  const { categoryName } = useParams();

  useEffect(() => {
    const ref = query(
      collection(db, 'foods'),

      where('category', '==', categoryName)
    );

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
  }, [categoryName]);

  return (
    <AllProducts
      queryField={'category'}
      foods={foods}
      param={categoryName}
      category={true}
    />
  );
};

export default CategoryPage;
