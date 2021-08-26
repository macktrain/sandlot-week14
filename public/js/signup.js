const signUp = async (event) => {
  event.preventDefault();

    const url = '/api/user/signup';
    const data = {
        'email' : document.getElementById('email').value.trim(),
        'password' : document.getElementById('password').value.trim(),
        'username' : document.getElementById('username').value.trim(),
    };

    const bodyData = JSON.stringify(data);
    let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyData,
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('There was an issue creating your login.');
    }
};

document.querySelector('#signup-form')
.addEventListener('submit', signUp);