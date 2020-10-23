console.log('connected regvalidate.js');

// Log Errors status on button click
regbutton.addEventListener('click', () => {
  console.log(registrationErrors);
  console.log(allFalse(registrationErrors));
});

// Email field error set True on focus in
regemail.addEventListener('focusin', () => {
  registrationErrors.emailbackend = true;
});

// If errors prevent form submit
regform.addEventListener('submit', (e) => {
  if(!allFalse(registrationErrors)) {
    e.preventDefault();
  }
});

// Email presence in database validation 
regemail.addEventListener('focusout', () => {
  checkEmail();
});

// Validate email
regemail.addEventListener('keyup', (e) => {
  const emailValue = regemail.value;
      
  if(emailValue === '' || emailValue === null) {
    setErrorFor(regemail, "Email cannot be blank");
    registrationErrors.email = true;
  } else if(emailValue.length <=6) {
    setErrorFor(regemail, "Email too short");
    registrationErrors.email = true;
  } else if(!isEmail(emailValue)) {
    setErrorFor(regemail, "Email is not valid");
    registrationErrors.email = true;
  } else {
    setSuccessFor(regemail);
    registrationErrors.email = false;
  }  
});

// Validate password
regpassword.addEventListener('keyup', (e) => {
  passValue = regpassword.value;
  
  if(passValue === '' || passValue === null) {
    setErrorFor(regpassword, "Password cannot be blank");
    registrationErrors.password = true;
  } else if(passValue.length <= 6) {
    setErrorFor(regpassword, "Password must be longer than 6 characters");
    registrationErrors.password = true;
  } else {
    setSuccessFor(regpassword);
    registrationErrors.password = false;
  }
});

// Output message and style on Successful Validation
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('.small');

  // add error message inside small
  small.innerText = message;

  // add error class
  formControl.className = 'form-group error';
}

// Output message and style on Error
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-group success';
}

// Validate email structure
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Check database for Email presence
function checkEmail() {
  let email = document.querySelector('#reg-email').value.toLowerCase();
  
  // send email input value to /usercheck route of the API
  fetch('/usercheck', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
  })
  // receive and process response from the API
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.message != 'success'){
      emailsmall.innerHTML = `${data.message}`;

      const formControl = emailsmall.parentElement;
      formControl.className = 'form-group error';
      registrationErrors.emailbackend = true;
    } else {
      emailerr.innerHTML = '';
      registrationErrors.emailbackend = false;
    }
  });
}

function recaptchaCheck() {
  registrationErrors.recaptcha = false;
}
function recaptchaCheckExp() {
  registrationErrors.recaptcha = true;
}

// Check if all errors cleared
function allFalse(obj) {
  for(let item in obj)
    if(obj[item]) return false;
    
  return true;
}