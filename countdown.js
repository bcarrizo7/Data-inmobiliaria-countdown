/**
 * DATAINMOBILIARIA.CL - COUNTDOWN SCRIPT
 * Elegant countdown timer with animations
 * Launch Date: February 1, 2026 - Santiago, Chile Time (CLST)
 */

(function () {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    // Launch date: February 1, 2026 at 00:00:00 Santiago, Chile time
    // Chile uses UTC-3 in summer (CLST) and UTC-4 in winter (CLT)
    // February 1 is during summer time (CLST = UTC-3)
    const LAUNCH_DATE = new Date('2026-02-01T00:00:00-03:00');

    // DOM Elements
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        particles: document.getElementById('particles'),
        subscribeForm: document.getElementById('subscribeForm'),
        emailInput: document.getElementById('emailInput')
    };

    // ============================================
    // COUNTDOWN LOGIC
    // ============================================

    /**
     * Calculate remaining time until launch
     * @returns {Object} Object containing days, hours, minutes, seconds
     */
    function getTimeRemaining() {
        const now = new Date();
        const diff = LAUNCH_DATE - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
        }

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds, total: diff };
    }

    /**
     * Format number to always show 2 digits
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    /**
     * Update countdown display with animation
     */
    function updateCountdown() {
        const time = getTimeRemaining();

        // Check if countdown is complete
        if (time.total <= 0) {
            showLaunchMessage();
            return;
        }

        // Update each element with flip animation on change
        updateElement(elements.days, formatNumber(time.days));
        updateElement(elements.hours, formatNumber(time.hours));
        updateElement(elements.minutes, formatNumber(time.minutes));
        updateElement(elements.seconds, formatNumber(time.seconds));
    }

    /**
     * Update element with animation if value changed
     * @param {HTMLElement} element - Element to update
     * @param {string} newValue - New value to display
     */
    function updateElement(element, newValue) {
        if (!element) return;

        if (element.textContent !== newValue) {
            // Add animation class
            element.classList.add('flip');
            element.textContent = newValue;

            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('flip');
            }, 300);
        }
    }

    /**
     * Show launch message when countdown completes
     */
    function showLaunchMessage() {
        const container = document.querySelector('.countdown-container');
        if (container) {
            container.innerHTML = `
                <div class="launch-live">
                    <span class="launch-live-icon">🚀</span>
                    <span class="launch-live-text">¡Ya estamos en línea!</span>
                    <a href="https://datainmobiliaria.cl" class="launch-live-btn">Explorar ahora</a>
                </div>
            `;

            // Add styles for launch message
            const style = document.createElement('style');
            style.textContent = `
                .launch-live {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 2rem;
                    animation: fadeInUp 0.8s ease-out;
                }
                
                .launch-live-icon {
                    font-size: 4rem;
                    animation: bounce 1s ease-in-out infinite;
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                
                .launch-live-text {
                    font-size: 2rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .launch-live-btn {
                    padding: 1rem 2.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 100px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                }
                
                .launch-live-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================
    // PARTICLES ANIMATION
    // ============================================

    /**
     * Create floating particles
     */
    function createParticles() {
        if (!elements.particles) return;

        const particleCount = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    /**
     * Create a single particle
     */
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position and timing
        const left = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        particle.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;

        elements.particles.appendChild(particle);
    }

    // ============================================
    // FORM HANDLING
    // ============================================

    /**
     * Handle subscription form submission
     * @param {Event} e - Submit event
     */
    function handleSubscribe(e) {
        e.preventDefault();

        const email = elements.emailInput?.value;
        if (!email) return;

        // Show success animation
        const btn = elements.subscribeForm?.querySelector('.subscribe-btn');
        if (btn) {
            const originalContent = btn.innerHTML;
            btn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>¡Registrado!</span>
            `;
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            // Reset after delay
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                elements.emailInput.value = '';
            }, 3000);
        }

        // Here you would typically send the email to your backend
        console.log('Email subscribed:', email);
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Initialize all components
     */
    function init() {
        // Start countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Create particles
        createParticles();

        // Setup form handler
        if (elements.subscribeForm) {
            elements.subscribeForm.addEventListener('submit', handleSubscribe);
        }

        // Add flip animation styles
        const style = document.createElement('style');
        style.textContent = `
            .countdown-number.flip {
                animation: flipIn 0.3s ease-out;
            }
            
            @keyframes flipIn {
                0% {
                    transform: perspective(400px) rotateX(90deg);
                    opacity: 0;
                }
                100% {
                    transform: perspective(400px) rotateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        console.log('Datainmobiliaria.cl - Countdown initialized');
        console.log('Launch date:', LAUNCH_DATE.toLocaleString('es-CL', { timeZone: 'America/Santiago' }));
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
