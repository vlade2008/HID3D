import React from 'react';
import {Well,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Radio,
    Checkbox,
    Button,
    ButtonGroup
  } from 'react-bootstrap'
import validation from 'react-validation-mixin'
import strategy from 'react-validatorjs-strategy'
import validatorjs  from 'validatorjs'
import classnames from 'classnames';
import axios from 'axios';


 class Register extends React.Component{

   constructor(props){
     super(props);
     this.state={
         movie:{}
     };



    this.validatorTypes = strategy.createInactiveSchema(
            {
                  username:'required',
                  password:'required',
                firstname:'required',
                lastname:'required',
                movie:'required|moviesrule'
            },
            {
                "required": "The field :attribute is required!"
            },
            (validator)=>{
                  validator.setAttributeNames({
                    lastname:'lastname',
                    firstname:'firstname'
                });
                validator.constructor.registerAsync('moviesrule',
                (movie, attribute, req, passes)=> {
                           var counter = 0;
                          for(var key in  movie){
                                   if(movie[key])
                                     counter++;
                             }
                          if(counter==0)
                            passes(false, 'Please select one movie');
                            else
                            passes();
                        });
            }
        );

 }


    static contextTypes = {
    router: React.PropTypes.object
  };


getValidatorData = ()=> {
        return this.state
    };


getClasses = (field)=>{
       return classnames({
            'success': this.props.isValid(field),
            'error': !this.props.isValid(field)
        });
 };


getErrorText=(field)=>{
        var error = this.props.errors[field];
        if(!error)
            return null;
        if(Array.isArray(error)){
            var message = [];
            message = error.map((item,i)=>{
                return(
                    <span key={i}>
                        {item}
                        <br/>
                    </span>
                )
            });
            return message;
        }
        else
            return  (<span>{error || ''}</span>);
    };



   onFormSubmit = (event)=>{
        event.preventDefault();
        this.props.validate(this.onValidate);
    };

   onValidate=(error)=>{
        if (error) {
            //form has errors; do not submit
        } else {

            axios.post('/api/users',this.state)
            .then((result)=>{
                this.setState({
                    username:'',
                    password:'',
                    lastname:'',
                    firstname:'',
                    gender:'',
                    location:''
                });
                alert('User is saved');
            })
            .catch((error)=>{
                 alert('User was not saved. Please check username duplication');
            });

        }
    };


activateValidation=(e)=> {
    strategy.activateRule(this.validatorTypes, e.target.name);
    this.props.handleValidation(e.target.name)(e);
};

viewUsers(){
     this.context.router.push("/viewusers");
}

  render(){
      const wellStyle={
         width:400,
         height:650,
         marginLeft:'auto',
         marginTop:'10px',
         marginRight:'auto'
      };
       return (
         <div classname="container">
         <Well style={wellStyle}>
         <legend>Please Register</legend>

         <form onSubmit={this.onFormSubmit} noValidate>

          <FormGroup validationState={this.getClasses('username')}>
         <ControlLabel>Username</ControlLabel>
         <FormControl
         type="text"
         name="username"
         placeholder="Enter your username"
         value={this.state.username || ''}
         onBlur={this.activateValidation}
         onChange={
           (e)=> this.setState({
                  username:e.target.value
                })
            }
         />
         <FormControl.Feedback/>
         <HelpBlock>{this.getErrorText('username')}</HelpBlock>
         </FormGroup>



           <FormGroup validationState={this.getClasses('password')}>
         <ControlLabel>Password</ControlLabel>
         <FormControl
         type="password"
         name="password"
         placeholder="Enter your password"
         value={this.state.password || ''}
         onBlur={this.activateValidation}
         onChange={
           (e)=> this.setState({
                  password:e.target.value
                })
            }
         />
         <FormControl.Feedback/>
         <HelpBlock>{this.getErrorText('password')}</HelpBlock>
         </FormGroup>




         <FormGroup validationState={this.getClasses('firstname')}>
         <ControlLabel>First Name</ControlLabel>
         <FormControl
         type="text"
         name="firstname"
         placeholder="Enter your first name"
         value={this.state.firstname || ''}
         onBlur={this.activateValidation}
         onChange={
           (e)=> this.setState({
                  firstname:e.target.value
                })
            }
         />
         <FormControl.Feedback/>
         <HelpBlock>{this.getErrorText('firstname')}</HelpBlock>
         </FormGroup>

         <FormGroup validationState={this.getClasses('lastname')}>
         <ControlLabel>Last Name</ControlLabel>
         <FormControl
         type="text"
         name="lastname"
         placeholder="Enter your last name"
         value={this.state.lastname || ''}
         onBlur={this.activateValidation}
         onChange={
           (e)=> this.setState({
                  lastname:e.target.value
                })
            }
         />
         <FormControl.Feedback/>
         <HelpBlock>{this.getErrorText('lastname')}</HelpBlock>
         </FormGroup>
         <ControlLabel>Sex</ControlLabel>
         <FormGroup>
      <Radio  inline name="gender" value="Male"
      checked={this.state.gender === 'Male'}
      onClick={
        ()=>{
            this.setState({'gender':'Male'})
        }
      }
      >Male</Radio>
      <Radio  inline name="gender" value="Female"
       checked={this.state.gender === 'Female'}
        onClick={
        ()=>{
            this.setState({'gender':'Female'})
        }
      }
      >Female</Radio>
      </FormGroup>
      <ControlLabel>Favorite Movie</ControlLabel>
      <FormGroup validationState={this.getClasses('movie')}>
      <Checkbox  inline checked={this.state.movie['harry'] === 1}
                 onClick={()=>{
                     var movie  = this.state.movie;
                     if(movie['harry'] === 1)
                        movie['harry'] = undefined;
                      else
                        movie['harry'] = 1;

                        this.setState({
                            movie:movie
                        });
                 }}
                 >Harry Potter</Checkbox>
      <Checkbox  inline
                 checked={this.state.movie['star'] === 1}
                 onClick={()=>{
                     var movie  = this.state.movie;
                     if(movie['star'] === 1)
                        movie['star'] = undefined;
                      else
                        movie['star'] = 1;

                          this.setState({
                            movie:movie
                        });
                 }}>Star Wars</Checkbox>
        <HelpBlock>{this.getErrorText('movie')}</HelpBlock>
      </FormGroup>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Location in Bohol</ControlLabel>
        <FormControl componentClass="select"
          value={this.state.location || ''}
          onChange={
            (e)=>this.setState({
              location:e.target.value
            })
          }
          placeholder="select">
         <option value="">...</option>
         <option value="lila">Lila</option>
         <option value="loay">Loay</option>
         <option value="loboc">Loboc</option>
         <option value="loon">Loon</option>
         <option value="dimiao" >Dimao</option>
         <option value="valencia">Valencia</option>
        </FormControl>
        </FormGroup>


          <div className="button">
          <ButtonGroup>
         <Button bsStyle="success" type="submit">Submit</Button>
         <Button bsStyle="info" type="reset">Reset</Button>
          <Button bsStyle="warning" type="button" onClick={this.viewUsers.bind(this)}>View Users</Button>
         </ButtonGroup>
         </div>
         </form>

         </Well>
         </div>
       );
  }
}


export default  validation(strategy)(Register);
