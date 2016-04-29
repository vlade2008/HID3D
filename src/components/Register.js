import React from 'react';
import {Well} from 'react-bootstrap'

export default  class Register extends React.Component{

 render(){
      const wellStyle={
        width:400,
        height:500,
        marginLeft:'auto',
        marginRight:'auto'  
      };
    return (
          <div className="container">
            <Well style={wellStyle}>
            <legend>Please Register</legend>
            </Well>
         </div>
    );
 }
 }