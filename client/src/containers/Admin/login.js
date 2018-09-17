import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from  '../../actions';


class Login extends Component {

  state = {
    password:'',
    email:'',
    error:'',
    success:''
  }
  handleInputEmail = (event) => {
    this.setState({ email:event.target.value })
  }
  handleInputPassword = (event) => {
    this.setState( {password:event.target.value} )
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.user.login.isAuth) {
      this.props.history.push('/');
    }
  }

  submitForm = (e)=>{
      e.preventDefault();
      this.props.dispatch(loginUser(this.state))
  }
  render (){

    return (
      <div className="rl_container">

         <form action="" onSubmit={this.submitForm}>
             <h2>Login Here </h2>
             <div className="form_element">
                  <input type="email"
                         value={this.state.email}
                         onChange={this.handleInputEmail}
                         placeholder="Enter your email"/>
             </div>

             <div className="form_element">
                  <input type="password" value={this.state.password} onChange={this.handleInputPassword}
                   placeholder="Enter your password" />
             </div>
             <button type="submit">Login</button>

             <div className="error">
                  {
                    this.props.user.login ?
                         <div>{this.props.user.login.message}</div>
                         : null
                  }

             </div>
         </form>

      </div>
    )
  }
}

const mapStateToProps = (state) =>{

  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(Login);
