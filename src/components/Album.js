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
  import PhotoGrid from './PhotoGrid';
  import axios from 'axios';

export default class Album extends React.Component{

    constructor(props){
        super(props);

    }

    state={

      albumData:[]
    };


    static contextTypes = {
    router: React.PropTypes.object
  };

    componentDidMount(){

             axios.get('http://jsonplaceholder.typicode.com/photos')
               .then((result)=>{

                  var data = result.data;



                   this.setState({
                      albumData:data.splice(0,100)
                   });
               })
               .catch((error)=>{

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
              <Nav bsStyle="pills" activeKey={2} onSelect={this.handleSelect.bind(this)}>
               <NavItem eventKey={1}>Home</NavItem>
               <NavItem eventKey={2}>Album</NavItem>
               <NavItem eventKey={3} >Users</NavItem>
             </Nav>

             <PageHeader><small>Album</small></PageHeader>
             <Grid>
               <Row className="show-grid">
                   {this.state.albumData.map((postData,i)=>
                     <PhotoGrid body={postData.body}
                     title={postData.title}
                     id={postData.id}
                     url={postData.url}
                     thumbnailUrl={postData.thumbnailUrl}
                     key={i}
                     albumId={postData.albumId}/>
                   )}

               </Row>
             </Grid>
           </div>
      )}
}
