import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function PreambleSection() {
  useEffect(() => {
    const splitTypes = document.querySelectorAll('.highlight-text');
    splitTypes.forEach((char) => {
      const text = new SplitType(char, { types: 'words' });

      gsap.from(
        text.words,
        {
          color: '#69b578', // Highlight color for words
          scrollTrigger: {
            trigger: char,
            start: 'top 80%',
            end: 'top 70%',
            scrub: 1,
          },
          opacity: 0.7,
          stagger: 0.2,
        }
      );
    });
  }, []);

  return (
    <div className='text-3xl px-16  text-[#03254e] mb-20 '> {/* Light theme background and main text color */}
      <h1 className='highlight-heading text-center pt-10 text-[#011c27] font-bold merriweather-regular'>Preamble</h1>
      <p className='highlight-text mb-4 poppins-medium'>We, the people of India,</p>
      <p className='highlight-text mb-4 poppins-medium'>having solemnly resolved to constitute India into a </p>
      <p className='highlight-text mb-4 poppins-medium'>SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and</p>
      <p className='highlight-text mb-4 poppins-medium'>to secure to all its citizens:</p>
      <p className='highlight-text mb-4 poppins-medium'>JUSTICE, social, economic and political;</p>
      <p className='highlight-text mb-4 poppins-medium'>LIBERTY of thought, expression, belief, faith and worship;</p>
      <p className='highlight-text mb-4 poppins-medium'>EQUALITY of status and of opportunity;</p>
      <p className='highlight-text mb-4 poppins-medium'>and to promote among them all</p>
      <p className='highlight-text mb-4 poppins-medium'>FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;</p>
      <p className='highlight-text mb-4 poppins-medium'>IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.</p>
    </div>
  );
}

export default PreambleSection;
