let countdown;

function startTimer() {

    // Hide Start button
    document.getElementById("startBtn").style.display = 'none'

    // Change chicken image to study mode
    const chicken = document.getElementById('chickenImg');
    chicken.src ="../assets/ChickenStudy.png";

    // Show the timer
    document.getElementById("timer").style.display = 'block';

    //Reset and start the countdown
    clearInterval(countdown);
    const timerDisplay = document.getElementById("timer");
    let timeLeft = 60;

    countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

        if (timeLeft <= 0) {
        clearInterval(countdown);
        }

        timeLeft--;
    }, 1000);
}

// Add event listeners for custom window controls
const minimizeBtn = document.getElementById("minimizeBtn");
const closeBtn = document.getElementById("closeBtn");

// Minimize the window
minimizeBtn.addEventListener("click", () => {
  window.electron.minimize(); // Send message to minimize window
});

// Close the window
closeBtn.addEventListener("click", () => {
  window.electron.close(); // Send message to close window
});