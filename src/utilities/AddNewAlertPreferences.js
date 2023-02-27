import React from 'react'
import globalVal from '../globalVal'
import FetchGolferData from './FetchGolferData'


const AddNewAlertPreferences = async (golferData, setGolferData, preferences, golferUUID, setAddNewAlertError, ShowNotification) => {

    const CheckForDuplicateAlerts = () => {
        setAddNewAlertError('')
        var golferPreferencesList = golferData?.golfer_preferences_list

        //check that none of the preferences are the same as preferences state without comparing each element in the object
        var duplicateFound = false
        golferPreferencesList?.forEach((golferPreference) => {
            if (JSON.stringify(golferPreference) === JSON.stringify(preferences)) duplicateFound = true
        }
        )

        return duplicateFound
    }

    if (CheckForDuplicateAlerts()) {
        setAddNewAlertError('You already have an alert with these preferences')
        return
    }


    //setAddNewAlertLoading(true)
    setAddNewAlertError('')


    try {
        let response = await fetch(`${globalVal.host}/api/golfer/preferences/add`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: golferData?.golfer_id, preferences: preferences })
        })
        console.log('%c alert preferences added successfully ', 'color: green')
        ShowNotification('Alert created!', 'success')
        const newGolferData = await FetchGolferData(golferUUID)
        setGolferData(newGolferData)


    }
    catch (e) {
        console.log("error when trying to add alert preferences ")
        console.log(e.message)
        setAddNewAlertError(e.message)
    }
    finally {
        // setAddNewAlertLoading(false)
    }
}


export default AddNewAlertPreferences