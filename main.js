document.addEventListener('DOMContentLoaded', () => {

  /* ===== ヘッダー スクロール影 ===== */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== スムーズスクロール ===== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // ヘッダー高さ
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
      // モバイルナビを閉じる
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== ナビゲーション アクティブ ===== */
  const navLinks = document.querySelectorAll('.global-nav ul a');
  const sections = document.querySelectorAll('section[id], .hero[id]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ===== モバイルハンバーガーメニュー ===== */
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.global-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // 背景スクロール防止
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* ===== フェードインアニメーション ===== */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach((el, i) => {
    // 同じグリッド内の子要素に時差アニメーションを付与
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    fadeObserver.observe(el);
  });

  /* ===== コンタクトフォーム（デモ） ===== */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '送信しました。ありがとうございます。';
      btn.style.background = '#6a9e6a';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '送信する';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

});
