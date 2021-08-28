document.getElementById('headerMsg').innerHTML = 'Dashboard';

function gotoDash () {
    document.location.replace('/addPost');
}

document.getElementById('addPostBtn').addEventListener('click', gotoDash);