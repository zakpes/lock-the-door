(function() {
    const bodyEl = document.body;
    const tapSection = document.querySelector("#js-ltdTapSection");
    const unlocked = document.querySelector("#js-ltdUnlocked");
    const locked = document.querySelector("#js-ltdLocked");
    let tapDisabled = false;
    let doorIsLocked;

    const modeBtn = document.querySelector("#js-ltdModeBtn");
    const darkModeBtn = document.querySelector("#js-darkModeBtn");
    const lightModeBtn = document.querySelector("#js-lightModeBtn");

    const confirmationModal = document.querySelector("#js-ltdConfirmationModal");
    const confirmationModalBtnYes = document.querySelector("#js-ltdCmBtnYes");
    const confirmationModalBtnNo = document.querySelector("#js-ltdCmBtnNo");

    modeBtn.addEventListener("click", function() {
        toggleDarkMode();
        setLocalStorage("Dark mode", "active", "inactive");
    });

    // check if the door is locked on load
    document.addEventListener("DOMContentLoaded", function() {
        let locStor = localStorage.getItem("Door is locked") || "";
        let locStorDarkMode = localStorage.getItem("Dark mode") || "";

        if (locStor && locStor === "locked") {
            locked.classList.toggle("active");
            unlocked.classList.toggle("active");
            doorIsLocked = true;
        } else {
            doorIsLocked = false;
        }

        // check for dark mode
        if (locStorDarkMode && locStorDarkMode === "active") {
            toggleDarkMode();
        }
    });

    // toggle dark mode
    function toggleDarkMode() {
        darkModeBtn.classList.toggle("active");
        lightModeBtn.classList.toggle("active");
        bodyEl.classList.toggle("dark-mode");
    }

    // lock/unlock the door on tap
    tapSection.addEventListener("click", function() {
        if (tapDisabled) return;

        if (doorIsLocked) {
            locked.classList.toggle("active");
            unlocked.classList.toggle("active");
            tapDisabled = true;
            doorIsLocked = false;
            setLocalStorage("Door is locked", "locked", "unlocked");
            console.log({doorIsLocked});
            
            setTimeout(function() {
                tapDisabled = false;
            }, 1000);
        } else {
            confirmationModal.classList.add("active");
            
        }
    });

    // confirmation modal btns event listeners
    confirmationModalBtnYes.addEventListener("click", function() {
        locked.classList.toggle("active");
        unlocked.classList.toggle("active");
        tapDisabled = true;
        doorIsLocked = true;
        setLocalStorage("Door is locked", "locked", "unlocked");
        confirmationModal.classList.remove("active");
        console.log({doorIsLocked});
        
        setTimeout(function() {
            tapDisabled = false;
        }, 1000);
    });
    
    confirmationModalBtnNo.addEventListener("click", function() {
        confirmationModal.classList.remove("active");
        return;
    });

    // set local storage
    function setLocalStorage(name, val1, val2 = false) {
        let locStor = localStorage.getItem(name);
        
        if (locStor && locStor === val1) {
            localStorage.setItem(name, val2);
        } else {
            localStorage.setItem(name, val1);
        }
        
        // console.log(localStorage.getItem(name));
    }

    function removeLocalStorage(name) {
        localStorage.removeItem(name);
    }
})();
