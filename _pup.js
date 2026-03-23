document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("construction-popup");
    const closeBtn = document.getElementById("close-popup");
    const popupContent = document.querySelector(".popup-content");

    const STORAGE_KEY = "seenConstructionPopup";

    function closePopup() {
        popup.classList.add("closing");
        setTimeout(() => {
            popup.classList.add("hidden");
            popup.classList.remove("closing");
            sessionStorage.setItem(STORAGE_KEY, "true");
        }, 300);
    }

    function showPopup() {
        //const hasSeenPopup = sessionStorage.getItem(STORAGE_KEY);
        const hasSeenPopup = false;
        if (!hasSeenPopup) {
            popup.classList.remove("hidden");
        }
    }

    showPopup();

    closeBtn.addEventListener("click", closePopup);

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            closePopup();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !popup.classList.contains("hidden")
        ) {
            closePopup();
        }
    });
});