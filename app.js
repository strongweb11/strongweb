"use strict";
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
document.querySelectorAll('.brand-image').forEach(image => {
  image.src = 'assets/strong-web-user-logo.png';
  image.alt = 'Strong Web logo';
});
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
const packagePrices = {
  'Website launch': 'Starting at $499',
  'Local business starter': 'Starting at $899',
  'Website care': '$79 / month'
};
document.querySelectorAll('.package').forEach(card => {
  const title = card.querySelector('h3')?.textContent.trim();
  const price = packagePrices[title];
  if (!price) return;
  const priceTag = document.createElement('p');
  priceTag.className = 'package-price';
  priceTag.textContent = price;
  card.querySelector('h3').insertAdjacentElement('afterend', priceTag);
});
document.querySelectorAll('.choose-package').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service').value = link.dataset.package;
  document.querySelector('#brief-form').hidden = false;
  document.querySelector('#brief-result').hidden = true;
}));
const form = document.querySelector('#brief-form');
const result = document.querySelector('#brief-result');
const output = document.querySelector('#brief-output');
const serviceLabel = document.querySelector('label[for="service"]');
if (serviceLabel) {
  const fields = document.createElement('div');
  fields.className = 'contact-fields';
  fields.innerHTML = '<label for="name">Your name</label><input id="name" name="name" autocomplete="name" placeholder="Your name" required maxlength="120"><label for="email">Your email</label><input id="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="160">';
  form.insertBefore(fields, form.firstElementChild);
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const business = document.querySelector('#business').value.trim();
  const goal = document.querySelector('#goal').value.trim();
  if (!name || !email || !business || !goal) { form.reportValidity(); return; }
  output.value = 'Project enquiry\n\nName: ' + name + '\nEmail: ' + email + '\nBusiness: ' + business + '\nService: ' + document.querySelector('#service').value + '\n\nMessage:\n' + goal + '\n\nPlease let me know the proposed scope, price and next steps.';
  const subject = 'Strong Web enquiry: ' + document.querySelector('#service').value;
  document.querySelector('#email-brief').href = 'mailto:strongweb11@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(output.value);
  form.hidden = true;
  result.hidden = false;
  document.querySelector('#copy-status').textContent = 'Email to strongweb11@gmail.com. Review and send from your email app.';
  output.focus();
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(output.value);
    status.textContent = 'Brief copied. Paste it into an email to strongweb11@gmail.com.';
  } catch (_) {
    output.focus(); output.select();
    status.textContent = 'Select and copy the highlighted brief using your device’s copy command.';
  }
});
document.querySelector('#edit-brief').addEventListener('click', () => { result.hidden = true; form.hidden = false; document.querySelector('#business').focus(); });
