import React from 'react';
import ItemSection from '../FeaturedSection/ItemSection';

const MainSection = () => {
  return (
    <div
      className="w-full h-full
    bg-gradient-to-r 
   from-slate-800 to-slate-900 
   
   rounded-b-md shadow-xl shadow-gray-900 rounded-t-md"
    >
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <section
          className="w-full h-full shadow-sm shadow-gray-800  
        bg-gradient-to-r from-slate-800 to-slate-900   xsm:px-5 px-2 
        "
        >
          <ItemSection
            searchType={'category'}
            sectionHeading={'Our Most Populer Items'}
            featured={true}
          />
        </section>
        <section
          className="w-full h-full   
        bg-gradient-to-t from-orange-400 to-orange-300
        
        shadow-gray-800 drop-shadow-2xl shadow-md   xsm:px-5 px-2 "
        >
          <ItemSection
            itemType={'featured'}
            searchType={'drinkType'}
            sectionHeading={'Soft Drinks'}
            category={'drinks'}
            itemWeight={'(500ml)'}
          />
        </section>
        <section className="w-full h-full  bg-gradient-to-t from-orange-400 to-orange-300 shadow-gray-800 drop-shadow-2xl  shadow-md  xsm:px-5 px-2 ">
          <ItemSection
            itemType={'ice cream'}
            searchType={'category'}
            sectionHeading={'Ice Creams'}
            category={'ice cream'}
            itemWeight={'(250 gm)'}
          />
        </section>{' '}
        <section className="w-full h-full  bg-gradient-to-t from-orange-400 to-orange-300 shadow-gray-800 drop-shadow-2xl  shadow-md  xsm:px-5 px-2 ">
          <ItemSection
            itemType={'fruit'}
            searchType={'category'}
            sectionHeading={'Our Fruits'}
            category={'fruit'}
            itemWeight={'(1 kg)'}
          />
        </section>{' '}
        <section className="w-full h-full  bg-gradient-to-t from-orange-400 to-orange-300 shadow-gray-800 drop-shadow-2xl  shadow-md  xsm:px-5 px-2 ">
          <ItemSection
            itemType={'cooked food'}
            searchType={'category'}
            sectionHeading={'Cooked Foods'}
            category={'cooked food'}
            itemWeight={'(1 kg)'}
          />
        </section>{' '}
        <section className="w-full h-full  bg-gradient-to-t from-orange-400 to-orange-300 shadow-gray-800 drop-shadow-2xl  shadow-md  xsm:px-5 px-2 ">
          <ItemSection
            itemType={'meat'}
            searchType={'category'}
            sectionHeading={'Meat Items'}
            category={'meat'}
            itemWeight={'(1 kg)'}
          />
        </section>
      </div>
    </div>
  );
};

export default MainSection;
