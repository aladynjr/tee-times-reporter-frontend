import React from 'react'
import globalVal from '../globalVal'

const FetchCoursesData = async () => {
    try {
        const response = await fetch(`${globalVal.host}/api/course/`);
        const jsonData = await response.json();

        return jsonData 

    } catch (err) {
        console.error(err.message);
    }
}

export default FetchCoursesData