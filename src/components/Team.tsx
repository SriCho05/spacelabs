import React from 'react';
import InfiniteScroll from './InfiniteScroll';

const teamMembers = [
  { content: "Alice Johnson - Software Engineer" },
  { content: "Bob Smith - Product Manager" },
  { content: "Carol Lee - UX Designer" },
  { content: "David Kim - DevOps Engineer" },
  { content: "Eva Brown - QA Specialist" },
  { content: "Frank Wilson - Data Scientist" },
  { content: "Grace Chen - Frontend Developer" },
  { content: "Henry Davis - Backend Developer" },
  { content: "Ivy Martinez - Marketing Lead" },
  { content: "Jack White - Customer Success" },
  { content: "Karen Young - HR Manager" },
  { content: "Leo Scott - Business Analyst" },
  { content: "Mia Turner - Content Strategist" },
  { content: "Nina Patel - Graphic Designer" },
];

const Team = () => (
  <section id="team" className="snap-center flex-shrink-0 w-full min-h-screen flex items-center justify-center bg-black text-light relative overflow-hidden p-8">
    <div style={{ height: '500px', position: 'relative' }}>
      <InfiniteScroll
        items={teamMembers}
        isTilted={true}
        tiltDirection="left"
        autoplay={true}
        autoplaySpeed={0.1}
        autoplayDirection="down"
        pauseOnHover={true}
      />
    </div>
  </section>
);

export default Team;
