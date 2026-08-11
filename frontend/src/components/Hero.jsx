import React from 'react'
import "./css/Hero.css"

function Hero() {
  return (
    <>
        <section className='hero'>
            <div className='hero-content'>
                <p className='hero-tag'>
                    DISCOVER • COMPARE • DRIVE
                </p>

                <h1>
                    Find Your Car That 
                    <span>Fit Your Journey</span>
                </h1>

                <p className="hero-description">
                    Explore Cars • Compare Specification • Find Right Vehicle For You • Drive Your Chooise
                </p>

                <div className='hero-actions'>
                    <button className='hero-primary-btn'>
                        Explore Cars
                    </button>

                    <button className='hero-secondary-btn'>
                        Compare Cars
                    </button>
                </div>
            </div>
            
        </section>
    </>
  )
}

export default Hero;