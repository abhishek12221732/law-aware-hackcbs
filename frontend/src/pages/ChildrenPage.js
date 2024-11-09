import React from 'react';
import HeroSection from '../components/HeroSection';
import AnimatedVideos from '../components/AnimatedVideos';
import SafetyScenarios from '../components/SafetyScenarios';
import HelpMeUnderstand from '../components/HelpMeUnderstand';
import WhoCanHelpMe from '../components/WhoCanHelpMe';
import LawsForKids from '../components/LawsForKids';
import Sidebar from '../components/Sidebar';

function ChildrenPage() {
  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 pt-20 bg-[#FFF7E6] text-[#333]">
      <HeroSection />
      <div className="w-full md:w-1/3 space-y-6">
        <AnimatedVideos />
        <SafetyScenarios />
        <HelpMeUnderstand />
        <WhoCanHelpMe />
        <LawsForKids />
      </div>
      <Sidebar />
    </div>
  );
}

export default ChildrenPage;
