console.log('connected 2.0_navbar.js');

// Search form
const searchContainerMain = document.querySelector('#search-container-main');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

// Authorization
const authBtn = document.querySelector('#auth-btn');

// Modals
const authModal = new bootstrap.Modal(document.getElementById('auth-modal')); 
const registerTab = new bootstrap.Tab(document.querySelector('#authTab a[href="#register-tab-page"]'));
const loginTab = new bootstrap.Tab(document.querySelector('#authTab a[href="#login-tab-page"]'));

// Links to Login and Register tabs in Modal Window
const regbutton = document.querySelector('#btn-register');
const reglink = document.querySelector('#register-link');
const loginlink = document.querySelector('#login-link');



// Register form password visibility toggle
const hideBtns = document.querySelectorAll('.toggle-hide');

// Auth button event
if(authBtn) {
  authBtn.addEventListener('click', () => {
    authModal.show();
    loginTab.show();
  });
}

// Modal form links between Login and Register modals
reglink.addEventListener('click', function (e) {
  e.preventDefault()
  registerTab.show();
});
loginlink.addEventListener('click', function (e) {
  e.preventDefault()
  loginTab.show();
});

// Toggle Password Visibility
hideBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleShow(btn);    
  });
});

function toggleShow(element) {
  if (element.previousElementSibling.type === "password") {
    element.previousElementSibling.type = "text";
    element.className = 'toggle-hide toggle-hide-hide';
    element.innerText = 'HIDE';
  } else {
    element.previousElementSibling.type = "password";
    element.className = 'toggle-hide toggle-hide-show';
    element.innerText = 'SHOW';
  }
}
// end toggle password visibility