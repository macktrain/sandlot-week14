document.getElementById('headerMsg').innerHTML = 'The Tech Blog';

function commentPost (blogid) {
    document.location.replace(`/openBlog/${blogid}`)
}