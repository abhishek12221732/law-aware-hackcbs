import React from 'react';
import Image11 from '../assets/images/image11.jpeg';
import Image12 from '../assets/images/image12.jpeg';
import Image13 from '../assets/images/image13.jpeg';
import Image14 from '../assets/images/image14.jpeg';
import Image15 from '../assets/images/image15.jpeg';
import Image16 from '../assets/images/image16.jpeg';
import Image17 from '../assets/images/image17.jpeg';
import Image18 from '../assets/images/image18.jpeg';
import Image19 from '../assets/images/image19.jpeg';
import Image20 from '../assets/images/image20.jpeg';
import Image21 from '../assets/images/image21.jpeg';
import Image22 from '../assets/images/image22.jpeg';
import Image23 from '../assets/images/image23.jpeg';
import '../styles/customScrollbar.css'; 

const Sidebar = () => {
  return (

    <aside className="w-full md:w-1/4 bg-[#B8D8F3] p-4 rounded-lg shadow-lg custom-scrollbar" style={{ maxHeight: '470vh', overflowY: 'auto' }}>

      <h3 className="text-lg font-bold text-[#333]">Parents' Corner</h3>
      <div className="mt-4">
        {[Image11, Image12, Image13, Image14, Image15, Image16, Image17, Image18, Image19, Image20, Image21, Image22, Image23].map((image, index) => (
          <div key={index} className={`w-full ${index % 2 === 0 ? 'mb-4' : ''}`}>
            <img src={image} alt={`Image ${index + 1}`} className="w-full object-cover" />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
