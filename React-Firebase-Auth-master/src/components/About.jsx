import React from 'react';
import '../App.css';
import Navbar from "./Navbar"
const About = () => {


   return ( 
       <>
       <div className='whole'>
       <div className="row" >
     <div className="col-2">
       <Navbar />
     </div>
     <div className="col-8">
     <b> <h2 style={{textDecoration :"underline",textAlign:"center", color:"#1890ff", opacity:"0.8"}}>ABOUT</h2></b>
      <div className="about"  style={{color :"white"}}>
     <p>This website helps the users to add their own cars to the account and also helps to raise a request 
      on their problem along with a photo and description. </p> 

    <p>The goal is to help the users with any mechanical problems they face with thier vehicle.</p> 
    <hr/>
<p><b>CONTACT: </b>+1 92929222291</p>
<p><b>EMAIL: </b> mechonspot@gmail.com</p>
<p><b>OFFICE ADDRESS: </b> 350 East Armour Blvd, Kansas City, Missouri- 64111</p>

      </div>
     </div>
   
     </div> </div>
      </>  );
}
export default About;
