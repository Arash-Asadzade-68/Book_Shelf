
export default ( state={} , action ) => {
  switch (action.type) {
    case 'GET_BOOKS':
      return {...state,list:action.payload}

    case 'GET_BOOK':
      return {...state,book:action.payload}
    case 'ADD_BOOK':
      return {...state,newBook:action.payload}
    case 'CLEAR_BOOK':
      return {...state,newBook:action.payload}
    case 'UPDATE_BOOK':
      return {
        ...state,
        updatebook:action.payload.success,
        book:action.payload.doc
      }
    case 'DELETE_POST':
        return{
          ...state,
          postDeleted:action.payload
        }
    case 'CLEAR_POST':
        return{
          ...state,
          updateBook:action.payload.updateBook,
          book:action.payload.book,
          postDeleted:action.payload.postDeleted
        }
    case 'GET_Reviewer_W_BOOK':
      return {...state,book:action.payload.book,reviewer:action.payload.reviewer}
    case 'clear_Reviewer_W_BOOK':
      return {...state,book:action.payload.book,reviewer:action.payload.reviewer}
    default:
      return state;

  }
}
