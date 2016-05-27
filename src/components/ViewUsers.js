import React from 'react';
import {Well,
      Table,Button
  } from 'react-bootstrap'
import axios from 'axios';

export default class ViewUsers extends React.Component{
    
    constructor(props){
        super(props);
        
    }
    
    state={
      
      users:[]  
    };
    
    
    static contextTypes = {
    router: React.PropTypes.object
  };
    
    componentDidMount(){
        
         axios.get('/api/users',this.state)
            .then((result)=>{
               
               var data = result.data;
               
                this.setState({
                   users:data 
                });
            })
            .catch((error)=>{
                
            });
    }
   
   register(){
         this.context.router.push("/register");
   }
   
    render(){   
        
        
        var users = this.state.users.map((item,i)=>{
            
            return (
                <tr key={i}>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.gender}</td>
                    <td>{item.location}</td>   
                </tr>
            );
        });
        
        
        return (
              <div className="container">
            <Well>
              <legend>Registered Users</legend>
              <Table bordered condensed>          
                <thead>
                <tr>
                    <td>Username</td>
                    <td>Password</td>
                    <td>Lastname</td>
                    <td>Firstname</td>
                    <td>Gender</td>
                    <td>Location</td>
                </tr>
                </thead>
                <tbody>
                   {users}
                </tbody>
                
              </Table> 
              <Button bsStyle="primary" onClick={this.register.bind(this)}>Register New User</Button>
           </Well>
           </div>)      
    }
}