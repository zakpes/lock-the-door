(function() {
    const tapSection = document.querySelector("#js-ltdTapSection");
    const unlocked = document.querySelector("#js-ltdUnlocked");
    const locked = document.querySelector("#js-ltdLocked");
    let tapDisabled = false;
    let doorIsLocked = false;

    tapSection.addEventListener("click", function() {
        if (tapDisabled) return;

        if (doorIsLocked) {
            // confirm("Is the door unlocked?");
            locked.classList.toggle("active");
            unlocked.classList.toggle("active");
            tapDisabled = true;
            doorIsLocked = false;
            
            setTimeout(function() {
                tapDisabled = false;
            }, 1000);
        } else {
            // confirm("Is the door locked?");
            alert("Make sure the door is locked!")
            locked.classList.toggle("active");
            unlocked.classList.toggle("active");
            tapDisabled = true;
            doorIsLocked = true;
            
            setTimeout(function() {
                tapDisabled = false;
            }, 1000);
        }
    });

})();
