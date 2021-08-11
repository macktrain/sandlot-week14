const submitLogIn = async (event) => {
  event.preventDefault();
  
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    console.log ("before fetch");
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log (Response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', submitLogIn);

document.getElementById('headerMsg').innerHTML = 'The Tech Blog';
document.getElementById('loginBtn').style.display = 'none';