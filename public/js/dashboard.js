//dashboard.js is used within the dashboard.handlebars view and shows all posts available; 
//however, this js sets the stage for that view by adding a header msg (just below) and 
//navigates to the new post view onclick of the new post button

document.getElementById('headerMsg').innerHTML = 'Dashboard';

function addPost () {
    document.location.replace('/addPost');
}

document.getElementById('addPostBtn').addEventListener('click', addPost);