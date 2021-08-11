document.getElementById('headerMsg').innerHTML = 'Dashboard';

async function getBlogs() {
    let response = await fetch(`/api/blogs/${req.session.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const blogsJSON = await response.json()
  
    let blogHTML = '';
    if (blogsJSON){
        for(let key in blogsJSON) {
            blogHTML += `<div class='main' id='blogNum-${blogsJSON[key].blogid}'>`;
            blogHTML += '   <div class=\'mainRow\'>';
            blogHTML += `       <div class='blogTitle'>${blogsJSON[key].blogpostTitle}</div>`;
            blogHTML += `       <div class='blogPoster'>Posted by ${blogsJSON[key].username} on ${blogsJSON[key].blog_createDate}</div>`;
            blogHTML += '   </div>';
            blogHTML += `   <p class='blogPost'>${blogsJSON[key].blogpost}</p>`;
            blogHTML += "</div>";
        }
    } else{
        blogHTML = "There have not been any blogs posted recently.";
    }
  
    document.getElementById('my-blogs').innerHTML = "HELLO!";
  };

  getBlogs();