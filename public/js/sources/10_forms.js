console.log('connected 6_forms.js');

// Check if in Profiles page
if (window.location.pathname == '/info/contact') {
  document.addEventListener('DOMContentLoaded', contactForm());
}

// Contact form
function contactForm() {
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.querySelector('#contact-form-name').value;
    const email = document.querySelector('#contact-form-email').value;
    const message = document.querySelector('#contact-form-message').value;

    const res = await fetch('/info/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    console.log(data);
    // if (data.success) {
    //   console.log('successfully registered');
    //   registrationErrors.recaptca = false;
    //   return (window.location.href = '/');
    // }
  });
}
