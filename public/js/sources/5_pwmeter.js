console.log('connected pwmeter.js');

document.querySelector('#reg-password').addEventListener('keyup', function() {
  const msg = document.getElementById('passwordmessage');
  const meters = document.querySelectorAll('.pwmeter span');

  // Calculate the strength of the password
  let passwordScore = calPasswordStrength(this.value);

  // Set the width of the password meter to a multiple of the score
  // meter.style.width = (passwordScore+1) * 1 + 'px';

  if (passwordScore <= 40) {
    meters[0].style.backgroundColor = 'red';
    meters[0].className = 'meter-span-on';
    meters[1].className = 'meter-span-off';
    meters[2].className = 'meter-span-off';
    msg.style.color = 'red';
    msg.innerHTML = 'Weak password';
  } else if (passwordScore <= 77) {
    meters[1].style.backgroundColor = 'orange';
    meters[1].className = 'meter-span-on';
    meters[2].className = 'meter-span-off';
    msg.style.color = 'orange';
    msg.innerHTML = 'Password is average';
  } else {
    meters[2].style.backgroundColor = 'green';
    meters[2].className = 'meter-span-on';
    msg.style.color = 'green';
    msg.innerHTML = 'Your password is strong';
  }

  // If input empty, there is no text output
  if (this.value == "") {
    meters[0].className = 'meter-span-off';
    meters[1].className = 'meter-span-off';
    meters[2].className = 'meter-span-off';
    msg.innerHTML = '';
  }
});

// Return password score
function calPasswordStrength(pass) {
  var score = 0;
  if (!pass) return score;

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i=0; i<pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  variationCount = 0;
  for (var check in variations) {
    variationCount += (variations[check] == true) ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}