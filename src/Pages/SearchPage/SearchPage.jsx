import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AllProducts from '../../component/AllProducts/AllProducts';
import useFetchCollection from '../../Hooks/useFetchCollection';

const SearchPage = () => {
  const [searchedFood, setSearchedFood] = useState('');
  const { searchName } = useParams();
  const { foods } = useFetchCollection('foods');
  useEffect(() => {
    setSearchedFood(
      foods?.filter((food) =>
        food.title?.toLowerCase().includes(searchName.toLowerCase())
      )
    );
  }, [foods, searchName]);

  return (
    <div>
      <AllProducts foods={searchedFood} param={searchName} />
    </div>
  );
};

export default SearchPage;
