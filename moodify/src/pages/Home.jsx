import React from 'react';
import Hero from './Hero';
import WhyMoodBloom from './WhyMoodBloom';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import "./Home.css";

export default function Home({ userEmail }) {
  return (
    <div className="home-container">
      <h2 className='welcome' >Welcome, {userEmail.split('@')[0]} </h2>
      <Hero />
      <WhyMoodBloom />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
