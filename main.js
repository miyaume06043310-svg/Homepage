document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.global-nav');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const navLinks = document.querySelectorAll('.global-nav ul a');
  const sections = document.querySelectorAll('section[id], .hero[id]');
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' }).observe && sections.forEach(s => new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' }).observe(s));

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); fadeObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = (i % 4 * 0.1) + 's';
    fadeObserver.observe(el);
  });

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '送信しました。ありがとうございます。';
      btn.style.background = '#6a9e6a';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = '送信する'; btn.style.background = ''; btn.disabled = false; form.reset(); }, 4000);
    });
  }

});
