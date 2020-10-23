console.log('connected security.js');

// Google reCaptcha v2 & form
// document.getElementById('register-form').addEventListener('submit', e => {
//   e.preventDefault();

//   const captcha = document.querySelector('#g-recaptcha-response').value;
//   const email = document.querySelector('#reg-email').value;
//   const password = document.querySelector('#reg-password').value;
  
//   console.log(email);

//   return fetch('/register', {
//     method: "POST",
//     headers: { 'Content-type':'application/json' },
//     body: JSON.stringify({ email, password, captcha })
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     if(data.success) {
//       console.log('successfully registered');
//       registrationErrors.recaptca = false;
//       return window.location.href = '/';
//     }
//   });
// });