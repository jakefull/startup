//create a passage class?

//needed attributes:
//  getPassage()
//      automatically .split(' ')
//      create a with/without punctuation vector/list?
//      replace 'time' with 'word count' on leaderboard?
//  reset()
//      start at the beginning again
//          -depending on punctuation being true or false, use
//          the w/punc list
//  while memorizing....
//      moniter if the index of the word you are trying to memorize
//      is ever equal to the word count (ie you just typed the last word
//          if this hap

//DECLARE REGEXs

//DEBUG: When going to this page (at least after creating a custom passage), the page 'crashes' or blips out
//for a second when you first try to check a word in any of the passages

const allbutspace = /\S/g;
const allpunc = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;


// function makeNewMempass (title, passage) {
//     returnthis = new mempass (title, passage);
//     return returnthis;
// }
const submit_button = document.getElementById("submit_btn");
submit_button.addEventListener("click", (e) => {game.checkWord(e)});

class mempass {
    pass_id; //name for passage
    passage; //the passage itself
    puncarray; //for reference
    nopuncpassage;
    nopuncarray; //for reference
    wc; //word count


    constructor (pass_id, input) {
        this.pass_id = pass_id;
        this.passage = input;
        this.puncarray = input.split(" ");
        this.nopuncpassage = input.replace(allpunc,"");
        this.nopuncarray = this.nopuncpassage.split(" ");
        //add a check for word count? and if it is above a certain amount, throw an error?
        this.wc = this.puncarray.length; //syntax correct?
    }

}

async function fetchRandomQuoteData() {
    const response = await fetch("https://api.quotable.io/random");
    const json = response.json;
    return json;
}

// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

class typeGame {//takes in a mempass
    goalarray; //given by the selected mempass
    typearray; //array that is used while player is typing
    showstring; //string composed from typearray
    current_word; //current word the player is typing
    // punc; //whether or not player has toggled no punc
    pass_title;
    show;
    word_count;


    constructor () {
        this.goalarray = [];
        this.typearray = []; //eventually replace hidden string with this
        this.showstring = "Please select a passage using the passage screen or sidebar (if present)";
//         hiddenstring is initalized in beginGame
        this.current_word = 0;
        this.show = false;
        this.pass_title = "Unselected"

        // this.pass1 = mempass1;

        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
        this.configureWebSocket();
        this.beginGame();
    }

    async saveScore(score) {
        const userName = this.getPlayerName();
        const date = new Date().toLocaleDateString();
        const newScore = { name: userName, score: score, title: this.pass_title, date: date };
        try {
            const response = await fetch('/api/score', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(newScore),
            });


            // Let other players know the game has concluded
            this.broadcastEvent(userName, GameEndEvent, this.pass_title);

            // Store what the service gave us as the high scores
            const scores = await response.json();
            localStorage.setItem('scores', JSON.stringify(scores));
          } catch {
            // If there was an error then just track scores locally
            this.updateScoresLocal(newScore);
          }
        }
    // old code for savescore below:
    //     let scores = [];
    //     const scoresText = localStorage.getItem('scores');
    //     if (scoresText) {
    //       scores = JSON.parse(scoresText);
    //     }
    //     scores = this.updateScores(userName, score, scores);
    
    //     localStorage.setItem('scores', JSON.stringify(scores));
    //   }
    
      updateScoresLocal(newScore) {
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        // const date = new Date().toLocaleDateString();
        // const newScore = { name: userName, score: score, title: this.pass_title, date: date };
    
        let found = false;
        for (const [i, prevScore] of scores.entries()) {
          if (score > prevScore.score) {
            scores.splice(i, 0, newScore);
            found = true;
            break;
          }
        }
    
        if (!found) {
          scores.push(newScore);
        }
    
        if (scores.length > 10) {
          scores.length = 10;
        }
    
        localStorage.setItem('scores', JSON.stringify(scores));
      }
    
    

    switchShow() {
        if (this.show) {
            this.show = false;

        } else {
            this.show = true;
        }
        this.updateDisplay();
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery user';
      }

    async updatePassage(mempass) { //add code to ensure you recieve a mempass object
        if (mempass.pass_id !== undefined) {
            this.pass_title = mempass.pass_id;
        } else {
            this.pass_title = "No Title"
        }
        if (mempass.passage !== undefined) {
            this.showstring = mempass.passage;
            this.hiddenstring = mempass.passage.replace(allbutspace, "_");
        } else {
            this.showstring = "No Passage";
            this.hiddenstring = "No Passage";
        }
         //implement this later
        // if (punc) {
        //     this.goalarray = mempass.puncarray;
        // } else {
        //     this.goalarray = mempass.nopuncarray;
        // }
        // let temp = this.passage.replace(allregexbutspace,"_");//replace all the characters with an underscore!
        // this.typearray = temp.split(" ");
        this.goalarray = mempass.puncarray;
        this.typearray = this.hiddenstring.split(" ");
        this.word_count = mempass.wc;
        
        this.beginGame();
    }

    updateDisplay () {
        document.getElementById("passtitle").textContent=this.pass_title;
        if (this.show) {
            document.getElementById("thepass").textContent=this.showstring;
        } else {
            document.getElementById("thepass").textContent=this.hiddenstring;
        }
        document.getElementById("counter").textContent=this.current_word;
    }

    async beginGame() {
        this.current_word=0;
        this.hiddenstring = this.showstring.replace(allbutspace, "_");
        if (this.pass_title === "Unselected") {
            this.hiddenstring = "Please select a passage using the passage screen or sidebar (if present)";
        }
        this.typearray = this.hiddenstring.split(" ");
        this.updateDisplay();

        //this.broadcastEvent(this.getPlayerName(), GameStartEvent, {});
        //insert passage after clearing previous one
        // this.typearray = [];
    }

    async checkWord(e) {//removed async
        e.preventDefault();
        const wordEl = document.querySelector("#word");
        const button = document.getElementById("submit_btn");
        localStorage.setItem("word", wordEl.value);
        let word = localStorage.getItem('word');
        wordEl.value = "";
        if (word === this.goalarray[this.current_word]) {
            this.typearray[this.current_word] = this.goalarray[this.current_word];
            this.hiddenstring = this.typearray.join(" "); //this should join all the array into a string
            this.current_word++;
            if (this.current_word >= this.word_count) {
                this.saveScore(this.current_word); //doesnt seem to work?
                this.beginGame();
            } else {
                //update the typearray to fill in the previous word
                // this.typearray[this.current_word-1] = this.goalarray[this.current_word-1];
                //show the new typearray so they can see their progress!
                // this.showCorrect(button);
                button.style.backgroundColor='green';
                setTimeout(this.removeButtonColor, 250);
                this.updateDisplay();
                
                
            }
        
        } else {
            // this.showWrong(button); //give an error message, let them try again
            button.style.backgroundColor='red';
            setTimeout(this.removeButtonColor, 250);
            // button.removeAttribute('style');
        }
    }

    async removeButtonColor () {
        const button = document.getElementById("submit_btn");
        button.removeAttribute('style');
    }

    async noPuncTypeWord(word) {
        //copy above code but use this.nopuncarray
    }

    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
          this.displayMsg('system', '', 'Online');
        };
        this.socket.onclose = (event) => {
          this.displayMsg('system', '', 'Not online');
        };
        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          if (msg.type === GameEndEvent) {
            this.displayMsg('user', msg.from, `memorized ${msg.value.score}`);
          } else if (msg.type === GameStartEvent) {
            this.displayMsg('user', msg.from, `began memorizing a passage.`);
          }
        };
      }
    
    displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML =
          `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
      }
    
    broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
      }
}

//     async showWrong(button) {
//         const background = `hsl(${this.hue}, 100%, 25%)`;
//         this.el.style.backgroundColor = background;
// }

//     async showWrong(button) {
//             const background = `hsl(${this.hue}, 100%, 25%)`;
//             this.el.style.backgroundColor = background;
//     }

    // async forgotWord() { //implement later?
    //     this.typeWord(this.goalarray[this.current_word]);
    // }

function assignQuote(data) {
    randQuotePass = new mempass(data.author,data.content);
}
function getQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        assignQuote(data);
      });
  }
  

const Passage1 = "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth";
mempass1 = new mempass("Yellow Roads",Passage1);
const Passage2 = "The standard of truth has been erected. No unhallowed hand can stop the work from progressing; persecutions may rage, mobs may combine, armies may assemble, calumny may defame, but the truth of God will go forth boldly, nobly, and independent till it has penetrated every continent, visited every clime, swept every country, and sounded in every ear, till the purposes of God shall be accomplished and the great Jehovah shall say the work is done."
mempass2 = new mempass("Standard of Truth", Passage2);
const Passage3 = "This course is designed so that you can complete everything entirely online. However, in-person classes are provided most Monday, Wednesday, and Fridays at 3 PM in JKB 3108.  Everyone is invited, and encouraged, to come regardless if you are in the online or in-person section. Creating an internet start up is a social activity and the more energy we bring to class the more we will all gain from the course."
mempass3 = new mempass("CS 260 Description",Passage3);
const Passage4 = "This is the shortest passage to memorize."
mempass4 = new mempass("Short", Passage4);
var randQuotePass;
// async function fetchRandomQuoteData() {
//     let response = await fetch("https://api.quotable.io/random");
//     response = response.json;
//     console.log(response);
    
// }

if (localStorage.getItem("passTitle")===null || localStorage.getItem("passBody") === null) {
    mempass_custom = new mempass("Not Yet Defined", "Go to the 'Choose Collection' page to make your own, custom passage.")
} else {
    mempass_custom = new mempass(localStorage.getItem("passTitle"), localStorage.getItem("passBody"));
}
getQuote(); //YAY! It worked!!!
const game = new typeGame;