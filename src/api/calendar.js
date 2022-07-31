import axios from 'axios';

const getCalendar = (minDate, maxDate, setPlanOfThisWeek)=> {
    const url = window.location.href
    const paramsString = new URLSearchParams(url)
    const token = paramsString.get('access_token')

    axios.get('https://www.googleapis.com/calendar/v3/calendars/c_uifli5n6o7avp8390627v8rh08@group.calendar.google.com/events', {
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

// const createEvent =

export default getCalendar


// export class GoogleCalendarApi {
//
//     constructor(token) {
//         this.token = t
//     }
//
//     getCalendar = (token)=> {
//
//         const url = window.location.href
//         const paramsString = new URLSearchParams(url)
//         const token = paramsString.get('access_token')
//         console.log(paramsString.get('access_token'))
//         console.log(paramsString.get('code'))
//         axios.get('https://www.googleapis.com/calendar/v3/calendars/c_uifli5n6o7avp8390627v8rh08@group.calendar.google.com', {
//             headers : {
//                 Authorization : 'Bearer ' + token
//             }
//         })
//             .then((res)=> {
//                 console.log(res.data)
//             })
//             .catch((err)=> {
//                 console.log(err)
//             })
//
//     }
//
// }

