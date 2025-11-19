.partners {
  padding: 4rem 0;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(15px);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  overflow: hidden;
  max-width: 1600px;
  margin: 0 auto;
}

.partners-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.marquee {
  overflow: hidden;
  width: 100%;
}

.marquee-content {
  display: flex;
  gap: 2rem;
  width: max-content;
  animation: scroll-left linear infinite;
  will-change: transform; /* GPU-accelerated */
}

.marquee-right .marquee-content {
  animation: scroll-right linear infinite;
}

@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0%   { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

.partner-logo {
  flex-shrink: 0;
  width: 200px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.85;
  transition: opacity 0.3s ease;
}

.partner-logo img:hover { opacity: 1; }

.marquee:hover .marquee-content { animation-play-state: paused; }

/* Responsive scaling */
@media (max-width: 768px) { 
  .partner-logo { width: 140px; height: 50px; }
}

@media (max-width: 480px) { 
  .partner-logo { width: 110px; height: 40px; }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) { 
  .marquee-content { animation: none !important; }
}
