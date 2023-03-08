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

const allbutspace = /\S/g;
const allpunc = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;

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
        this.hiddenstring = "HIDDEN: Please select a passage using the passage screen or sidebar (if present)";
        this.current_word = 0;
        this.show = false;
        this.pass_title = "Unselected"

        // this.pass1 = mempass1;

        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();

        this.beginGame();
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
        this.pass_title = mempass.pass_id;
        this.showstring = mempass.passage;
        this.hiddenstring = mempass.passage.replace(allbutspace, "_"); //implement this later
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

    updatePassage1() {
        this.updatePassage(mempass1);
        this.beginGame();
    }

    updateDisplay () {
        document.getElementById("passtitle").textContent=this.pass_title;
        if (this.show) {
            document.getElementById("thepass").textContent=this.showstring;
        } else {
            document.getElementById("thepass").textContent=this.hiddenstring;
        }
        document.getElementById("counter").textContent=this.current_word+1;
    }

    async beginGame() {
        this.current_word=0;
        this.updateDisplay();
        //insert passage after clearning previous one
        // this.typearray = [];
    }

    async checkWord() {//removed async
        const wordEl = document.querySelector("#word");
        const button = document.getElementById("submit_btn");
        localStorage.setItem("word", wordEl.value);
        let word = localStorage.getItem('word');
        wordEl.value = "";
        if (word === this.goalarray[this.current_word]) {
            this.current_word++;
            if (this.current_word >= this.word_count) {
                //end game!
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

//     async showWrong(button) {
//         const background = `hsl(${this.hue}, 100%, 25%)`;
//         this.el.style.backgroundColor = background;
// }

//     async showWrong(button) {
//             const background = `hsl(${this.hue}, 100%, 25%)`;
//             this.el.style.backgroundColor = background;
//     }

    async forgotWord() {
        this.typeWord(this.goalarray[this.current_word]);
    }

}

const Passage1 = "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth";
mempass1 = new mempass("Yellow Roads",Passage1);
//CAN'T FIGURE OUT HOW TO PASS THIS IN!

const game = new typeGame;