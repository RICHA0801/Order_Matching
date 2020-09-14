import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import { Link} from 'react-router-dom';
import axios from "axios";
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,Button,TabContent,TabPane,Row,Col,
  Form,FormGroup,Input,Label,Card, Container,UncontrolledCollapse,CardHeader,
  CardBody,InputGroupAddon,InputGroupText,InputGroup} from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PageFooter from './PageFooter.js';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [pwdLogin, setPwdLogin] = useState('');

  const StyleTab = {border:'none', color:'#5dbcd2', borderBottom:'5px solid #5dbcd2'}

  const HoverStyleLogin = {border:'white', outline: 'none', color:'#6E6E6E', width:"50%", marginLeft:'25%'}
  const [hoverStyleLogin, setHoverStyleLogin] = useState(0);
  const toggleHoverLogin = style => {
    if(hoverStyleLogin !== style) setHoverStyleLogin(style);
  }

  const HoverStyleReg = {border:'white', outline: 'none', color:'#6E6E6E', width:"50%", marginLeft:'25%'}
  const [hoverStyleReg, setHoverStyleReg] = useState(0);
  const toggleHoverReg = style => {
    if(hoverStyleReg !== style) setHoverStyleReg(style);
  }

  return (
    <div className="form">
      <Nav tabs style={{marginTop:'2%'}}>
        <NavItem style={{width:'50%', cursor:'pointer', fontWeight:'bold'}} onMouseEnter={() => { toggleHoverLogin(!hoverStyleLogin); }} onMouseLeave={() => { toggleHoverLogin(!hoverStyleLogin); }}>
          <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={(activeTab === '1')?StyleTab:((hoverStyleLogin)?HoverStyleLogin:{color:'#6E6E6E'})}>
            LOGIN
          </NavLink>
        </NavItem>
        <NavItem style={{width:'50%', cursor:'pointer', fontWeight:'bold'}} onMouseEnter={() => { toggleHoverReg(!hoverStyleReg); }} onMouseLeave={() => { toggleHoverReg(!hoverStyleReg); }}>
          <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={(activeTab === '2')?StyleTab:((hoverStyleReg)?HoverStyleReg:{color:'#6E6E6E'})}>
            REGISTER
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>

        <TabPane tabId="1" style={{marginTop: '10%'}}>
          <Form>
             <FormGroup row>
               <Label for="email" sm={2}>Email</Label>
               <Col sm={10}>
                 <Input type="email" name="email" id="emailLogin" placeholder="marss@ubs.com" onChange={event => setEmailLogin(event.target.value)}/>
               </Col>
             </FormGroup>
             <FormGroup row>
               <Label for="password" sm={2}>Password</Label>
               <Col sm={10}>
                 <Input type="password" name="password" id="passwordLogin" placeholder="Enter your password" onChange={event => setPwdLogin(event.target.value)}/>
               </Col>
             </FormGroup>
          </Form>
          <Button color="info" outline style={{marginTop:'2%', marginBottom:'2%'}} onClick={()=>{
            var dataValid = false;
            var errors=[];
            var emLoginValid = false;
            var pwdLoginValid = false;
            if(emailLogin === ""){
              errors.push("Email cannot be blank");
            } else {
              emLoginValid = true;
            }

            if ( pwdLogin === "") {
              errors.push("Password cannot be blank");
            } else {
              pwdLoginValid = true;
            }

            dataValid = emLoginValid && pwdLoginValid;

            if(dataValid) {
              axios.get(`http://localhost:1337/login`).then(res => {
                const data = res.data.rows;
                console.log(data);
                console.log(data[0].email);
                console.log(emailLogin);
                var emFound = false;
                var pwCorrect = false;
                var formValid = false;
                var id;

                for(var row = 0; row<data.length; row++) {
                  if(data[row].email === emailLogin) {
                    emFound = true;
                    console.log('Email found');
                    if(data[row].pwd === pwdLogin) {
                      pwCorrect = true;
                      id = data[row].user_id;
                    } else {
                      errors.push("Incorrect email id or password");
                    }
                    break;
                  }
                }
                if(emFound === false) {
                  errors.push("Incorrect email id or password");
                }

                formValid = emFound && pwCorrect;
                console.log(formValid);

                if(formValid) {
                  window.location = `/Shares?id=${id}`;
                } else {
                  var ul = document.createElement('ul');
                  document.getElementById('errors').innerHTML="";
                  document.getElementById('errors').appendChild(ul);
                  errors.forEach(function (err) {
                    let li = document.createElement('li');
                    ul.appendChild(li);
                    li.innerHTML += err;
                  });
                }

              }).catch(err => {
                  console.log(err);
              });
            } else {
              var ul = document.createElement('ul');
              document.getElementById('errors').innerHTML="";
              document.getElementById('errors').appendChild(ul);
              errors.forEach(function (err) {
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML += err;
              });
            }

          }}>SIGN IN</Button>
          <p id="errors" style={{textAlign: 'left', marginLeft:'25%', marginTop:'5%'}}></p>
        </TabPane>

        <TabPane tabId="2" style={{marginTop: '10%'}}>
          <Form style={{marginLeft:'-10%'}}>
            <FormGroup row>
              <Label for="email" sm={4}>Email</Label>
              <Col sm={8}>
                <Input type="email" name="email" id="emailRegister" placeholder="marss@ubs.com" onChange={event => setEmail(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={4}>Name</Label>
              <Col sm={8}>
                <Input type="text" name="name" id="name" placeholder="Enter your name" onChange={event => setName(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="passwordRegister" placeholder="Enter your password" onChange={event => setPassword(event.target.value)}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4}>Confirm Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="passwordRegisterConfirm" placeholder="Confirm your password" onChange={event => setConfirmPassword(event.target.value)}/>
              </Col>
            </FormGroup>
            <Row form style={{marginTop:'5%', marginRight:'-15%'}} inline>
             <Col md={6}>
               <FormGroup row style={{marginLeft: '12%'}}>
                 <Label for="contact" style={{marginTop:'1%'}}>Contact</Label>
                 <Col md={9}>
                  <Input type="text" name="contact" id="contact" placeholder="Enter your number" onChange={event => setContact(event.target.value)}/>
                 </Col>
               </FormGroup>
             </Col>
             <Col md={6}>
               <FormGroup row style={{marginRight: '-12%'}}>
                 <Label for="gender" style={{marginTop:'1%'}}>Gender</Label>
                 <Col md={7}>
                   <Input type="select" name="gender" id="gender" style={{cursor:'pointer'}} onChange={event => setGender(event.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </Input>
                </Col>
               </FormGroup>
             </Col>
           </Row>
          </Form>
          <Button style={{marginTop: '2%'}} color="info" outline onClick = {() => {
            var dataValid=false;
            var errors=[];
            document.getElementById('errors1').innerHTML="";
            var conValid = false;
            var con = /[1-9]+[0-9]+/;
            if(con.test(contact) && contact.length === 10) {
                conValid=true;
            } else if(contact === ""){
              errors.push("Contact is a mandatory field.");
            } else {
              errors.push("Invalid contact number.");
            }

            var emValid = false;
            var em = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(em.test(email)) {
                emValid=true;
            } else if(email === ""){
              errors.push("Email is a mandatory field.");
            } else {
              errors.push("Invalid email id.");
            }

            var pwdValid = false;
            var pwd = /^[A-Za-z0-9]\w{7,14}$/;
            if(pwd.test(password) && password.length >= 8 && password===confirmPassword) {
                pwdValid=true;
            } else if(password === ""){
              errors.push("Password is a mandatory field.");
            } else if (password !== confirmPassword) {
              errors.push("Confirmed Password doesn't match Password");
            } else {
              errors.push("Password should be atleast 8 characters and contain atleast a number.");
            }

            dataValid = conValid && emValid && pwdValid;

            if(dataValid) {
                const data = {
                    name : name,
                    contact : contact,
                    email : email,
                    gender : gender,
                    password : password
                }
                console.log(data);
                axios.post('http://localhost:1337/login',data).then(res=>{
                  console.log(res);
                  //console.log(res.data);
                  var id = res.data.rows[0].user_id;
                  console.log(id);
                  window.location = `/Shares?id=${id}`;
                }).catch(error => {console.log(error)});
            } else {
              var ul = document.createElement('ul');
              document.getElementById('errors1').innerHTML="";
              document.getElementById('errors1').appendChild(ul);
              errors.forEach(function (err) {
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML += err;
              });
            }
          }}>SIGN UP</Button>
          <p id="errors1" style={{textAlign: 'left', marginLeft:'20%', marginTop:'5%'}}></p>
        </TabPane>
      </TabContent>
    </div>
  );
}

const Reg = () => {
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button className="btn-neutral btn-icon mr-4" color="default" href="#pablo" onClick={e => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require("./assets/img/icons/common/github.svg")}/>
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={e => e.preventDefault()}>
                <span className="btn-inner--icon">
                  <img alt="..." src={require("./assets/img/icons/common/google.svg")}/>
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="new-email"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password"/>
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" id="customCheckRegister" type="checkbox"/>
                    <label className="custom-control-label" htmlFor="customCheckRegister">
                      <span className="text-muted">I agree with the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

const NavigationBar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require("./logo.png")} />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/"><img alt="..." src={require("./assets/img/brand/logo.png")}/></Link>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/Login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link} target="_blank" href="https://github.com/ShambhaviSarin/Order_Matching">
                  <FontAwesomeIcon icon={faGithub}/><span className="nav-link-inner--text">Github</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

const Register = () => {
  return(
    <>
    <div className="main-content" style={{background:'#172b4d'}}>
      <NavigationBar />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <div className="separator separator-bottom separator-skew zindex-100" style={{height:'500%'}}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="fill-default" points="0,100 2560,100 2560,20" />
          </svg>
        </div>
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Reg/>
        </Row>
      </Container>
    <PageFooter />
    </div>
    </>
);
}

/*
<NavItem>
  <NavLink className="nav-link-icon" to="/admin/user-profile" tag={Link}>
    <i className="ni ni-single-02" />
    <span className="nav-link-inner--text">Profile</span>
  </NavLink>
</NavItem>
}*/

export default Register;
