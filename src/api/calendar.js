import axios from 'axios';
const calId = 'YOUR_CALENDAR_ID'

export const getCalendar = (minDate, maxDate, setPlanOfThisWeek)=> {
    const url = window.location.href
    const paramsString = new URLSearchParams(url)
    const token = paramsString.get('access_token')
    localStorage.setItem('token', token)


    axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calId}/events`, {
        headers : {
            Authorization : 'Bearer ' + token
        },
        params: {
            timeMax : maxDate.toDate(),
            timeMin : minDate.toDate()
        }
    })
        .then((res)=> {
            setPlanOfThisWeek(res.data.items);
            console.log(res.data)

        })
        .catch((err)=> {
            console.log(err)
        })

}

export const handleSubmit = (e, summary, description, location,  startDateTime, endDateTime,setEventAddModalOpen, reloadCalendar ) => {
    e.preventDefault()

    let token = localStorage.getItem('token')

    axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/${calId}/events`,
        {
            'start': {
                'dateTime': startDateTime + ":00+09:00",
                'timeZone': 'Asia/Seoul'
            },
            'end': {
                'dateTime': endDateTime + ":00+09:00",
                'timeZone': 'Asia/Seoul'
            },
            "description" : description,
            "summary":summary,
            "location": location,
        },
        {
            headers: { Authorization: 'Bearer ' + token }
        }).then(res=> {
        console.log(res)
        reloadCalendar()
        setEventAddModalOpen(false)
        alert('일정이 추가되었습니다.')

    })
        .catch(err=> console.log(err))
}


