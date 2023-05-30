class Post{
    api_url = 'https://63dfbcaf8b24964ae0f3193e.mockapi.io';
    post_id = '';
    content = '';
    user_id = '';
    likes = '';

    createPost(){
        let session = new Session();
        session = session.getSession();
        let data = {
            likes: 0,
            user_id: session,
            content: this.content
        }

        data = JSON.stringify(data)

        fetch(this.api_url + '/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response=> response.json())
        .then(data=>{
            console.log(data)
        })
    }

    like(post_id, likes){
        let data ={
            likes: likes
        }
        fetch(this.api_url + '/post/' + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response=> response.json())
        .then(data=>{
            alert('You liked a post')
        })
    }

    deletePost(post_id){
        fetch(this.api_url + '/post/' + post_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data=>{
            alert('You deleted a post')
        })
    }

    editPost(post_id){
        let data = {
            content: this.content
        }

        data = JSON.stringify(data)

        fetch(this.api_url + '/post/' + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'admin.html'
        })
    }

    async getPost_id(post_id){
        let response = await fetch(this.api_url + '/post/' + post_id);
        let data = await response.json();
        return data;
    }

    async getPost(){
        let response = await fetch(this.api_url + '/post')
        let data = await response.json()
        return data;
    } //Uselesss

    async getAllPosts(){
        let response = await fetch(this.api_url + '/post')
        let data = await response.json()
        return data;
    }
}