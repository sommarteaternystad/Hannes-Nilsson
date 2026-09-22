document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Service card -> jump to contact form with type preselected
const typeSelect = document.getElementById('ftype');
document.querySelectorAll('[data-scroll-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-scroll-type');
    if (typeSelect) typeSelect.value = type;
    document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('fname')?.focus(), 500);
  });
});

// Contact form -> open prefilled email in the user's own mail client
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const type = (data.get('type') || '').toString().trim();
  const date = (data.get('date') || '').toString().trim();
  const time = (data.get('time') || '').toString().trim();
  const place = (data.get('place') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  const subject = `Förfrågan: ${type || 'bokning'} – ${date || 'datum ej angivet'}`;

  const bodyLines = [
    `Hej Hannes!`,
    ``,
    `Jag vill höra av mig angående en eventuell bokning.`,
    ``,
    `Namn: ${name}`,
    `E-post: ${email}`,
    `Telefon: ${phone || '-'}`,
    `Typ av tillställning: ${type}`,
    `Datum: ${date}`,
    `Tid: ${time || '-'}`,
    `Plats: ${place}`,
    ``,
    `Meddelande:`,
    message || '-',
    ``,
    `(Detta är en förfrågan, inte en bekräftad bokning.)`
  ];

  const mailto = `mailto:info@hannesnilsson.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  window.location.href = mailto;
});
