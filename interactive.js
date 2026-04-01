let events = {};
let currentDayCell = null;

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("eventModal");

    // Make sure modal is hidden on page load
    modal.style.display = "none";

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

                // clear inputs
                document.getElementById("eventTitle").value = "";
                document.getElementById("eventDesc").value = "";
                document.getElementById("eventTime").value = "";

                // only now show the modal
                modal.style.display = "flex";
            });
        }
    });

    // close modal when clicking outside
    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
