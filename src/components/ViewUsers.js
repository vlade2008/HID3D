import React from 'react';
import {Well,
      Table,Button,
      Nav,
      NavItem,
      Grid,
      Row,
      Col,
      PageHeader
  } from 'react-bootstrap'
import axios from 'axios';
import UserGrid from './UserGrid';
import ramda from 'ramda';

export default class ViewUsers extends React.Component{

    constructor(props){
        super(props);
    }

    state={
      usersData:[],
      mytodo:''
    };


    static contextTypes = {
    router: React.PropTypes.object


  };

    componentDidMount(){

          axios.get('http://jsonplaceholder.typicode.com/users',this.state)
            .then((result)=>{

               var data = result.data;

                

                this.setState({
                   usersData:data,
                   data:data
                });
            })
            .catch((error)=>{

            });
    }

  onSearch=(e)=>{
    const value = e.target.value;
     if (value.length === 0) {
       this.setState({
          usersData:this.state.data
       });
       return;
     }
     var k = ramda.filter((obj)=>{
       return (obj.name.indexOf(value) > -1);
     }, this.state.usersData);
     this.setState({
      usersData:k
      });
  }

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
                <Nav bsStyle="pills" activeKey={3} onSelect={this.handleSelect.bind(this)}>
                 <NavItem eventKey={1}>Home</NavItem>
                 <NavItem eventKey={2}>Album</NavItem>
                 <NavItem eventKey={3} >Users</NavItem>
               </Nav>
                <PageHeader><small>Users</small></PageHeader>
                 <Grid>
                   <Row className="show-grid">
                     <Col xs={12} md={8}>
                      <h5>Search Users</h5>
                       <input className="searchInput" type="text" placeholder="Search"
                              onChange={this.onSearch}
                               />
                     </Col>
                     <Col xs={6} md={4}>
                       <Table bordered condensed>
                         <tbody>
                           {this.state.usersData.map((usersData,i)=>
                             <UserGrid
                             name={usersData.name}
                             key={i}/>
                           )}
                         </tbody>
                       </Table>
                      </Col>
                   </Row>
                 </Grid>
           </div>
         );
    }
}
