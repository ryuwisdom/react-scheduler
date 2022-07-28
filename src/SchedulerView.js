import React from 'react'
import axios from 'axios';

const getCalendar = ()=> {
    const url = window.location.href
    const paramsString = new URLSearchParams(url)
    const token = paramsString.get('access_token')
    console.log(paramsString.get('access_token'))
    console.log(paramsString.get('code'))
     axios.get(`https://www.googleapis.com/auth/calendar/v2/files?access_token= Bearer &{token}`)
        .catch((res)=> {
            console.log(res)
        })
         .catch((err)=> {
             console.log(err)
         })
}

const SchedulerView = () => {
    getCalendar()
    return (
        <div>SchedulerView page</div>
    )

}

export default SchedulerView