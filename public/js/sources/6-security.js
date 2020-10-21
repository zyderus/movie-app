console.log('connected security.js');

// Google reCaptcha v2 & form
document.getElementById('register-form').addEventListener('submit', e => {
  e.preventDefault();
  
  const captcha = document.querySelector('#g-recaptcha-response').value;
  const username = document.querySelector('#reg-username').value;
  const password = document.querySelector('#reg-password').value;

  return fetch('/register', {
    method: "POST",
    headers: { 'Content-type':'application/json' },
    body: JSON.stringify({ username, password, captcha })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.success) {
      console.log('successfully registered');
      registrationErrors.recaptca = false;
      return window.location.href = '/';
    }
  });
});