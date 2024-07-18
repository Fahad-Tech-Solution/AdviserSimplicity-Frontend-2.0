import React from "react";
import { Card } from "react-bootstrap";
import NewAllClients from "../Components/Assets/AllClients/NewAllClients";

function AllClients() {

  return (
    <div className="row justify-content-center">
      <div className="col-md-9">
        <Card className='custom_Shadow p-3'>
          <h5 className='PoppinsFamily green_Text fw-bold text-center fs-4'>Select Clients</h5>
          <NewAllClients />
        </Card>
      </div>
    </div>
  );
}

export default AllClients;
