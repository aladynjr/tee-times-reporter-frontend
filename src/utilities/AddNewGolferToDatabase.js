import React from 'react'
import globalVal from '../globalVal';
const AddNewGolferToDatabase = async (golfer_first_name,golfer_last_name,golfer_email, golfer_phone, golfer_uuid) => {

    try {
      const body = {
        golfer_first_name,
        golfer_last_name,
        golfer_email,
        golfer_phone,
        golfer_uuid
      };
      const response = await fetch(`${globalVal.host}/api/golfer`, {
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