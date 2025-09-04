function getTimeArray() {
    let time = new Date(), hours = time.getHours(), minutes = time.getMinutes();
    let colFormatArray = Array.from(hours.toString().padStart(2, '0') + minutes.toString().padStart(2, '0'));
    return colFormatArray;
}

function clockConstructor(timeArrayResult) {
    document.querySelectorAll(".dot").forEach(function (dot) {
        dot.remove();
    });

    for (i = 0; i < Number(timeArrayResult[0]); i++) {
        let newDot = `<div class="dot"></div>`;
        document.querySelector(".col-1").insertAdjacentHTML("beforeend", newDot);
    }
    for (i = 0; i < Number(timeArrayResult[1]); i++) {
        let newDot = `<div class="dot"></div>`;

        document.querySelector(".col-2").insertAdjacentHTML("beforeend", newDot);
    }
    for (i = 0; i < Number(timeArrayResult[2]); i++) {
        let newDot = `<div class="dot"></div>`;
        document.querySelector(".col-3").insertAdjacentHTML("beforeend", newDot);
    }
    for (i = 0; i < Number(timeArrayResult[3]); i++) {
        let newDot = `<div class="dot"></div>`;

        document.querySelector(".col-4").insertAdjacentHTML("beforeend", newDot);
    }

    document.querySelectorAll(".col:not(.col-divider)").forEach(function (col) {
        if (col.querySelector(".dot")) {
            col.querySelector(".dot-zero").classList.add("hidden");
        } else {
            col.querySelector(".dot-zero").classList.remove("hidden");
        };
    });
}

function initClock(refreshFrequencySeconds) {
    clockConstructor(getTimeArray());
    setInterval(() => {
        clockConstructor(getTimeArray());
    }, refreshFrequencySeconds * 1000);
}
initClock(10);