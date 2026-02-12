let highestZ = 10;

function updateTime() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'short' });
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("datetime").textContent = `${day} ${time}`;
}

setInterval(updateTime, 1000);
updateTime();

const terminalIcon = document.getElementById("terminalIcon");
const terminalWindow = document.getElementById("terminalWindow");
const closeTerminal = document.getElementById("closeTerminal");

terminalIcon.addEventListener("click", () => {
    terminalWindow.classList.remove("hidden");
    terminalWindow.style.zIndex = ++highestZ;

    if (window.innerWidth <= 768) {
        windowElement.style.top = "40px";
        windowElement.style.left = "0px";
    }

});

closeTerminal.addEventListener("click", () => {
    terminalWindow.classList.add("hidden");
});

terminalIcon.addEventListener("click", () => {
    terminalWindow.classList.remove("hidden");
    const firstCommand = terminalWindow.querySelector(".command");
    firstCommand.focus();
});


const notepadIcon = document.getElementById("notepadIcon");
const notepadWindow = document.getElementById("notepadWindow");
const closeNotepad = document.getElementById("closeNotepad");

notepadIcon.addEventListener("click", () => {
    notepadWindow.classList.remove("hidden");
    notepadWindow.querySelector(".notepad-body").focus();

    if (window.innerWidth <= 768) {
        windowElement.style.top = "40px";
        windowElement.style.left = "0px";
    }
});

closeNotepad.addEventListener("click", () => {
    notepadWindow.classList.add("hidden");
});

const terminalContent = document.getElementById("terminalContent");

document.addEventListener("keydown", function(e) {
    const active = document.activeElement;

    if (active.classList.contains("command") && e.key === "Enter") {
        e.preventDefault();

        const commandText = active.innerText.trim().toLowerCase();
        handleCommand(commandText);

        active.contentEditable = false;

        createNewPrompt();
    }
});

function handleCommand(cmd) {

    const output = document.createElement("div");
    output.classList.add("terminal-output");

    switch (cmd) {

        case "help":
            output.innerHTML = `
                whoami<br>
                projects<br>
                skills<br>
                contact<br>
                resume<br>
                clear
            `;
            break;

        case "whoami":
            output.innerHTML = "Akarsh Gupta, AI Engineer at NTT DATA (AI Automation & Development";
            break;

        case "projects":
            output.innerHTML = "• Machine Learning Models<br>• Excel automations with Macros<br>• Aria X: Doc AI - Knowledge Graph Based RAG Bot<br>• Vendor Performance Analysis<br>• Torotalk: Language Learning App";
            break;

        case "skills":
            output.innerHTML = "Python | Bash Scripting | LLMs | Automation | System Design | Excel | Web Dev | Powershell";
            break;

        case "contact":
            output.innerHTML = "Email: akaxsh@proton.me.com<br>GitHub: linkedin.com/in/akarshh<br>GitHub: github.com/akarshguptaa";
            break;

        case "resume":
            window.open("resume.pdf", "_blank");
            return;

        case "clear":
            document.getElementById("terminalContent").innerHTML = "";
            createNewPrompt();
            return;

        default:
            output.innerHTML = `command not found: ${cmd}`;
    }

    terminalContent.appendChild(output);
}

function createNewPrompt() {

    const newLine = document.createElement("div");
    newLine.classList.add("terminal-line");

    newLine.innerHTML = `
        <span class="prompt">akarsh@portfolio:~$ </span>
        <span class="command" contenteditable="true"></span>
    `;

    terminalContent.appendChild(newLine);
    newLine.querySelector(".command").focus();
}


const editor = document.getElementById("editor");
const lineNumbers = document.getElementById("lineNumbers");

editor.addEventListener("input", updateLineNumbers);

function updateLineNumbers() {
    const lines = editor.innerText.split("\n").length;
    lineNumbers.innerHTML = "";

    for (let i = 1; i <= lines; i++) {
        lineNumbers.innerHTML += i + "<br>";
    }
}

const filesIcon = document.getElementById("filesIcon");
const explorer = document.getElementById("fileExplorerWindow");
const closeExplorer = document.getElementById("closeExplorer");

filesIcon.addEventListener("click", () => {
    explorer.classList.remove("hidden");

    if (window.innerWidth <= 768) {
        windowElement.style.top = "40px";
        windowElement.style.left = "0px";
    }
});

closeExplorer.addEventListener("click", () => {
    explorer.classList.add("hidden");
});


const pdfFile = document.getElementById("pdfFile");
const pdfWindow = document.getElementById("pdfWindow");
const closePdf = document.getElementById("closePdf");

pdfFile.addEventListener("click", () => {
    pdfWindow.classList.remove("hidden");
});

closePdf.addEventListener("click", () => {
    pdfWindow.classList.add("hidden");
});

document.querySelectorAll(".window").forEach(win => {
    win.addEventListener("mousedown", () => {
        win.style.zIndex = ++highestZ;
    });
});


document.querySelectorAll(".window").forEach(win => {

    const header = win.querySelector(".window-header");
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;

        // bring to front
        win.style.zIndex = ++highestZ;

        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);
    });

    function drag(e) {
        if (!isDragging) return;

        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);
    }

});

const powerButton = document.getElementById("powerButton");
const lockScreen = document.getElementById("lockScreen");
const lockTime = document.getElementById("lockTime");

powerButton.addEventListener("click", () => {
    lockScreen.classList.remove("hidden");
});


lockScreen.addEventListener("click", () => {
    lockScreen.classList.add("hidden");
});

function updateLockTime() {
    const now = new Date();
    lockTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

setInterval(updateLockTime, 1000);

const firefoxIcon = document.getElementById("firefoxIcon");

const browserWindow = document.getElementById("browserWindow");
const closeBrowser = document.getElementById("closeBrowser");
const browserInput = document.getElementById("browserInput");

firefoxIcon.addEventListener("click", () => {
    browserWindow.classList.remove("hidden");
    browserWindow.style.zIndex = ++highestZ;
    browserInput.focus();
});

closeBrowser.addEventListener("click", () => {
    browserWindow.classList.add("hidden");
});

browserInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {

        let value = browserInput.value.trim();

        if (value === "") return;

        // If it looks like a domain (contains a dot)
        if (value.includes(".")) {

            if (!value.startsWith("http")) {
                value = "https://" + value;
            }

            window.open(value, "_blank");

        } else {
            // Otherwise treat it as a search query
            const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(value);
            window.open(searchUrl, "_blank");
        }
    }
});


document.querySelectorAll(".shortcut").forEach(btn => {
    btn.addEventListener("click", () => {
        const link = btn.getAttribute("data-link");
        window.open(link, "_blank");
    });
});



const volumeButton = document.getElementById("volumeButton");
const batteryButton = document.getElementById("batteryButton");
const volumePopup = document.getElementById("volumePopup");
const batteryPopup = document.getElementById("batteryPopup");

volumeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    volumePopup.classList.toggle("hidden");
    batteryPopup.classList.add("hidden");
});

batteryButton.addEventListener("click", (e) => {
    e.stopPropagation();
    batteryPopup.classList.toggle("hidden");
    volumePopup.classList.add("hidden");
});

// Close popups if clicking anywhere else
document.addEventListener("click", () => {
    volumePopup.classList.add("hidden");
    batteryPopup.classList.add("hidden");
});
const wifiButton = document.getElementById("wifiButton");
const wifiPopup = document.getElementById("wifiPopup");

wifiButton.addEventListener("click", (e) => {
    e.stopPropagation();
    wifiPopup.classList.toggle("hidden");
    volumePopup.classList.add("hidden");
    batteryPopup.classList.add("hidden");
});

// Close popups when clicking elsewhere
document.addEventListener("click", () => {
    wifiPopup.classList.add("hidden");
});

document.querySelectorAll(".window").forEach(win => {

    const handle = win.querySelector(".resize-handle");

    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    handle.addEventListener("mousedown", (e) => {
        e.stopPropagation(); // prevent drag conflict
        isResizing = true;

        startX = e.clientX;
        startY = e.clientY;
        startWidth = win.offsetWidth;
        startHeight = win.offsetHeight;

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
    });

    function resize(e) {
        if (!isResizing) return;

        win.style.width = Math.max(300, startWidth + (e.clientX - startX)) + "px";
        win.style.height = Math.max(200, startHeight + (e.clientY - startY)) + "px";

    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
    }

});

const placesButton = document.getElementById("placesButton");
const placesMenu = document.getElementById("placesMenu");

placesButton.addEventListener("click", (e) => {
    e.stopPropagation();
    placesMenu.classList.toggle("hidden");
});

document.addEventListener("click", () => {
    placesMenu.classList.add("hidden");
});

const userCards = document.querySelectorAll(".user-card");
const welcomeBox = document.getElementById("welcomeBox");
const welcomeText = document.getElementById("welcomeText");
const loginScreen = document.getElementById("loginScreen");
const desktop = document.getElementById("desktop");

userCards.forEach(card => {
    card.addEventListener("click", () => {

        const username = card.getAttribute("data-user");

        // Immediately hide user selection + clock
        document.querySelector(".users").style.display = "none";
        loginClock.style.display = "none";

        // Set welcome text
        welcomeText.textContent = "Welcome " + username;

        // Show welcome state
        welcomeBox.classList.remove("hidden");

        setTimeout(() => {
            welcomeBox.classList.add("show");
        }, 20);

        // Fade out whole screen
        setTimeout(() => {
            loginScreen.style.opacity = "0";
        }, 1500);

        // Fully switch to desktop
        setTimeout(() => {
            loginScreen.style.display = "none";
            desktop.classList.remove("hidden");
        }, 2000);

    });
});



const loginClock = document.getElementById("loginClock");

function updateLoginClock() {
    const now = new Date();
    loginClock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

setInterval(updateLoginClock, 1000);
updateLoginClock();

