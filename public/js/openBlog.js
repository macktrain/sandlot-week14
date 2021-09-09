document.getElementById('headerMsg').innerHTML = 'Review Post';

async function addComment () {
    const logged_in = document.getElementById('logged_in').value.trim();
    if (logged_in === 'true') {
        const commentid = parseInt(document.getElementById('blogId').value.trim());
        const commentorId = parseInt(document.getElementById('creatorId').value.trim());
        const comment = document.getElementById('addThisComment').value.trim();

        const url = `/api/comments`;
        const data = {
            'commentid' : commentid,
            'commentorid' : commentorId,
            'comment' : comment,
            'comment_create_date' : moment().format("YYYY-MM-DD HH:mm:ss"), //'2016-08-09 04:05:02'
        };

        const postData = JSON.stringify(data);      
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: postData,
        });

        const openURL = '/openBlog/'+ commentid;
        
        if (response.ok) {
            document.location.replace(openURL);
        } else {
            console.log (response);
            alert('There was an issue creating your post.');
        }
    } else {
        alert ("Sorry you must be logged in to comment on a post");
    }
}

const el = document.getElementById('addCommentBtn');
if (el) {
    document.getElementById('addCommentBtn').addEventListener('click', addComment);
}