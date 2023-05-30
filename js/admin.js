let session = new Session();
session = session.getSession()

if(session !== '1'){
    window.location.href = '/'
}

document.querySelector('#logOut').addEventListener('click', e=>{
    e.preventDefault();

    let session_id = new Session();
    session_id = session_id.destroySession()
    window.location.href = '/'

})

document.querySelector('#redirect_index').addEventListener('click', e=>{
    e.preventDefault();

    window.location.href = 'main.html'
})

document.querySelector('.allUsers').addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector('.allUsersContainer').style.display = 'block'
    document.querySelector('.allPostsContainer').style.display = 'none'
})

document.querySelector('.allPosts').addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector('.allUsersContainer').style.display = 'none'
    document.querySelector('.allPostsContainer').style.display = 'block'
})


async function populateUsers(){
    let user = new User();
    user = await user.getAll()
   
    user.forEach(item=>{
        if(item.id !== '1'){

            document.querySelector('table').innerHTML += `          
            <tr class="main_td">
                <td class="td_id" id="td_cl">${item.id}</td>
                <td class="td_name" id="td_cl">${item.username}</td>
                <td class="td_email" id="td_cl">${item.email}</td>
                <td class="td_password" id="td_cl">${item.password}</td>
                <td><button onclick="deleteUser(this)" id="delete_user_btn">Delete</button></td>
                <td><button onclick="editUser(this)" id="edit_user_btn">Edit</button></td>
            </tr>
            `

        }
    })
}

populateUsers()

async function populateUserData(){
    let user = new User();
    user = await user.get()

    document.querySelector('#userUsername').innerText = user.username
    document.querySelector('#userMail').innerText = user.email
}

populateUserData()

let deleteUser = e =>{
    if(confirm('Are you sure u want to delete this account?')){
    let mainEl = e.closest('.main_td')
    let user_id = Number(mainEl.querySelector('.td_id').innerText)

    let user = new User();
    user = user.deleteId(user_id)
    mainEl.remove()

    async function deletePostByUser(){
        let post = new Post();
        post = await post.getAllPosts();

        post.forEach(post=>{
            let post_user_id = parseInt(post.user_id);
            if(post_user_id === user_id){
                let post_del = new Post();
                post_del = post_del.deletePost(post.id)
            }
        })
    
    }
    deletePostByUser()
    }
}


let open_modal = () =>{
    overlay.style.display = 'block'
    popup.style.display = 'block'
}

let close_modal = () =>{
    overlay.style.display = 'none'
    popup.style.display = 'none'
}

let overlay = document.querySelector('.overlay_admin');
let popup = document.querySelector('.popup_admin');
let btnClose = document.querySelector('#closeModal_admin');

let editUser = e =>{
    let mainEl = e.closest('.main_td');
    let user_id = Number(mainEl.querySelector('.td_id').innerText);
    open_modal();

    async function getUser_Data(){
        let user_edit = new User();
        user_edit = await user_edit.getUserPost(user_id);

        document.querySelector('#editUsername_admin').value = user_edit.username
        document.querySelector('#editEmail_admin').value = user_edit.email
        
        document.querySelector('.edit_text').innerText = `Edit ${user_edit.username}'s Account`
    
        document.querySelector('#submitAdmin').addEventListener('click', e=>{
            e.preventDefault();
            let user = new User();
            user.username = document.querySelector('#editUsername_admin').value
            user.email = document.querySelector('#editEmail_admin').value
            user = user.editProfileById(user_edit.id);
        })
    }
    getUser_Data()

}

overlay.addEventListener('click', close_modal)
btnClose.addEventListener('click', close_modal)
window.addEventListener('keydown', e=>{
    if(e.key === "Escape"){
        close_modal();
    }
})

// ------------------------------------------------------ POPULATE POSTS

async function populatePostData(){
    let post = new Post();
    post = await post.getAllPosts()

    post.forEach(item=>{
        async function getUsername(){
            
        let user = new User();
        user = await user.getUserPost(item.user_id)
        user = user.username

        document.querySelector('.post_table').innerHTML += `          
        <tr class="main_td">
            <td class="td_id" id="td_cl">${item.id}</td>
            
            <td class="td_username" id="td_cl">${user}</td>
            <td class="td_content" id="td_cl">${item.content}</td>
            <td><button onclick="deletePost(this)" id="delete_user_btn">Delete</button></td>
            <td><button onclick="editPost(this)" id="edit_user_btn">Edit</button></td>
        </tr>
        `
        }
        getUsername();
 
    })
}

let deletePost = (e) =>{
    if(confirm('Do you want to delete this post?')){
        let mainEl = e.closest('.main_td');
        let id = parseInt(mainEl.querySelector('.td_id').innerText);
        let post = new Post();
        post.deletePost(id);

        mainEl.remove()
    }
} 

let overlay_post = document.querySelector('.overlay_admin_post');
let popup_post = document.querySelector('.post_popup_admin');
let close_post = document.querySelector('#closeModal_admin_post')

let open_modal_post = () =>{
    overlay_post.style.display = 'block'
    popup_post.style.display = 'block'
}

let close_modal_post = () =>{
    overlay_post.style.display = 'none';
    popup_post.style.display = 'none';
}

close_post.addEventListener('click', e=>{
    e.preventDefault();
    close_modal_post()
})

overlay_post.addEventListener('click', e=>{
    e.preventDefault();
    close_modal_post();
})

window.addEventListener('keydown', e=>{
    if(e.key === 'Escape'){
        close_modal_post();
    }
})

let editPost = (e) => {
    let mainEl = e.closest('.main_td');
    let id = parseInt(mainEl.querySelector('.td_id').innerText);
    open_modal_post();

    async function getPostById(){
        let post = new Post();
        post = await post.getPost_id(id)
        console.log(post)
        document.querySelector('#editContent').value = post.content
        document.querySelector('#submitAdmin_post').addEventListener('click', e=>{
            e.preventDefault();
            let edit_post = new Post();
            edit_post.content = document.querySelector('#editContent').value
            edit_post = edit_post.editPost(post.id)
        })

        async function getPostUsername(){
            let user = new User();
            user = await user.getUserPost(post.user_id)

            document.querySelector('.edit_text_post').innerText = `Edit ${user.username}'s content`
        }

        getPostUsername()
    }

    getPostById();
}

populatePostData()