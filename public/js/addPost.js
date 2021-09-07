document.getElementById('headerMsg').innerHTML = 'Add New Post';

const addNewPost = async (event) => {
    event.preventDefault();

      let creatorId = parseInt(document.getElementById('creatorId').value.trim());

      const url = '/api/blogs/addNewPost';
      const data = {
          'creatorId' : creatorId,
          'blogpostTitle' : document.getElementById('postTitle').value.trim(),
          'blogpost' : document.getElementById('postContent').value.trim(),
          'blog_create_date' :  moment().format("YYYY-MM-DD HH:mm:ss"),
      };
     
      const postData = JSON.stringify(data);      
      let response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: postData,
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('There was an issue creating your post.');
      }
  };
  
  document.querySelector('#newPost').addEventListener('submit', addNewPost);