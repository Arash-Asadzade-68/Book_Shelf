import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook ,clearBook} from '../../actions';

class AddBook extends Component {

  state = {
     formData :{
      name:'',
      author:'',
      review:'',
      pages:'',
      rating:'',
      price:''
     }
  }
  formSubmit = (e) =>{
    e.preventDefault();

    this.props.dispatch(addBook({
      ...this.state.formData,
      ownerId:this.props.user.login.id
    }))
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
  showNewBook = (book) =>(

     book.post ?
          <div className="conf_link">
              Cool !!  <Link to={`/books/${book.bookId}`} >
              Click the link to see the post
              </Link>
          </div>
      :null
  )

  componentWillUnmount (){
    this.props.dispatch(clearBook());
  }
  render() {
    return (
      <div className="rl_container article">
            <form onSubmit={this.formSubmit}>
                <h2>Add A Review</h2>
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

                <button type="submit" >Add Review</button>

                {
                  this.props.books.newBook ? this.showNewBook(this.props.books.newBook)  : null
                }

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

export default connect(mapStateToProps)(AddBook);
