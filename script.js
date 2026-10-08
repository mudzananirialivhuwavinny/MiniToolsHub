/* =========================
   CALCULATOR
========================= */

const display = document.getElementById("display");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;


function addToDisplay(value) {

    if (!display) {
        return;
    }

    const operators = ["+", "-", "*", "/"];

    if (operators.includes(value)) {

        if (display.value === "" && value !== "-") {
            return;
        }

        if (operator && !waitingForSecondNumber) {
            calculate();
        }

        firstNumber = display.value;
        operator = value;
        waitingForSecondNumber = true;

        return;
    }

    if (value === ".") {

        if (waitingForSecondNumber) {
            display.value = "0";
            waitingForSecondNumber = false;
        }

        if (display.value.includes(".")) {
            return;
        }
    }

    if (waitingForSecondNumber) {
        display.value = "";
        waitingForSecondNumber = false;
    }

    display.value += value;
}


function clearDisplay() {

    if (!display) {
        return;
    }

    display.value = "";
    firstNumber = "";
    operator = "";
    waitingForSecondNumber = false;
}


function deleteLast() {

    if (!display) {
        return;
    }

    display.value = display.value.slice(0, -1);
}


function calculate() {

    if (!display || !operator || firstNumber === "") {
        return;
    }

    const first = Number(firstNumber);
    const second = Number(display.value);

    if (Number.isNaN(first) || Number.isNaN(second)) {
        display.value = "Error";
        return;
    }

    let result;

    switch (operator) {

        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":

            if (second === 0) {
                display.value = "Error";
                firstNumber = "";
                operator = "";
                waitingForSecondNumber = false;
                return;
            }

            result = first / second;
            break;

        default:
            return;
    }

    display.value = String(result);

    firstNumber = "";
    operator = "";
    waitingForSecondNumber = true;
}


/* =========================
   WORD COUNTER
========================= */

const textInput = document.getElementById("textInput");

if (textInput) {

    textInput.addEventListener("input", function () {

        const text = textInput.value;

        const words = text.trim() === ""
            ? []
            : text.trim().split(/\s+/);

        document.getElementById("wordCount").textContent =
            words.length;

        document.getElementById("characterCount").textContent =
            text.length;

    });
}


/* =========================
   TIMER
========================= */

let timerInterval = null;
let timerSeconds = 300;

const timerDisplay = document.getElementById("timerDisplay");


function updateTimerDisplay() {

    if (!timerDisplay) {
        return;
    }

    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


function startTimer() {

    if (!timerDisplay) {
        return;
    }

    if (timerInterval !== null) {
        return;
    }

    const minutesInput =
        document.getElementById("minutesInput");

    const secondsInput =
        document.getElementById("secondsInput");

    if (timerSeconds === 300) {

        const minutes =
            Number(minutesInput.value) || 0;

        const seconds =
            Number(secondsInput.value) || 0;

        timerSeconds =
            (minutes * 60) + seconds;

        if (timerSeconds <= 0) {
            timerSeconds = 300;
        }
    }

    updateTimerDisplay();

    timerInterval = setInterval(function () {

        if (timerSeconds <= 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            updateTimerDisplay();

            return;
        }

        timerSeconds--;

        updateTimerDisplay();

    }, 1000);
}


function pauseTimer() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);
        timerInterval = null;

    }
}


function resetTimer() {

    pauseTimer();

    timerSeconds = 300;

    const minutesInput =
        document.getElementById("minutesInput");

    const secondsInput =
        document.getElementById("secondsInput");

    if (minutesInput) {
        minutesInput.value = "";
    }

    if (secondsInput) {
        secondsInput.value = "";
    }

    updateTimerDisplay();
}


updateTimerDisplay();


/* =========================
   PASSWORD GENERATOR
========================= */

function generatePassword() {

    const output =
        document.getElementById("passwordOutput");

    if (!output) {
        return;
    }

    const length =
        Number(
            document.getElementById("passwordLength").value
        );

    const includeNumbers =
        document.getElementById("includeNumbers").checked;

    const includeSymbols =
        document.getElementById("includeSymbols").checked;

    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) {
        characters += "0123456789";
    }

    if (includeSymbols) {
        characters += "!@#$%^&*()_+-=[]{}";
    }

    if (length < 4 || length > 50) {
        output.value = "Choose 4-50 characters";
        return;
    }

    const randomValues =
        new Uint32Array(length);

    crypto.getRandomValues(randomValues);

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            randomValues[i] % characters.length;

        password += characters[randomIndex];
    }

    output.value = password;
}


function copyPassword() {

    const output =
        document.getElementById("passwordOutput");

    const message =
        document.getElementById("copyMessage");

    if (!output || output.value === "") {
        return;
    }

    navigator.clipboard.writeText(output.value);

    message.textContent =
        "Password copied!";

    setTimeout(function () {

        message.textContent = "";

    }, 2000);
}/* =========================
   AGE CALCULATOR
========================= */

function calculateAge() {

    const birthDateInput = document.getElementById("birthDate");
    const ageResult = document.getElementById("ageResult");

    if (!birthDateInput || !ageResult) {
        return;
    }

    if (birthDateInput.value === "") {
        ageResult.textContent = "Please enter your date of birth.";
        return;
    }

    const birthDate = new Date(birthDateInput.value + "T00:00:00");
    const today = new Date();

    if (birthDate > today) {
        ageResult.textContent = "Please enter a valid date of birth.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    ageResult.textContent =
        `You are ${years} years, ${months} months and ${days} days old.`;
   /* =========================
   PERCENTAGE CALCULATOR
========================= */

function calculatePercentage() {

    const percentageInput =
        document.getElementById("percentageValue");

    const numberInput =
        document.getElementById("percentageNumber");

    const result =
        document.getElementById("percentageResult");

    if (!percentageInput || !numberInput || !result) {
        return;
    }

    const percentage = Number(percentageInput.value);
    const number = Number(numberInput.value);

    if (
        percentageInput.value === "" ||
        numberInput.value === ""
    ) {
        result.textContent = "Please enter both values.";
        return;
    }

    const answer = (percentage / 100) * number;

    result.textContent =
        `${percentage}% of ${number} = ${answer}`;
}
