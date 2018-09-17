import React, { PureComponent} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook,updateBook,clearPost,deletePost} from '../../actions';

class EditBook extends PureComponent {

  state = {
     formData :{
      _id:this.props.match.params.id,
      name:'',
      author:'',
      review:'',
      pages:'',
      rating:'',
      price:''
     }
  }

  componentWillMount () {
    this.props.dispatch(getBook(this.props.match.params.id))
  }
  componentWillReceiveProps (nextProps) {
    let book = nextProps.books.book;
    this.setState(
      {formData:{
      _id:book._id,
      name:book.name,
      author:book.author,
      review:book.review,
      pages:book.pages,
      rating:book.rating,
      price:book.price
    }})
  }

  componentWillUnmount () {
    this.props.dispatch(clearPost())
  }

  formSubmit = (e) =>{
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formData))
  }




  handleInput = (event,name) =>{

    const newFormData = {
      ...this.state.formData
    }
    newFormData [name] = event.target.value

    this.setState({
      formData:newFormData
    })

  }

  deleteBook = () =>{
    this.props.dispatch(deletePost(this.props.match.params.id))
  }

  redirectUser = () =>{
    setTimeout(()=>{
      this.props.history.push('/user/user-reviews')
    },1000)
  }



  render() {
    let books = this.props.books;
    return (
      <div className="rl_container article">
            {
              books.updatebook ?
                <div className="edit_confirm">
                  post updated , <Link to={`/books/${books.book._id}`}>
                  Click here to see your post
                </Link>
                </div>
               : null

            }
            {
              books.postDeleted ?
                <div className="red_tag">
                  post deleted
                  {this.redirectUser()}
                </div>
               : null

            }
            <form onSubmit={this.formSubmit}>
                <h2>Edit Review</h2>
                <div className="form_element">
                   <input type="text"
                          placeholder="Enter name"
                          value={this.state.formData.name}
                          onChange={(event)=>this.handleInput(event,'name')}/>
                </div>

                <div className="form_element">
                   <input type="text"
                          placeholder="Enter author"
                          value={this.state.formData.author}
                          onChange={(event)=>this.handleInput(event,'author')}/>
                </div>

                <textarea name="review" value={this.state.formData.review}  onChange = {(event)=>this.handleInput(event,'review')}/>

                <div className="form_element">
                   <input type="text"
                          placeholder="Enter number of pages"
                          value={this.state.formData.pages}
                           onChange = {(event)=>this.handleInput(event,'pages')}/>
                </div>

                <div className="form_element">
                      <select  id="" value={this.state.formData.rating}
                       onChange = {(event)=>this.handleInput(event,'rating')}
                      >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                      </select>

                </div>

                <div className="form_element">
                   <input type="text"
                          placeholder="Enter price"
                          value={this.state.formData.price}
                          onChange = {(event)=>this.handleInput(event,'price')}/>
                </div>

                <button type="submit" >Edit Review</button>

                <div className="delete_post">
                    <div className="button"
                          onClick = {this.deleteBook}
                      >
                         Delete Review
                    </div>
                </div>



            </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    books : state.books
  }
}

export default connect(mapStateToProps)(EditBook);
