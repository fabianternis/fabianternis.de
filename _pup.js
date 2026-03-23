document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("construction-popup");
    const closeBtn = document.getElementById("close-popup");

    //const hasSeenPopup = sessionStorage.getItem("seenConstructionPopup");
    const hasSeenPopup = false;

    if (!hasSeenPopup) {
        popup.classList.remove("hidden");
    }

    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        sessionStorage.setItem("seenConstructionPopup", "true");
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.add("hidden");
            sessionStorage.setItem("seenConstructionPopup", "true");
        }
    });
});