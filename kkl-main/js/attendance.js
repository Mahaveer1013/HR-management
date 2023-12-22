
let todayAttendanceTable = document.querySelector("table.today-attendance-table")

let tableHead = todayAttendanceTable.querySelector("thead");
let tableBody = todayAttendanceTable.querySelector("tbody");

const employeeData = [
    { empid: "#0001",  date:"13-12-2023",status:"A", empname: "John Doe", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:05 AM", empouttime: "05:10 PM" },
    { empid: "#0002",  date:"13-12-2023",status:"P", empname: "Jane Doe", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:02 AM", empouttime: "04:08 PM" },
    { empid: "#0003",  date:"13-12-2023",status:"A", empname: "Alice Smith", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:07 AM", empouttime: "04:55 PM" },
    { empid: "#0004",  date:"13-12-2023",status:"P", empname: "Bob Johnson", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:01 AM", empouttime: "05:12 PM" },
    { empid: "#0005",  date:"13-12-2023",status:"A", empname: "Eve Williams", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:10 AM", empouttime: "05:20 PM" },
    { empid: "#0006",  date:"13-12-2023",status:"P", empname: "Charlie Brown", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:03 AM", empouttime: "05:11 PM" },
    { empid: "#0007",  date:"13-12-2023",status:"A", empname: "Lucy Miller", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:12 AM", empouttime: "05:18 PM" },
    { empid: "#0008",  date:"13-12-2023",status:"P", empname: "David Davis", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:06 AM", empouttime: "05:14 PM" },
    { empid: "#0009",  date:"13-12-2023",status:"A", empname: "Grace White", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:04 AM", empouttime: "04:19 PM" },
    { empid: "#0010", date:"13-12-2023",status:"P", empname: "Frank Black", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:15 AM", empouttime: "05:25 PM" },
    { empid: "#0011", date:"13-12-2023",status:"A", empname: "Helen Adams", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:09 AM", empouttime: "05:13 PM" },
    { empid: "#0012", date:"13-12-2023",status:"P", empname: "Ivan Foster", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:11 AM", empouttime: "04:37 PM" },
    { empid: "#0013", date:"13-12-2023",status:"A", empname: "Jessica Brown", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:08 AM", empouttime: "05:16 PM" },
    { empid: "#0014", date:"13-12-2023",status:"P", empname: "Kevin Taylor", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:13 AM", empouttime: "05:22 PM" },
    { empid: "#0015", date:"13-12-2023",status:"A", empname: "Laura Evans", shiftintime: "09:00 AM", shiftouttime: "05:00 PM", empintime: "09:14 AM", empouttime: "04:39 PM" },
];

function formatTime(hours, minutes) {
    return `${hours} hrs - ${minutes} mins`;
}

const workingHours = 8; // Assuming the working hours is 8 hours per day

function calculateLateBy(shiftInTime, empInTime) {
    const shiftInDateTime = new Date(`2000-01-01 ${shiftInTime}`);
    const empInDateTime = new Date(`2000-01-01 ${empInTime}`);
    const lateByMinutes = Math.max(0, empInDateTime - shiftInDateTime) / (1000 * 60);
    return lateByMinutes;
}

function calculateEarlyGo(shiftOutTime, empOutTime) {
    const shiftOutDateTime = new Date(`2000-01-01 ${shiftOutTime}`);
    const empOutDateTime = new Date(`2000-01-01 ${empOutTime}`);
    const earlyGoMinutes = Math.max(0, shiftOutDateTime - empOutDateTime) / (1000 * 60);
    return (earlyGoMinutes);
}

function calculateTotalDuration(empInTime, empOutTime) {
    const empInDateTime = new Date(`2000-01-01 ${empInTime}`);
    const empOutDateTime = new Date(`2000-01-01 ${empOutTime}`);

    if (isNaN(empInDateTime) || isNaN(empOutDateTime)) {
        return "Invalid input for total duration";
    }

    const totalDurationMinutes = (empOutDateTime - empInDateTime) / (1000 * 60);
    const totalDurationHours = Math.floor(totalDurationMinutes / 60);
    const remainingMinutes = Math.round(totalDurationMinutes % 60);
    return formatTime(totalDurationHours, remainingMinutes);
}

function calculateExtraTime(totalDuration) {
    let totalDurationMinutes;

    if (typeof totalDuration === 'string') {
        // If totalDuration is already in the "8 hrs - 5 mins" format, extract minutes
        const match = totalDuration.match(/(\d+) hrs - (\d+) mins/);
        if (match) {
            totalDurationMinutes = parseInt(match[1]) * 60 + parseInt(match[2]);
        } else {
            return "Invalid input for extra time";
        }
    } else {
        // If totalDuration is in minutes, use it directly
        totalDurationMinutes = totalDuration;
    }

    // Correct calculation for extra time
    const expectedWorkDuration = workingHours * 60;
    const extraTimeMinutes = totalDurationMinutes - expectedWorkDuration;
    const extraTimeHours = Math.floor(Math.abs(extraTimeMinutes) / 60);
    const remainingMinutes = Math.abs(extraTimeMinutes % 60);
    const sign = extraTimeMinutes >= 0 ? '+' : '-';
    
    return `${sign}${extraTimeHours} hrs - ${remainingMinutes} mins`;
}

// ... [previous code]

// Loop through each employee data
employeeData.forEach(employee => {
    const lateByMinutes = calculateLateBy(employee.shiftintime, employee.empintime);
    const earlyGoMinutes = calculateEarlyGo(employee.shiftouttime, employee.empouttime);
    const totalDuration = calculateTotalDuration(employee.empintime, employee.empouttime);
    const extraTime = calculateExtraTime(totalDuration);

    let status ;

    if (employee.status == "P") {
        status = `<i class="fas fa-check-circle"></i>`;
    }else if (employee.status == "A") {
        status = `<i class="fas fa-times-circle"></i>`;
    }else{
        status = `~`;
    }

    let tr = document.createElement("tr");

    tr.innerHTML = (`
        <td class="id">${employee.empid}</td>
        <td class="name">${employee.empname}</td>
        <td>${employee.date}</td>
        <td>${employee.shiftintime}</td>
        <td>${employee.shiftouttime}</td>
        <td>${employee.empintime}</td>
        <td>${employee.empouttime}</td>
        <td>${formatTime(parseInt(lateByMinutes/60), lateByMinutes % 60)}</td>
        <td>${formatTime(parseInt(earlyGoMinutes/60) , earlyGoMinutes % 60)}</td>
        <td>${totalDuration}</td>
        <td class="extra">${extraTime}</td>
        <td>${status}</td>
    `);

    document.querySelector(".today-attendance-table .tableBody").appendChild(tr);

});


let extraTd = todayAttendanceTable.querySelectorAll(".extra");

extraTd.forEach(extra => {
    if (extra.innerHTML[0] == "-") {
        extra.style.color = "red";
    }else if (extra.innerHTML[0] == "+") {
        extra.style.color = "green";
    } else {
        extra.style.color = "black";
    }
});


const attendance_table = document.querySelector(".attendance-table");

const tablerow = document.querySelectorAll(".filter tr");

const idsearch = document.getElementById("idsearch");

console.log(idsearch);

idsearch.addEventListener("input", () => {
    let input = idsearch.value;

    tablerow.forEach(row => {
        let id = row.querySelector(".id");
        if (id.innerHTML.toLowerCase() == input || id.innerHTML.toLowerCase().includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

});

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const totalDays = [31,28,31,30,31,30,31,31,30,31,30,31];
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getSaturdaysAndSundays(year) {
    const weekends = {};

    for (let month = 0; month < 12; month++) {
        let date = new Date(year, month, 1);
        weekends[monthNames[month]] = [];

        while (date.getMonth() === month) {
            if (date.getDay() === 0 || date.getDay() === 6) { // 0 = Sunday, 6 = Saturday
                weekends[monthNames[month]].push(formatDate(new Date(date)));
            }
            date.setDate(date.getDate() + 1);
        }
    }

    return weekends;
}

// Example usage for the year 2023
const weekendsByMonth = getSaturdaysAndSundays(2023);
// for (const [month, dates] of Object.entries(weekendsByMonth)) {
//     console.log(month + ":");
//     dates.forEach(dateString => console.log(dateString));
// }

let data = [];

function getForMonth(month) {
    // Convert the first letter to uppercase to match the format in weekendsByMonth
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    // Check if the month exists in the data
    if (weekendsByMonth.hasOwnProperty(formattedMonth)) {
        console.log(formattedMonth + ":");
        weekendsByMonth[formattedMonth].forEach(dateString => {
            const day = dateString.split('/')[0]; // Extract the day
            data.push(parseInt(day)); // Print the day
        });
    } else {
        console.log("No data for " + formattedMonth);
    }
}

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const currentdate = new Date();
const currentMonthString = months[currentdate.getMonth()];

getForMonth(currentMonthString);  // Replace "January" with the desired month

console.log(data);



// attendance.js

// Function to generate a random value for attendance ('a' or 'p')


// attendance.js

// Function to generate a random value for attendance ('a' or 'p')
function getRandomAttendance() {
    return Math.random() < 0.5 ? 'a' : 'p';
}

// Array of random names
const names = [
  'Alice', 'Bob', 'Charlie', 'David', 'Emma',
  'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'john', 'doe', 'ellise', 'ispum', 'lorem'
];

// Function to get a random name from the array
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

// Function to generate the attendance table
function generateAttendanceTable() {
    const table = document.querySelector('.attendance-table');
    const tbody = document.querySelector('.attendance-table tbody');
    const thead = document.querySelector('.attendance-table thead tr');

    for(let i=1; i<=31;i++){
        const th = document.createElement('th');
        th.innerHTML = i;
        thead.appendChild(th);
    }
    // Generate 10 rows with sno, roll no, and random names
    for (let i = 1; i <= 15; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="id">#${i.toString().padStart(4, '0')}</td>
            <td class="name">${names[i-1]}</td>
        `;

        // Generate 30 columns with random attendance data
        for (let j = 1; j <= 31; j++) {
            const td = document.createElement('td');
            const randomAttendance = getRandomAttendance();
            td.setAttribute('data-attendance', randomAttendance);
            // td.textContent = randomAttendance;
            if (data.includes(j)) {
                 td.innerHTML = 'H';
            }else{
                if (randomAttendance == 'p') {
                td.innerHTML = (
                    '<i class="fas fa-check-circle"></i>'
                );
            }else if (randomAttendance == "a") {
                td.innerHTML = (
                    '<i class="fas fa-times-circle"></i>'
                )
            }else{
                td.innerHTML = (
                    '-'
                )
            }
            }
            row.appendChild(td);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
}

// Call the function to generate the attendance table when the script is loaded
generateAttendanceTable();