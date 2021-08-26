const logout = async (event) => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert("ERROR TEXT: " + response.statusText);
  }
};

document.getElementById('logoutBtn').addEventListener('click', logout);