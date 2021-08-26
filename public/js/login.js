const logIn = async (event) => {
  event.preventDefault();
  
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const url = '/api/user/login';

  if (email && password) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const userData = await response.json();
    console.log(response)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert ("Please be sure to enter a valid email and password.");
    }
  } else {
    alert ("Please be sure to enter a valid email and password.");
  }
};

document.querySelector('#loginForm').addEventListener('submit', logIn);