import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../actions';
import BookItem from '../widgets/book_item';


class HomeContainer extends Component {

  componentWillMount () {
    this.props.dispatch(getBooks(1,0,'desc'))
  }
  renderItems = (books) =>(
    books.list ?
    books.list.map( (book,i) => (
      <BookItem key={i} {...book} />
    )) :
    null
  )

  loadmore = () => {
    let count = this.props.books.list.length;
    this.props.dispatch(getBooks(1,count,'desc',this.props.books.list))
  }

  render() {

    return (
      <div>
          {this.renderItems(this.props.books)}
          <div className="loadmore"
             onClick={this.loadmore}
            >
            LoadMore
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books:state.books
  }
}

export default connect(mapStateToProps)(HomeContainer);
