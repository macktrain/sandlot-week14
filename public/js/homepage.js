document.getElementById('headerMsg').innerHTML = 'The Tech Blog';

async function getBlogs() {
    let response = await fetch('/api/blogs', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    const blogsJSON = await response.json()
  
    let blogHTML = '';
    if (blogsJSON){
        for(let key in blogsJSON) {
            blogHTML += `<div class='blogs' id='blogNum-${blogsJSON[key].blogid}'>`;
            blogHTML += '   <div id=\'blogTitle\'>';
            blogHTML += `       <h2>${blogsJSON[key].blogpostTitle}</h2>`;
            blogHTML += `       <div>Posted by ${blogsJSON[key].username} on ${blogsJSON[key].blog_createDate}</div>`;
            blogHTML += '   </div>';
            blogHTML += `   <p>${blogsJSON[key].blogpost}</p>`;
            blogHTML += "</div>";
        }
    } else{
        blogHTML = "There have not been any blogs posted recently.";
    }

    alert (blogHTML);
  
    document.getElementById('current-blogs').innerHTML = blogHTML;
  };

  getBlogs();