async function signUp() {

  const url = '/api/user';
  const data = {
    'username' : document.getElementById('username').value,
    'email' : document.getElementById('email').value,
    'password' : document.getElementById('password').value,
  };

  const bodyData = JSON.stringify(data);
  
  let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyData,
  });
  
  if (response.ok) {
    document.location.replace('/login');
  } else {
    console.log(response);
    alert('There was an issue with either your email, username or password.');
  }
};

document
.getElementById('signUpBtn')
.addEventListener('click', signUp);