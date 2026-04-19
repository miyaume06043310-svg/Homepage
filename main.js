document.addEventListener('DOMContentLoaded', () => {

  /* ===== ヘッダー スクロール切り替え ===== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ===== ハンバーガーメニュー ===== */
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.global-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* ===== スムーズスクロール ===== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 72,
        behavior: 'smooth'
      });
      // モバイルナビを閉じる
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ===== ナビ アクティブ状態 ===== */
  const navLinks = document.querySelectorAll('.global-nav ul a');
  const sections = document.querySelectorAll('section[id]');

  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link =>
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
      );
    });
  }, { rootMargin: '-35% 0px -55% 0px' })
  .observe && sections.forEach(s =>
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link =>
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
        );
      });
    }, { rootMargin: '-35% 0px -55% 0px' }).observe(s)
  );

  /* ===== フェードインアニメーション ===== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.12}s`;
    observer.observe(el);
  });

  /* ===== コンタクトフォーム（デモ） ===== */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '送信しました。ありがとうございます。';
      btn.style.background = '#4a7c59';
      btn.style.boxShadow = 'none';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '送信する';
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

});
