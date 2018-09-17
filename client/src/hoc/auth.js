import React , {Component} from 'react';
import {auth} from '../actions';
import {connect} from 'react-redux';


export default (ComposedClass , reload) => {
   class AuthenticationCheck extends Component {
     state={
       loader:true
     }
     componentWillMount () {
       this.props.dispatch(auth());
     }
     componentWillReceiveProps(nextProps) {
        this.setState({loader:false})

        if(!nextProps.user.login.isAuth){
          if(reload)
            this.props.history.push('/login')
        }else {
          if(reload === false){
            this.props.history.push('/user')
          }

        }
     }

     render () {
       if(this.state.loader) {
            return   <div className="loader">Loading...</div>
       }
       return (
         <ComposedClass {...this.props} user={this.props.user} />
       )
     }
   }
   const mapStateToProps = (state) => {
     return {
       user : state.user
     }
   }

   return connect (mapStateToProps)(AuthenticationCheck);
}
