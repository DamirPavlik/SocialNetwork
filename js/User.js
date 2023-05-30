class User{
    api_url = 'https://63dfbcaf8b24964ae0f3193e.mockapi.io';
    email = '';
    pasword = '';
    username = '';

    create(){
        let data = {
            email: this.email,
            password: this.pasword,
            username: this.username
        }

        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data=>{
            let session = new Session();
            session.user_id = data.id
            session.startSession();

            window.location.href = 'main.html'
        })
  
    }

    login(){
        fetch(this.api_url + '/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        .then(response => response.json())
        .then(data=>{
            let login_successful = 0;
            data.forEach(db_user=>{
                if(db_user.username === this.username && db_user.password === this.password){
                    let session = new Session();
                    session.user_id = db_user.id
                    session.startSession();
                    login_successful = 1
                    window.location.href = 'main.html'
                }

                if(db_user.username === 'admin' && db_user.password === "123123"){
                    window.location.href = 'admin.html'
                }
            })

            if(login_successful === 0){
                alert('Error')
            }
        })
    }

    loginAdmin(){
        fetch(this.api_url + '/users/' + 1,{
            method: 'GET'
        })
        .then(res => res.json())
        .then(data=>{
            let session = new Session();
            session.user_id = 1
            session.startSession();
            window.location.href = 'admin.html'
        })
    }

    editProfile(){
        let session = new Session();
        session = session.getSession();

        let data = {
            username: this.username,
            email: this.email
        }

        data = JSON.stringify(data)
        
        fetch(this.api_url + '/users/' + session, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:data
        })
        .then(response => response.json())
        .then(data =>{
            window.location.href = 'main.html'
        })
    }

    editProfileById(user_id){
        let data = {
            username: this.username,
            email: this.email
        }

        data = JSON.stringify(data)
        
        fetch(this.api_url + '/users/' + user_id, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:data
        })
        .then(response => response.json())
        .then(data =>{
            window.location.href = 'admin.html'
        })
    }
    
    async getAll(){
        let response = await fetch(this.api_url + '/users');
        let data = await response.json();
        return data;
    }

    async get(){
        let session = new Session();
        session = session.getSession();
        
        let response = await fetch(this.api_url + '/users/' + session)
        let data = await response.json()
        return data;
    }

    async getUserPost(userID){
        let response = await fetch(this.api_url + '/users/' + userID)
        let data = await response.json()
        return data;
    }

    deleteId(user_id){
        fetch(this.api_url + '/users/' + user_id,{
            method: 'DELETE'
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })
    }

    deleteAccount(){
        let session = new Session();
        session = session.getSession();

        fetch(this.api_url + '/users/' + session,{
            method: 'DELETE'
        })
        .then(response=> response.json())
        .then(data=>{
            let session_id = new Session();
            session_id = session_id.destroySession();
            window.location.href = '/'
        })
    }
}