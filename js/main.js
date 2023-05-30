let session = new Session();
session = session.getSession();

if(session == ""){
    window.location.href = '/'
}

if(session == 1){
    let insert = document.querySelector('.profileContainer');
    insert.insertAdjacentHTML('beforeend', "<button id='goToAdmin'>Admin Panel</button>")    

    document.querySelector('#goToAdmin').addEventListener('click', e=>{
        e.preventDefault();
        window.location.href = 'admin.html'
    })
}


let popupEdit = document.querySelector('.popupEditProfile');
let overlayEdit = document.querySelector('.overlayEditProfile');
let closeModalBtn = document.querySelector('#closeModalEditProfile')
let editProfileBtn = document.querySelector('#editProfile')

let closeModal = () =>{
    popupEdit.style.display = 'none';
    overlayEdit.style.display = 'none'
}

let openModal = () =>{
    popupEdit.style.display = 'block';
    overlayEdit.style.display = 'block'
}

editProfileBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener('click', closeModal);
overlayEdit.addEventListener('click', closeModal)
window.addEventListener('keydown', e=>{
    if(e.key === "Escape"){
        closeModal()
    }
})

document.querySelector('#logOut').addEventListener('click', e=>{
    e.preventDefault();

    let session_id = new Session();
    session_id = session_id.destroySession()
    window.location.href = '/'

})

async function populateUserData(){
    let user = new User();
    user = await user.get()

    document.querySelector('#editEmail').value = user.email
    document.querySelector('#editUsername').value = user.username

    document.querySelector('#userUsername').innerText = user.username
    document.querySelector('#userMail').innerText = user.email
}

populateUserData()

document.querySelector('#editFormSubmit').addEventListener('click', e=>{
    e.preventDefault()

    let user = new User();
    user.email = document.querySelector('#editEmail').value;
    user.username = document.querySelector('#editUsername').value;
    user.editProfile()
})

document.querySelector('#deleteAcc').addEventListener('click', e=>{
    e.preventDefault();

    if(confirm('Do you want to delete your account?')){
        let user = new User();
        user.deleteAccount()

    }
})

// ----------------------------- POSTS

document.querySelector('#submitPost').addEventListener('click', e=>{
    e.preventDefault();

    if(document.querySelector('#txtarea').value !== ''){
    async function createPost(){
        
        let post = new Post();
        post.content = document.querySelector('textarea').value;
        post.createPost()
        
        let all_post = new Post();
        all_post = await post.getAllPosts();
        document.querySelector('textarea').value = ''

        let session = new Session();
        session = session.getSession();


        let user = new User()
        user = await user.getUserPost(session)

        let html = '';
        if(user.id === session){
            html = '<div class="deleteContainer"><button onclick="deletePost(this)" id="deleteBtn">Delete</button></div>'
        }

        document.querySelector('.allPosts').innerHTML += `<div class="post_container" data-post_id="${post.id}">
        <div class="user_data">
            <img src="img/profile.png" alt="" id="profileImg">
        <div class="user_tags">
            <div class="user_posted">${user.username}</div>
            <div class="user_posted_email">@${user.email}</div>
        </div>
        </div>
        <div class="post_content">${post.content}</div>
        <button id="likeBtn" onclick="likePost(this)"><img src="img/like-removebg-preview.png" id="likeIcon"><span class="num_likes">${post.likes}</span> Likes
        </button>
        ${html}
        </div>
            `
        
    }
    createPost();
    }else{
        alert('Error: U need to type something');
    }
})

async function populatePosts(){
    let post = new Post();
    post = await post.getAllPosts();

    post.forEach(post=>{
        async function getPostUser(){
            let session = new Session();
            session = session.getSession();


            let user = new User()
            user = await user.getUserPost(post.user_id)

            let html = '';
            if(user.id === session){
                html = '<div class="deleteContainer"><button onclick="deletePost(this)" id="deleteBtn">Delete</button></div>'
            }

            document.querySelector('.allPosts').innerHTML += `<div class="post_container" data-post_id="${post.id}">
            <div class="user_data">
                <img src="img/profile.png" alt="" id="profileImg">
            <div class="user_tags">
                <div class="user_posted">${user.username}</div>
                <div class="user_posted_email">@${user.email}</div>
            </div>
            </div>
            <div class="post_content">${post.content}</div>
            <button id="likeBtn" onclick="likePost(this)"><img src="img/like-removebg-preview.png" id="likeIcon"><span class="num_likes">${post.likes}</span> Likes
            </button>
            ${html}
            </div>
                `
        }
        
        getPostUser();
    })
}
populatePosts()

let deletePost = (e) =>{
    if(confirm('Are you sure you want to delete this post?')){
        let mainEl = e.closest('.post_container');
        let post_id = mainEl.getAttribute('data-post_id')
        mainEl.remove();
        let post = new Post();
        post =post.deletePost(post_id)
    }
}

let likePost = (e) =>{
    let mainEl = e.closest('.post_container');
    let dummy_var = mainEl.querySelector('.num_likes').innerText;
    let num_of_likes = parseInt(dummy_var)
    let post_id = mainEl.getAttribute('data-post_id')

    mainEl.querySelector('.num_likes').innerText = num_of_likes+1;
    e.setAttribute('disabled', 'true')
    mainEl.querySelector('#likeIcon').src = 'img/liked.png'

    let post = new Post()
    post.like(post_id, num_of_likes+1)

}
