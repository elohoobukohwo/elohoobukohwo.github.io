/* ══════════════════════════════════════════════════
   ELOHO B. OBUKOHWO — Premium Dark Editorial JS
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Nav Scroll Behaviour ───
  const nav = document.getElementById('nav');
  let lastY = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Burger Toggle ───
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Scroll Reveal ───
  function initReveals() {
    const elements = document.querySelectorAll('.section-label, .section-title, .about__lead, .about__text p, .about__image, .pub-card, .venture-item, .essay-card, .pullquote__text, .contact__heading, .contact__subtext, .contact__links, .hero__kicker, .hero__name, .hero__manifesto, .hero__cta');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach((el, i) => {
      el.classList.add('reveal-up');
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      observer.observe(el);
    });
  }

  // ─── Hero Parallax Effect ───
  function initHeroParallax() {
    const heroImg = document.querySelector('.hero__photo');
    if (!heroImg) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${y * 0.08}px)`;
      }
    }, { passive: true });
  }

  // ─── Active Nav Link Tracking ───
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('nav__link--active',
              link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ─── Initialize ───
  document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initHeroParallax();
    initActiveNav();

    // Trigger initial scroll check
    onScroll();
  });

})();
