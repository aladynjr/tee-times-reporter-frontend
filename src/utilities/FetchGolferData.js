import React from 'react'
import globalVal from '../globalVal'

const FetchGolferData = async (golferUUID) => {
    try {
        const response = await fetch(`${globalVal.host}/api/golfer/uuid/${golferUUID}`);
        var jsonData = await response.json();

        if (jsonData?.golfer_preferences_list?.length) {
            //golfer_preferences_list is an array ocntains json objects, loop through and parse each object
            var preferences = []
            for (let i = 0; i < jsonData.golfer_preferences_list.length; i++) {
                preferences.push(JSON.parse(jsonData.golfer_preferences_list[i]))
            }
            jsonData.golfer_preferences_list = preferences

        }

        return jsonData
    } catch (err) {
        console.error(err.message);
    }
}

export default FetchGolferData