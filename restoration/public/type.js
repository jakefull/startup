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
  

const Passage1 = "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.";
const Passage2 = "So it was with me. I had actually seen a light, and in the midst of that light I saw two Personages, and they did in reality speak to me; and though I was hated and persecuted for saying that I had seen a vision, yet it was true; and while they were persecuting me, reviling me, and speaking all manner of evil against me falsely for so saying, I was led to say in my heart: Why persecute me for telling the truth? I have actually seen a vision; and who am I that I can withstand God, or why does the world think to make me deny what I have actually seen? For I had seen a vision; I knew it, and I knew that God knew it, and I could not deny it, neither dared I do it; at least I knew that by so doing I would offend God, and come under condemnation.";
const Passage3 = "When I think of the Book of Mormon, I think of the word power. The truths of the Book of Mormon have the power to heal, comfort, restore, succor, strengthen, console, and cheer our souls.";
const Passage4 = "We believe in the same organization that existed in the Primitive Church, namely, apostles, prophets, pastors, teachers, evangelists, and so forth.";
const Passage5 = "Search these commandments, for they are true and faithful, and the prophecies and promises which are in them shall all be fulfilled. What I the Lord have spoken, I have spoken, and I excuse not myself; and though the heavens and the earth pass away, my word shall not pass away, but shall all be fulfilled, whether by mine own voice or by the voice of my servants, it is the same.";
const Passage6 = "We believe the Bible to be the word of God as far as it is translated correctly; we also believe the Book of Mormon to be the word of God.";
const Passage7 = "It grieves me that there is no fuller fellowship - if one member suffer all feel it - by union of feeling we obtain power with God.";
const Passage8 = "And he received not of the fulness at first, but continued from grace to grace, until he received a fulness; And thus he was called the Son of God, because he received not of the fulness at the first.";
const Passage9 = "The Son of Man hath descended below them all. Art thou greater than he? Therefore, hold on thy way, and the priesthood shall remain with thee; for their bounds are set, they cannot pass. Thy days are known, and thy years shall not be numbered less; therefore, fear not what man can do, for God shall be with you forever and ever.";
const Passage10 = "When we understand the character of God, and know how to come to Him, he begins to unfold the heavens to us, and to tell us all about it. When we are ready to come to him, he is ready to come to us.";
const Passage11 = "The doctrine or sealing power of Elijah is as follows: If you have power to seal on earth and in heaven, then we should be wise. The first thing you do, go and seal on earth your sons and daughters unto yourself, and yourself unto your fathers in eternal glory.";
const Passage12 = "The standard of truth has been erected. No unhallowed hand can stop the work from progressing; persecutions may rage, mobs may combine, armies may assemble, calumny may defame, but the truth of God will go forth boldly, nobly, and independent till it has penetrated every continent, visited every clime, swept every country, and sounded in every ear, till the purposes of God shall be accomplished and the great Jehovah shall say the work is done.";
const Passage14 = "Sometimes we think of the Restoration of the gospel as something that is complete, already behind us - Joseph Smith translated the Book of Mormon, he received priesthood keys, the Church was organized. In reality, the Restoration is an ongoing process; we are living in it right now. It includes 'all that God has revealed, all that He does now reveal,' and the 'many great and important things that 'He will yet reveal.'";
const Passage13 = "Astonishingly, to those who have eyes to see and ears to hear, it is clear that the Father and the Son are giving away the secrets of the universe! If only you and I can avoid being offended by their generosity.";
mempass1 = new mempass("John 14:6",Passage1);
mempass2 = new mempass("Joseph Smith History 1:25", Passage2);
mempass3 = new mempass("President Nelson on the Book of Mormon",Passage3);
mempass4 = new mempass("Article of Faith 6", Passage4);
mempass5 = new mempass("Doctrine and Covenants 1:36-37", Passage5);
mempass6 = new mempass("Article of Faith 8", Passage6);
mempass7 = new mempass("Joseph Smith's Quote on Unity", Passage7);
mempass8 = new mempass("Doctrine and Covenants 93:13-14", Passage8);
mempass9 = new mempass("Doctrine and Covenants 122:8-9", Passage9);
mempass10 = new mempass("From Joseph Smith's King Fallot Discourse", Passage10);
mempass11 = new mempass("Joseph Smith on The Sealing Power",Passage11);
mempass12 = new mempass("The Standard of Truth - Joseph Smith", Passage12);
mempass13 = new mempass("Elder Maxwell on Revelation",Passage13); //notice passages switched above
mempass14 = new mempass("Elder Uchtdorf on the Restoration", Passage14);


var randQuotePass;
// async function fetchRandomQuoteData() {
//     let response = await fetch("https://api.quotable.io/random");
//     response = response.json;
//     console.log(response);
    
// }

if (localStorage.getItem("passTitle")===null || localStorage.getItem("passBody") === null) {
    mempass_custom = new mempass("Not Yet Defined", "Go to the 'Passage Details' page to make your own, custom passage.")
} else {
    mempass_custom = new mempass(localStorage.getItem("passTitle"), localStorage.getItem("passBody"));
}
getQuote(); //YAY! It worked!!!
const game = new typeGame;