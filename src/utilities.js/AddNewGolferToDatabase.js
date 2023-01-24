import React from 'react'

const AddNewGolferToDatabase = async (golfer_first_name,golfer_last_name,golfer_email, golfer_uuid) => {

    try {
      const body = {
        golfer_first_name,
        golfer_last_name,
        golfer_email,
        golfer_uuid
      };
      const response = await fetch(/*HOST*/"http://localhost:8080/api/golfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      // window.location = "/";

        console.log(response);
    } catch (err) {
      console.error(err.message);
    }
   // window.location.reload(false);
  
  };
  

export default AddNewGolferToDatabase