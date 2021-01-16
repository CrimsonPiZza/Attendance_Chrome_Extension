let student_List = {
}


document.getElementById("getAttendee_Btn").addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "list_attendees"}, function(response) {
    });
    });
})

document.getElementById("clear-attendance-btn").addEventListener("click", function(){
    unCheckedAllAttendee()
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension : " + request.message);
      if (request.message == "list_attendees"){
        attendanceCheck(request.attendee_list)
      }
    });

function buildAttendeeList(students,cleared){
    let attendee_box = document.getElementById("attendee-box")
    if (cleared){
        attendee_box.innerHTML = ""
    }
    for (let s in students){
        let div_1 = document.createElement("div")
        div_1.setAttribute("class", "pl-2 pr-2 pt-2")
        div_1.setAttribute("id", s)

        let div_2 = document.createElement("div")
        if (student_List[s] == true){
            div_2.setAttribute("class", "rounded green darken-1 white-text d-flex")
        }else{
            div_2.setAttribute("class", "rounded red darken-1 white-text d-flex")
        }

        let span = document.createElement("span")
        span.setAttribute("class", "pl-2 mr-auto")
        span.textContent = s

        let a = document.createElement("a")
        a.setAttribute("class", "white-text pr-2")
        let i = document.createElement("i")
        i.setAttribute("class", "fas fa-eraser")

        a.appendChild(i)
        
        div_2.appendChild(span)
        div_2.appendChild(a)

        div_1.appendChild(div_2)

        attendee_box.appendChild(div_1)
    }
}

function addNewAttendeeToList(attendees){
    attendees.forEach( s => {
        let attendee_box = document.getElementById("attendee-box")
        let div_1 = document.createElement("div")
        div_1.setAttribute("class", "pl-2 pr-2 pt-2")
        div_1.setAttribute("id", s)

        let div_2 = document.createElement("div")
        div_2.setAttribute("class", "rounded amber darken-1 white-text d-flex")


        let span = document.createElement("span")
        span.setAttribute("class", "pl-2 mr-auto")
        span.textContent = s

        let a = document.createElement("a")
        a.setAttribute("class", "white-text pr-2")
        let i = document.createElement("i")
        i.setAttribute("class", "fas fa-eraser")

        a.appendChild(i)
        
        div_2.appendChild(span)
        div_2.appendChild(a)

        div_1.appendChild(div_2)

        attendee_box.appendChild(div_1)

        student_List[s] = true
    });
}

function attendanceCheck(attendees){
    let newAttendees = []
    attendees.forEach((s) => {
        let attendee_box = document.querySelector(`div[id=attendee-box] > div[id='${s}'] > div`)
        if ( attendee_box  != null){
            student_List[s] = true
            attendee_box.setAttribute("class", "rounded green darken-1 white-text d-flex")
        }else{
            newAttendees.push(s)
        }
    })
    addNewAttendeeToList(newAttendees)
    saveClassData(student_List)
    setPresentNum()
}

function retrieveClassData(){
    return JSON.parse(localStorage.getItem('class'))
}

function setPresentNum(){
    let attendee_summary = document.getElementById("attendance-summary")
    let presents = 0
    let attendees = retrieveClassData()
    for (let s in attendees){
        if ( attendees[s] == true){
            presents++
        }
    }
    attendee_summary.textContent = `Present ${presents} / ${Object.keys(attendees).length}`
}

function unCheckedAllAttendee(){
    let currentAttendees = retrieveClassData()
    let newAttendees = {}
    for ( s in currentAttendees){
        newAttendees[s] = false
        let attendee_box = document.querySelector(`div[id=attendee-box] > div[id='${s}'] > div`)
        attendee_box.setAttribute("class", "rounded red darken-1 white-text d-flex")
    }
    saveClassData(newAttendees)
    setPresentNum()
}

function saveClassData(classMembers){
    localStorage.setItem("class",JSON.stringify(classMembers))
}

function convertToJson(arr){
    let json_arr = {}
    arr.forEach( x => {
        json_arr[x] = "false"
    })
    return json_arr
}

function setAttendanceDate(){
    let date_box = document.getElementById("attendance-date")
    let d = new Date()
    let month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    date_box.textContent = `Attendance - ${d.getDate()}-${month[d.getMonth()]}-${d.getFullYear()}`
}

function startUp(){
    student_List = retrieveClassData()
    setAttendanceDate()
    setPresentNum()
    buildAttendeeList(student_List,true)
}

startUp()