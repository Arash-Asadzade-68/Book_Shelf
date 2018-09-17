import React , {Component} from 'react';
import {userRegister,getUsers} from '../../actions';
import {connect} from 'react-redux';



class Register extends Component  {

  state = {
    name:'',
    lastname:'',
    email:'',
    password:'',
    error:''
  }


  handleInputEmail = (event) =>{

    this.setState({email:event.target.value})

  }
  handleInputPassword = (event) =>{
    this.setState({password:event.target.value})
  }
  handleInputLastname = (event) =>{
    this.setState({lastname:event.target.value})
  }
  handleInputName = (event) =>{
    this.setState({name:event.target.value})
  }

  submitForm = (e) =>{
    e.preventDefault();
    this.props.dispatch(userRegister(
      {
        name:this.state.name,
        lastname:this.state.lastname,
        email:this.state.email,
        password:this.state.password
      },this.props.user.users))
  }
  componentWillMount () {
    this.props.dispatch (getUsers())
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.user.register == false){
       this.setState({error:'خطا در ثبت اطلاعات'})
    } else {
      this.setState({
        name:'',
        lastname:'',
        password:'',
        email:''
      })
    }      
  }
  showUsers = (users) =>(
    users ?
      users.map ( item =>(
        <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
        </tr>
      ))
    : null
  )
  render() {
    let users = this.props.user.users;
    return (
      <div className="rl_container">
         <form onSubmit={this.submitForm} >
             <h2>Add User</h2>
             <div className="form_element">
                <input type="text"
                       placeholder="Enter Name"
                       value={this.state.name}
                       onChange={this.handleInputName}
                />
            </div>
            <div className="form_element">
               <input type="text"
                      placeholder="Enter Lastname"
                      value={this.state.lastname}
                      onChange={this.handleInputLastname}
               />
           </div>
           <div className="form_element">
              <input type="email"
                     placeholder="Enter Email"
                     value={this.state.email}
                     onChange={this.handleInputEmail}
              />
          </div>
          <div className="form_element">
             <input type="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.handleInputPassword}
             />
         </div>
         <button type="submit">Add User</button>
         <div className="error">
             {this.state.error}
         </div>
         </form>

         <div className="current_users">
               <h4>Current Users</h4>
               <table>
                  <thead>
                      <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Email</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.showUsers(users)}
                  </tbody>
               </table>
         </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    user:state.user
  }
}

export default connect (mapStateToProps) (Register);
