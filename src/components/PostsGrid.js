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
       Grid,
       Row,
       Col,
        Panel
  } from 'react-bootstrap';

  import { Link } from 'react-router';
  import TextTruncate from 'react-text-truncate';

  export default class  PostsGrid extends React.Component{
 constructor(props){
     super(props);
 }
 static propTypes={
		 title: React.PropTypes.string.isRequired,
     body: React.PropTypes.string.isRequired
	};
 render(){
   const lore = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
   const postData= this.props;
     return (

         <Col sm={6} md={3} className="fix-height">
          <Panel header={<h1>{postData.title}</h1>}>
            <TextTruncate
            line={4}
            truncateText="…"
            text={postData.body}
            textTruncateChild={<a href="#">Read more</a>}
            />
          </Panel>
          </Col>
     );
   }
}
