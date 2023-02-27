import React from 'react'
import globalVal from '../globalVal'
import FetchGolferData from './FetchGolferData'

const DeleteAlertPreferences = async (golferData, setGolferData, preferences, golferUUID, ShowNotification) => {
    try {
        let response = await fetch(`${globalVal.host}/api/golfer/preferences/delete`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: golferData?.golfer_id, preferences: preferences })
        })
        console.log('%c alert preferences deleted successfully ', 'color: green')
        const newGolferData = await FetchGolferData(golferUUID)
        setGolferData(newGolferData)
        ShowNotification('Alert deleted', 'success')


    }
    catch (e) {
        console.log("error when trying to delete alert preferences ")
        console.log(e.message)
        ShowNotification('Something went wrong with deleting Alert', 'error')

    }
    finally {
        // setAddNewAlertLoading(false)
    }
}

export default DeleteAlertPreferences