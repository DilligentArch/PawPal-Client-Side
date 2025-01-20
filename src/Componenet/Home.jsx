import React from 'react';
import Banner from './Banner';
import PetCategorySection from './PetCategorySection';
import CallToAction from './CallToAction';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <PetCategorySection></PetCategorySection>
           <CallToAction></CallToAction>
        </div>
    );
};

export default Home;