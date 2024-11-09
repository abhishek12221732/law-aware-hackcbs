import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypeAnimationComponent = () => {
  return (
    <div className="animated-container">
      <TypeAnimation
        sequence={[
          'You will get kinich', 
          1000, 
          'are you sure?', 
          2000, 
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.5rem', color: 'black' }}
      />
    </div>
  );
};

export default TypeAnimationComponent;
