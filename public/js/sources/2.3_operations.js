console.log('connected 2.3_operations.js');

// Reload with Register modal tab open if client-side validation fails
if(sessionStorage.getItem('regformErrors') === 'true') {
  document.addEventListener("DOMContentLoaded", () => {
    authModal.show();
    registerTab.show();
  });
}
// Prevent reOpening registration form on reload
sessionStorage.setItem('regformErrors', false);

// If login fails open login modal
if(sessionStorage.getItem('loginErrors') === 'true') {
  document.addEventListener("DOMContentLoaded", () => {
    authModal.show();
    loginTab.show();
  });
}
// Prevent reOpening login form on reload
sessionStorage.setItem('loginErrors', false);

// Redirect to home directory on Authorization modal close if in subdirectories
if(location.pathname != '/') {
  document.querySelector('#auth-modal').addEventListener('hide.bs.modal', (e) => {
    console.log('hida maida');
    window.location.href = '/';
  });
}
