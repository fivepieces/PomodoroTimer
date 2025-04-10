let countdown;
let breakCountdown;
let breakAmount = 0;

const timerSound = new Audio('../assets/Quack.mp3');

function startTimer() {

    // Hide Start button
    document.getElementById("startBtn").style.display = 'none'

    //Play sounds
    timerSound.play();

    // Change the body background when chicken is sleeping
    document.body.style.backgroundImage = "url('../assets/Sprite-0004.png')";

    // Change chicken image to study mode
    const chicken = document.getElementById('chickenImg');
    chicken.src ="../assets/ChickenStudy.png";

    // Show the timer
    document.getElementById("timer").style.display = 'block';

    //Reset and start the countdown
    clearInterval(countdown);
    const timerDisplay = document.getElementById("timer");
    let timeLeft = 25 * 60;

    countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

        if (timeLeft <= 0) {
        clearInterval(countdown);
        //show the break button after the timer ends
        document.getElementById("breakBtn").style.display = 'block';
        timerSound.play();
        }

        timeLeft--;
    }, 1000);
}

function startBreak() {
    //Hide the Break Time button after its clicked
    document.getElementById('breakBtn').style.display ='none';

    //Change chicken image to sleeping mode
    const chicken = document.getElementById('chickenImg');
    chicken.src = "../assets/ChickenSleep.png";

    //Add the sleeping-chicken class to the image to increase the size
    chicken.classList.add('sleeping-chicken');

    // Change the body background when chicken is sleeping
    document.body.style.backgroundImage = "url('../assets/Sprite-0003.png')";

    // Show the timer
    document.getElementById("timer").style.display = 'block';

    // Determine if the break is a 5-minute or 15-minute break
    let breakTimeLeft = (breakAmount >= 2) ? 15 * 60 : 5 * 60; // 15 minutes after 2 breaks
    breakAmount++;

    //Reset and start the countdown
    clearInterval(breakCountdown);
    const timerDisplay = document.getElementById("timer");

    breakCountdown = setInterval(() => {
        const minutes = Math.floor(breakTimeLeft /60);
        const seconds = breakTimeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

        if(breakTimeLeft <= 0) {
            clearInterval(breakCountdown);

            if (breakAmount >= 3) {
                breakAmount = 0; // Reset breakAmount after 15-minute break
            }

            timerSound.play();
            document.getElementById("startBtn").style.display = 'block'
        }

        breakTimeLeft--;
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