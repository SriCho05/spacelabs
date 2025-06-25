import React from 'react';
import DotGrid from './DotGrid';
import LetterGlitch from './LetterGlitch';

const Labs = () => (
	<section
		id="labs"
		className="snap-center flex-shrink-0 min-h-screen w-full flex items-center justify-center bg-[#10101a] text-light relative overflow-hidden"
	>
		{/* DotGrid background (now wrapped to only fill this section) */}
		<div className="absolute inset-0 w-full h-full pointer-events-none z-0">
			<DotGrid
				dotSize={14}
				gap={12}
				proximity={120}
				shockRadius={250}
				shockStrength={5}
				resistance={750}
				returnDuration={1.5}
			/>
		</div>
		{/* LetterGlitch background (already wrapped) */}
		<div className="absolute inset-0 w-full h-full pointer-events-none z-0">
			<LetterGlitch
				glitchSpeed={50}
				centerVignette={true}
				outerVignette={false}
				smooth={true}
			/>
		</div>
		<div className="flex gap-8 z-10">
			{labs.map((lab, i) => (
				<div
					key={lab.title}
					className="relative bg-[rgba(135,206,235,0.1)] backdrop-blur-lg border border-[rgba(135,206,235,0.2)] rounded-2xl p-8 w-72 h-60 flex flex-col items-center justify-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all group overflow-hidden"
				>
					{/* Animated gradient border ring */}
					<span className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-neongreen transition-all duration-500 z-10 animate-pulse" />
					<div className="mb-4 flex justify-center">{lab.icon}</div>
					<h4 className="font-rajdhani text-xl mb-2 text-neongreen text-center z-20 drop-shadow">
						{lab.title}
					</h4>
					<p className="text-center text-light/80 font-spacegrotesk text-sm z-20">
						{lab.desc}
					</p>
				</div>
			))}
		</div>
	</section>
);

export default Labs;
