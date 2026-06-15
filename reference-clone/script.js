/* Rogue Pest Solutions — homepage recreation interactions */
(function () {
  'use strict'

  /* ---------------------------- Mobile menu ---------------------------- */
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobileMenu')
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const open = mobileMenu.hasAttribute('hidden')
      if (open) {
        mobileMenu.removeAttribute('hidden')
        hamburger.classList.add('is-open')
        hamburger.setAttribute('aria-expanded', 'true')
        document.body.style.overflow = 'hidden'
      } else {
        mobileMenu.setAttribute('hidden', '')
        hamburger.classList.remove('is-open')
        hamburger.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = ''
      }
    })
  }

  /* ------------------------- Services tabs ----------------------------- */
  const tabs = document.querySelectorAll('.tab')
  const panels = document.querySelectorAll('.panel')
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const key = tab.getAttribute('data-tab')
      tabs.forEach(function (t) {
        const active = t === tab
        t.classList.toggle('is-active', active)
        t.setAttribute('aria-selected', active ? 'true' : 'false')
      })
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === key)
      })
    })
  })

  /* ------------- Mega menu: keyboard + touch (hover is CSS) ------------ */
  const megaToggles = document.querySelectorAll('.nav__link--toggle')
  megaToggles.forEach(function (btn) {
    const item = btn.closest('.nav__item--has-mega')
    const mega = item && item.querySelector('.mega')
    if (!mega) return

    // Touch / click open-close (for devices without hover)
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      const isOpen = mega.classList.toggle('is-open')
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
      // close siblings
      document.querySelectorAll('.mega.is-open').forEach(function (m) {
        if (m !== mega) {
          m.classList.remove('is-open')
          const t = m.closest('.nav__item--has-mega').querySelector('.nav__link--toggle')
          if (t) t.setAttribute('aria-expanded', 'false')
        }
      })
    })
  })

  // Close any open mega menu when clicking outside or pressing Escape
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item--has-mega')) {
      document.querySelectorAll('.mega.is-open').forEach(function (m) {
        m.classList.remove('is-open')
        const t = m.closest('.nav__item--has-mega').querySelector('.nav__link--toggle')
        if (t) t.setAttribute('aria-expanded', 'false')
      })
    }
  })
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.mega.is-open').forEach(function (m) {
        m.classList.remove('is-open')
      })
    }
  })

  /* --------------- Testimonials: simple horizontal scroll -------------- */
  const grid = document.querySelector('.testi-grid')
  const navBtns = document.querySelectorAll('.testi-nav button')
  if (grid && navBtns.length === 2) {
    const step = 320
    navBtns[0].addEventListener('click', function () {
      grid.scrollBy({ left: -step, behavior: 'smooth' })
    })
    navBtns[1].addEventListener('click', function () {
      grid.scrollBy({ left: step, behavior: 'smooth' })
    })
  }
})()
