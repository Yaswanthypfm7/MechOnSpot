import React, { useState, useEffect  } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navbar from "./Navbar"
import { Typography, Row, Col } from 'antd';

import { db} from "../firebase";

const { Title } = Typography;
export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [requests, setRequests] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getRequests();
  }, []); // blank to run only on first launch

  useEffect(() => {
    getVehicles();
  }, []); // blank to run only on first launch
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  function getRequests() {
    db.collection("requests").onSnapshot(function (querySnapshot) {
      setRequests(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          vehicle: doc.data().vehicle,
          description: doc.data().description,
          location: doc.data().location,
          status: doc.data().status,
          contact:doc.data().contact,
          imageurl:doc.data().imageurl
        }))
      );
    });
    
  }

  function getVehicles() {
    
    db.collection("vehicles").onSnapshot(function (querySnapshot) {
      setVehicles(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          year: doc.data().year,
          model: doc.data().model,
          color: doc.data().color,
          maker: doc.data().maker
         
        }))
      );
    });
    
  }
  function deleteVehicle(id) {
   
    db.collection("vehicles").doc(id).delete();
 
 }
function getimage(imageurl){
 
    return(
     
     <img src={imageurl} alt="requestimage" width="100" height="100"></img> 
    )
 

}

  return (
    <>
     <div className="row" >
     <div className="col-2">
       <Navbar />
     </div>
     <div className="col-8">
     <div className="profile">
     <Card>
        <Card.Body>
      
          <h2 className="text-center">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}  
         <Link to="/update-profile" className="btn btn-primary ">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
</div>

      <Title level={2} style={{textDecoration :"underline",textAlign:'center',color:"#1890ff", opacity:"0.8"}}>YOUR REQUESTS</Title>
        <div style={{ maxWidth: "1050px", marginTop: "30px"}}>
            <Row gutter={[40, 40]} style={{ fontWeight: "bold", color:'white'}}>
              <Col span={5} style={{overflow:'hidden',textAlign:'center'}} > REQUEST ID </Col>
              <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> VEHICLE </Col>
              <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> DESCRIPTION </Col>
              <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> LOCATION </Col>
              <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> STATUS </Col>
              <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> CONTACT </Col>
              <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> IMAGE </Col>
            </Row>
          {requests.map((request) => (
          <Row gutter={[40, 40]} style={{ padding:"10px 0 0 0", color:"white"}}>
            <Col span={5} style={{opacity:'0.6',overflow:'wrap',textAlign:'center'}}> {request.id} </Col>
            <Col span={3} style={{opacity:'0.6',overflow:'wrap',textAlign:'center'}}> {request.vehicle} </Col>
            <Col span={3} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {request.description} </Col>
            <Col span={3} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}>  {request.location} </Col>
            <Col span={3} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {request.status} </Col>
            <Col span={3} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {request.contact} </Col>
            <Col span={3} style={{overflow:'hidden',textAlign:'center'}}> {getimage(request.imageurl)} </Col>
          </Row>
          ))}
        </div>
        <br/><hr/><br/>
        <Title level={2} style={{textDecoration :"underline",textAlign:'center',color:"#1890ff", opacity:"0.8"}}>YOUR VEHICLES INFORMATION</Title>
        <div style={{ maxWidth: "1050px", marginTop: "30px" }}>
            <Row gutter={[40, 40]} style={{ fontWeight: "bold",color:"white"}}>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> TITLE </Col>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> MAKER </Col>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> MODEL </Col>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> COLOR </Col>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> YEAR </Col>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> ACTION </Col>
            </Row>
            
          {
          vehicles.map((vehicle) => (
            
            <Row gutter={[40, 40]}  style={{padding:"20px", color:"white"}}> 
              <Col span={4} style={{opacity:'0.6', overflow:'hidden',textAlign:'center'}}> {vehicle.title} </Col>
              <Col span={4} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {vehicle.maker} </Col>
              <Col span={4} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {vehicle.model} </Col>
              <Col span={4} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {vehicle.color} </Col>
              <Col span={4} style={{opacity:'0.6',overflow:'hidden',textAlign:'center'}}> {vehicle.year} </Col>
              <Col span={4} style={{overflow:'hidden',textAlign:'center'}}> <button className="del" onClick={()=>deleteVehicle(vehicle.id)}>Delete</button> </Col>
            </Row>
          ))
          }
        
        </div>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
     </div>
     </div>
    </>
  )
}
