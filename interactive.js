let events = {};
let currentDayCell = null;

document.addEventListener("DOMContentLoaded", () => {

    // Ensure modal starts hidden
    document.getElementById("eventModal").style.display = "none";

    const dayCells = document.querySelectorAll(".calendar tbody td");

    dayCells.forEach(cell => { 
        const day = cell.textContent.trim();

        if (day !== "") { 
            cell.addEventListener("click", () => {
                currentDayCell = { cell, day };
                const eventList = document.getElementById("eventList");
                eventList.innerHTML = "";

                if (events[day]) {
                    events[day].forEach(ev => {
                        const li = document.createElement("li");
                        li.textContent = `${ev.time} - ${ev.title}: ${ev.desc}`;
                        eventList.appendChild(li);
                    });
                }

                document.getElementById("eventTitle").value = "";
                document.getElementById("eventDesc").value = "";
                document.getElementById("eventTime").value = "";

                document.getElementById("eventModal").style.display = "flex";
            });
        }
    });

    document.getElementById("addEventBtn").addEventListener("click", () => {
        let title = document.getElementById("eventTitle").value.trim();
        let desc  = document.getElementById("eventDesc").value.trim();
        let time  = document.getElementById("eventTime").value.trim();

        if (!title || !desc || !time) {
            alert("Please fill in all fields.");
            return;
        }

        if (!events[currentDayCell.day]) {
            events[currentDayCell.day] = [];
        }

        let timeClash = events[currentDayCell.day].some(ev => ev.time === time);
        if (timeClash) {
            alert("An event already exists at this time. Please choose a different time.");
            return;
        }

        events[currentDayCell.day].push({ title, desc, time });

        if (!currentDayCell.cell.querySelector(".eventDot")) {
            let dot = document.createElement("div");
            dot.classList.add("eventDot");
            currentDayCell.cell.appendChild(dot);
        }

        const eventList = document.getElementById("eventList");
        const li = document.createElement("li");
        li.textContent = `${time} - ${title}: ${desc}`;
        eventList.appendChild(li);

        document.getElementById("eventTitle").value = "";
        document.getElementById("eventDesc").value = "";
        document.getElementById("eventTime").value = "";
    });

    document.getElementById("eventModal").addEventListener("click", e => {
        if (e.target.id === "eventModal") {
            document.getElementById("eventModal").style.display = "none";
        }
    });
});
