import React, { useState } from 'react';
import { Typography } from 'antd';
import Navbar from "./Navbar"
import { db, storage } from "../firebase";

const { Title } = Typography;

const Newrequest = ({ simplified }) => {
  const [vehicle, setVehicle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact,setContact]= useState('');
  const [image, setimage] = useState(null);
  
  
  function addRequest(e) {
    
    e.preventDefault();
    const uploadimage=storage.ref(`images/${image.name}`)    
    .put(image);
    
    uploadimage.on('state_changed',
    (snapshot)=>{
     
     },
     (error)=>{console.log(error);}
      ,
    ()=>storage.ref('images')
    .child(image.name)
    .getDownloadURL()
    .then((imageurl)=>{
      db.collection("requests").add({
        status: "mechanic arriving",
        contact:contact,
        vehicle: vehicle,
        description: description,
        location: location,
        imagename:image.name,
        imageurl:imageurl
      });
    })
    
  );
    setVehicle("");
    setDescription("");
    setLocation("");
    setimage(null);

    alert("request is creted successfully")
  }


  return (
    <>
     <div className="row" >
     <div className="col-2">
       <Navbar />
     </div>
     <div className="col-8">
     <Title level={2} style={{textDecoration :"underline", margin:"2em 0 1em 15em",color:"#1890ff"}}>Add Request</Title>
      <div className="create">
      
      <form>
      <label>Contact</label>
        <input 
          type="text" 
          required 
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          
        />
        <label>Vehicle</label>
        <input 
          type="text" 
          required 
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
        <label>Service description</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Location</label>
        <textarea
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></textarea>
        <input type="file" style={{color:"white"}}       
        onChange={(e) => setimage(e.target.files[0])}></input>
        <button             
            type="submit"
            variant="contained"
            onClick={addRequest}>
              Create Request
        </button>
      </form>
      </div>
     </div></div>
     
      
    </>
  );
};

export default Newrequest;
