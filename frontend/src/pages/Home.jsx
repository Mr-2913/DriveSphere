import React from 'react';

import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import BrandSection from '../components/BrandSection';
import FeaturedCars from '../components/FeaturedCars';



function Home() {
  return (
    <>
    <Hero />

    <SearchBar/>

    <CategorySection/>
     
    <BrandSection/>


    <FeaturedCars/>   
    </>
  )
}

export default Home