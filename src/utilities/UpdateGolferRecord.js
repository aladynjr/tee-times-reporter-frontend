import React from 'react'
import globalVal from '../globalVal'

const UpdateGolferRecord = async (id, columns, new_values) => {
    //update duration inside db using PUT with route /api/dashboard 

    try {
        let response = await fetch(`${globalVal.host}/api/golfer`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, columns: columns, new_values: new_values })
            //body: JSON.stringify({ id: [1], column: ["download_thumbnail_duration"], new_value: [(totalDuration) / 1000] })
        })
        console.log('%c golfer  updated successfully ', 'color: green')


    } catch (e) {
        console.log("error when trying to update download ")
        console.log(e)

    }

}

export default UpdateGolferRecord