//DEBUG: For some reason, always moves on to leaderboard page after this. Something is going uncaught.

class updater {
    // button;
    constructor() {
        // button = "Just a string for now" //document.getElementById("#update_btn");
    }
    removeButtonColor () {
//remove color from button if you can get style error gone?
    }
    updateCustomPassage () {
        const button = document.getElementById("submit_btn");
        const titleEl = document.querySelector("#pass_title");
        const passEl = document.querySelector("#pass_body");
        if (titleEl.value===null || passEl.value===null) {
            //give error message OR just flash button red
            button.style.backgroundColor='red';
            setTimeout(this.removeButtonColor, 250);
        } else {
            localStorage.setItem("passTitle", titleEl.value);
            localStorage.setItem("passBody", passEl.value);
            button.style.backgroundColor='green';
            setTimeout(this.removeButtonColor, 250);
        }
        // window.location.href = ".html";
}

    // LATER ON: implement a word limit, error message if title or passage is left blank, etc.
}

const updatePage = new updater;