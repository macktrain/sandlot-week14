//addPost.js is used in addPost.handlebars.  This set of html will allow a user 
// to ... dun dun dunnnnnnnnnnnnnnnn .... add a post

//Sets the application header to the following value
document.getElementById('headerMsg').innerHTML = 'Add New Post';

const addNewPost = async (event) => {
    //We are using a form in the html and need the next line to keep the const 
    //from firing prematurely.
    event.preventDefault();

    //Pull the user id from the html
    let creatorId = parseInt(document.getElementById('creatorId').value.trim());

    const url = '/api/blogs/addNewPost';
    //pull together the date to send over
    const data = {
        'creatorId' : creatorId,
        'blogpostTitle' : document.getElementById('postTitle').value.trim(),
        'blogpost' : document.getElementById('postContent').value.trim(),
        'blog_create_date' :  moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    
    //stringify the object and then post to the /api/blogs/addNewPost end point
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

//event listener to add a new post
document.querySelector('#newPost').addEventListener('submit', addNewPost);