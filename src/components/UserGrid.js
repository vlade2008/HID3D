import React from 'react';

  import { Link } from 'react-router';
  import TextTruncate from 'react-text-truncate';

  export default class  UserGrid extends React.Component{
 constructor(props){
     super(props);
 }
 static propTypes={
		 name: React.PropTypes.string.isRequired,
	};

 render(){
   const usersData = this.props;
     return (

         <tr>
           <td>{usersData.name}</td>
         </tr>
     );
   }
}
