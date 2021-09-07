document.getElementById('headerMsg').innerHTML = 'Dashboard';

async function navtoPost (x) {   

    const url = `/api/blogs/updatePost`;
    const data = {
        'blogid' : x,
    };
   
    const postData = JSON.stringify(data);      
    let response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: postData,
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('There was an issue creating your post.');
    }
}
function changeBlogPostDiv(id) {

  const post = document.getElementById(`${id}`).innerHTML;

  let replaceHTML = "<div>";
  replaceHTML +=    "   <label for='postContent'>Post Detail</label>";
  replaceHTML +=    `   <textarea id='postContent' rows='5' placeholder='Enter Post Content'>${post}</textarea>`;
  replaceHTML +=    "</div>";
  replaceHTML +=    "<div class='btnList>";
  replaceHTML +=    `   <button id='updateBtn' onclick='updatePostFunc(${id})'>Update</button>`;
  replaceHTML +=    `   <button id='deleteBtn' onclick='deletePostFunc(${id})'>Delete</button>`;
  replaceHTML +=    "</div>";

  document.getElementById(`blog#${id}`).innerHTML = replaceHTML;
  
}

async function updatePostFunc (id) {   
  const url = `/api/blogs/${id}`;
  const data = {
      'blogpost' : document.getElementById('postContent').value,
      'blog_update_date' :  moment().format("YYYY-MM-DD HH:mm:ss"),
  };
  
  const postData = JSON.stringify(data);      
  let response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: postData,
  });
  
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('There was an issue creating your post.');
  }

}

async function deletePostFunc (id) {   
    const url = `/api/blogs/${id}`;
       
    let response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('There was an issue deleting your post.');
    }
}

function gotoDash () {
    document.location.replace('/addPost');
}

document.getElementById('addPostBtn').addEventListener('click', gotoDash);