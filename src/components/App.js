import React from 'react';
import {
       Well,
       FormGroup,
       ControlLabel,
       FormControl,
       HelpBlock,
       Button,
       ButtonGroup,
       Nav,
       NavItem,
       PageHeader,
       Grid,
       Row,
       Col

  } from 'react-bootstrap';

  import { Link } from 'react-router';
  import PostsGrid from './PostsGrid';
  import axios from 'axios';

export default  class App extends React.Component{
 constructor(props){
     super(props);
 }
 state={

   postData:[]
 };
 componentDidMount(){

       axios.get('http://jsonplaceholder.typicode.com/posts',this.state)
         .then((result)=>{

            var data = result.data;

             

             this.setState({
                postData:data
             });
         })
         .catch((error)=>{

         });
 }

  static contextTypes = {
    router: React.PropTypes.object
  };

 handleSelect(selectedKey) {

  switch (selectedKey) {
    case 1:
      this.context.router.push("/");
      break;
    case 2:
      this.context.router.push("/album")
      break;
    case 3:
      this.context.router.push("/viewusers")
      break;
    default:
    return;

  }
}

 render(){
      return (
         <div className="container">
         <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect.bind(this)}>
          <NavItem eventKey={1}>Home</NavItem>
          <NavItem eventKey={2}>Album</NavItem>
          <NavItem eventKey={3} >Users</NavItem>
        </Nav>
        <PageHeader><small>Post</small></PageHeader>
        <Grid>
          <Row className="show-grid">
              {this.state.postData.map((postData,i)=>
                <PostsGrid body={postData.body}
                title={postData.title}
                id={postData.id}
                userID={postData.userID}
                key={i}/>
              )}

          </Row>
        </Grid>
         {/*<Well style={wellStyle}>
         <legend>Please Login</legend>
         <form>
          <FormGroup>
            <ControlLabel>Enter Username</ControlLabel>
            <FormControl
                type="text"
                placeholder="Enter your username"
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
         </FormGroup>
         <FormGroup>
            <ControlLabel>Enter Password</ControlLabel>
            <FormControl
                type="password"
                placeholder="Enter your password"
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
         </FormGroup>
         <div className="btncontainer">
         <ButtonGroup>
            <Button bsStyle="primary" type="submit">Login</Button>
            <Button bsStyle="info" type="button"
                    onClick={this.goToRegister.bind(this)}
                    >Register</Button>
            <Button bsStyle="warning" type="button" onClick={this.viewUsers.bind(this)}>View Users</Button>
         </ButtonGroup>
         </div>
         </form>
         </Well>*/}
         </div>
     );
 }


}
