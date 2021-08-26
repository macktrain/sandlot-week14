const logout = async () => {
  console.log ("CLICKED!");
  console.log ("CLICKED!");
  console.log ("CLICKED!");
  console.log ("CLICKED!");
  console.log ("CLICKED!");
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    res.render('/');
  } else {
    alert("ERROR TEXT" + response.statusText);
  }
};

document.getElementById('logoutBtn').addEventListener('click', logout);