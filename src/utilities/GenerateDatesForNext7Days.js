import React from 'react'

function GenerateDatesForNext7Days(date) {
    //receive a date like 01-27-2023 then geenrate dates for the following days, the first one should be 01-28-2023, the last one should be 02-03-2023
    var dates = []
    for (var i = 0; i < 7; i++) {
        //convert date to 2023-01-27
        //date = date.split('-')[1] + "-" + date.split('-')[0] + "-" + date.split('-')[2]
        // console.log(date)
        var newDate = new Date(date.split('-')[2], date.split('-')[0] - 1, date.split('-')[1])
        // var newDate = new Date(date.split('-')[0],date.split('-')[1]-1,date.split('-')[2] )
        newDate.setDate(newDate.getDate() + i)

        //output in form of 01-28-2023
        var month = newDate.getMonth() + 1
        //if month is 1 digit, add 0 using padding
        month = month.toString().padStart(2, '0') //if month is 1 digit, add 0 using padding
        var day = newDate.getDate()
        day = day.toString().padStart(2, '0') //if day is 1 digit, add 0 using padding
        var year = newDate.getFullYear()
        newDate = year + "-" + month + "-" + day


        dates.push(newDate)
    }
    return dates

}

export default GenerateDatesForNext7Days