import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="snap-center flex-shrink-0 w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#10101a] text-light relative overflow-hidden space-y-12 md:space-y-0 md:space-x-12 py-12">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deepviolet/20 to-techblue/10 animate-gradient pointer-events-none z-0" />
      {/* Animated orbit lines */}
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-pulse-slow">
        <ellipse cx="960" cy="540" rx="700" ry="300" stroke="#00f0ff22" strokeWidth="1.5" />
        <ellipse cx="960" cy="540" rx="500" ry="180" stroke="#7f00ff22" strokeWidth="1" />
      </svg>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl w-full max-w-md z-10 relative animate-fade-in">
        <input
          className="bg-black/60 text-light px-4 py-2 rounded w-full border border-techblue/30 focus:border-techblue outline-none transition"
          placeholder="Your Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="bg-black/60 text-light px-4 py-2 rounded w-full border border-techblue/30 focus:border-techblue outline-none transition"
          placeholder="Your Phone Number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <textarea
          className="bg-black/60 text-light px-4 py-2 rounded w-full border border-techblue/30 focus:border-techblue outline-none transition"
          placeholder="Message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        />        <button
          type="submit"
          disabled={status === 'loading'}
          className={`relative w-40 h-12 rounded-full font-bold font-rajdhani text-lg overflow-hidden transition-all duration-300 focus:outline-none group
            ${status === 'loading' ? 'bg-deepviolet cursor-wait' : status === 'success' ? 'bg-neongreen cursor-default' : 'bg-techblue hover:bg-deepviolet cursor-pointer'}
            border-2 border-techblue shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]
            ${status === 'success' ? 'border-neongreen shadow-[0_0_15px_rgba(186,255,201,0.3)]' : 
            status === 'loading' ? 'border-deepviolet shadow-[0_0_15px_rgba(127,0,255,0.3)]' : ''}`}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Normal State */}
            <div className={`flex items-center gap-2 transition-all duration-300 ${status !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
              <span>Send</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            {/* Loading State */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${status === 'loading' ? 'opacity-100' : 'opacity-0'}`}>
              <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            
            {/* Success State */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${status === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Hover Effect */}
          <div className="absolute inset-0 border-2 border-current rounded-full opacity-0 group-hover:opacity-30 group-hover:scale-105 transition-all duration-300" />
          
          {/* Background Pulse Effect */}
          <div className={`absolute inset-0 ${status === 'loading' ? 'animate-pulse bg-techblue/20' : ''}`} />
        </button>
        
        {/* Status Messages */}
        <div className="h-6 flex items-center justify-center">
          {status === 'error' && (
            <p className="text-red-400 font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Something went wrong. Try again.
            </p>
          )}
        </div>
      </form>
      {/* BirdScale Page Section */}
      <section className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl w-full max-w-md text-light z-10 relative animate-fade-in space-y-6">
        <h2 className="text-2xl font-bold">BirdScale Page</h2>
        <div className="space-y-4">
          <a href="https://birdscale.in" target="_blank" rel="noopener noreferrer" className="inline-block bg-techblue/70 text-white px-6 py-2 rounded-full font-bold font-rajdhani text-lg shadow-lg hover:bg-neongreen/70 transition">Visit BirdScale Technologies →</a>
        </div>
        <footer className="border-t border-white/20 pt-6 space-y-4">
          <div className="space-y-1">
            <p>Email: <a href="mailto:spacelabs@birdscale.in" className="text-techblue hover:underline">spacelabs@birdscale.in</a></p>
            <p>Phone: <a href="tel:+91XXXXXXXXXX" className="text-techblue hover:underline">+91-XXXX-XXXXXX</a></p>
          </div>
          <div className="flex gap-4">
            <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
              {/* WhatsApp Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.523.074-.797.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
            <a href="https://calendly.com/yourcalendlylink" target="_blank" rel="noopener noreferrer" aria-label="Calendly" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
              {/* Calendly Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00a2ff">
                <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 15H5V8h14v10zM5 6h14v1H5z"/>
                <path d="M12 10.5c-1.04 0-1.9.86-1.9 1.9s.86 1.9 1.9 1.9 1.9-.86 1.9-1.9-.86-1.9-1.9-1.9zm0 2.8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM8.5 12.4c0-1.04.86-1.9 1.9-1.9.21 0 .41.04.6.1l-.6.6c-.55.55-.55 1.44 0 1.99.28.28.65.44 1.04.44.39 0 .76-.16 1.04-.44l.6-.6c-.19.56-.74.94-1.34.94-1.04 0-1.9-.86-1.9-1.9zm7-1.9c.21 0 .41.04.6.1l-.6.6C14.45 11.75 14 12.52 14 13.3c0 .78.45 1.55 1.16 1.99l.6-.6c-.19.56-.74.94-1.34.94-1.04 0-1.9-.86-1.9-1.9s.86-1.9 1.9-1.9z" fill="#fff"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/birdscale" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0077b5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <a href="https://birdscale.in/careers" target="_blank" rel="noopener noreferrer" aria-label="Careers" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
              {/* Careers/Briefcase Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#baffc9">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
            </a>
          </div>
          <div className="flex gap-4 pt-4">
            <a href="https://birdscale.in/schedule-demo" target="_blank" rel="noopener noreferrer" className="text-techblue hover:underline font-semibold">Schedule Demo</a>
            <a href="https://birdscale.in/partner-with-us" target="_blank" rel="noopener noreferrer" className="text-techblue hover:underline font-semibold">Partner With Us</a>
            <a href="https://birdscale.in/join-avianpilot" target="_blank" rel="noopener noreferrer" className="text-techblue hover:underline font-semibold">Join AvianPilot</a>
          </div>
        </footer>
      </section>
      {/* Glassmorphic contact info or icons (optional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-10">
        <a href="mailto:hello@spacelabs.com" aria-label="Email" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#00f0ff22"/><path d="M6 8l6 5 6-5" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="8" width="12" height="8" rx="2" stroke="#baffc9" strokeWidth="2"/></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#7f00ff22"/><path d="M8 10v6" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round"/><circle cx="8" cy="8" r="1" fill="#baffc9"/><path d="M12 13v3m0-3a2 2 0 1 1 4 0v3" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round"/></svg>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 shadow-md hover:bg-white/20 transition">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#baffc922"/><path d="M12 17c-4 0-6-2-6-5.5 0-1.5 1-2.5 2.5-2.5.5 0 1 .2 1.5.5a5.5 5.5 0 0 1 5 0c.5-.3 1-.5 1.5-.5C19 9 20 10 20 11.5c0 3.5-2 5.5-6 5.5Z" stroke="#00f0ff" strokeWidth="2"/><circle cx="9" cy="13" r="1" fill="#baffc9"/><circle cx="15" cy="13" r="1" fill="#baffc9"/></svg>
        </a>
      </div>
    </section>
  );
};

export default Contact;
