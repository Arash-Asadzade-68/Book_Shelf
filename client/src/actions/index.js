import axios from 'axios';

export const getBooks = (limit=0,skip=0,order='asc',list='') => {

   const request = axios.get(`/api/books?skip=${skip}&order=${order}&limit=${limit}`)
                   .then( response => {
                                        if(list){
                                          return [...list,...response.data]
                                        }
                                        else {
                                          return response.data
                                        }
                     });
    return {
      type:'GET_BOOKS',
      payload:request
    }
}


export const getBookWithReviewer = (id) =>{
  const request = axios (`/api/getBook?id=${id}`)
  return (dispatch) =>{
    request.then(({data})=>{
      let book = data;
      axios.get(`/api/getReviewer?id=${book.ownerId}`)
      .then(({data})=>{
        let response = {
          book,
          reviewer : data
        }
        dispatch({
          type:'GET_Reviewer_W_BOOK',
          payload:response
        })
      })
    })
  }
}

export const clearBookWithReviewer =() =>{
  return {

      type:'clear_Reviewer_W_BOOK',
      payload : {
        book:{},
        reviewer :{}
      }

  }
}

export const addBook = (book) =>{
  const request = axios.post('/api/book',book)
                  .then(response => response.data);

  return {
    type:'ADD_BOOK',
    payload : request
  }
}

export const clearBook = () =>{
  return {
    type:'CLEAR_BOOK',
    payload:{}
  }
}

export const getUserPosts = (userId) => {
  const request = axios.get(`/api/user_posts?userId=${userId}`)
                  .then(response => response.data);
  return {
    type:'GET_USER_POSTS',
    payload:request
  }
}

export const getBook = (id) => {
  const request = axios.get(`/api/getBook?id=${id}`)
                  .then(response => response.data)
  return {
    type:'GET_BOOK',
    payload:request
  }
}

export const updateBook = (data) =>{
  const request = axios.post(`/api/book_update`,data)
                  .then(response => response.data)
  return {
    type:'UPDATE_BOOK',
    payload:request
  }
}

export const deletePost = (id) =>{
  const request = axios.delete(`/api/delete_book?id=${id}`)
                  .then( response => response.data)
  return {
    type:'DELETE_POST',
    payload:request
  }
}

export const clearPost = () =>{
  return {
    type:'CLEAR_POST',
    payload:
    {
      book:null,
      postDeleted:false,
      updateBook:false
    }
  }
}



//*============== USER ===============*//

export const loginUser = ({email,password}) =>{
  const request = axios.post(`/api/login`,{email,password})
                  .then(response => response.data)

  return {
    type:'USER_LOGIN',
    payload:request
  }
}


export const auth = () =>{
  const request = axios.get('/api/auth')
                  .then(response => response.data);

  return {
    type : 'USER_AUTH',
    payload : request
  }
}


export const getUsers = () =>{
  const request = axios.get('/api/users')
                  .then(response => response.data)
  return {
    type:'GET_USERS',
    payload: request
  }
}

export const userRegister = (user,userlist) =>{
  const request = axios.post('/api/register',user)

       return (dispatch) => {

           request.then(({data})=>{
              let users = data.success ? [...userlist,data.user] : userlist;
              let response = {
                 success :data.success,
                 users
              }

              dispatch({
                type:'USER_REGISTER',
                payload:response
              })
         })
       }
}
