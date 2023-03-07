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

class mempass {
    pass_id; //name for passage
    passage; //the passage itself
    puncarray; //for reference
    nopuncpassage;
    nopuncarray; //for reference
    wc; //word count
    // punctuation = '!"';      define these in a seperate function?
    // nopunc = RegExp('[' + punctuation + ']', 'g');

    constructor (pass_id, input) {
        this.pass_id = pass_id;
        this.passage = input;
        this.puncarray = input.split(" "); //is this an array? ALSO do I ever need to use new?
        this.nopuncpassage = input.replace(regex,"");
        this.nopuncarray = this.nopuncpassage.split(" ");
        //add a check for word count? and if it is above a certain amount, throw an error?
        wc = this.puncarray.size(); //syntax correct?
        current_word = 0;
    }

}

class typeGame {//takes in a mempass
    goalarray; //given by the selected mempass
    typearray; //array that is used while player is typing
    current_word; //current word the player is typing
    punc; //whether or not player has toggled no punc
    pass_title;

    constructor () {
        this.goalarray = "Please select a passage using the passage screen or sidebar (if present)"
        this.typearray = [];
        this.current_word = 0;
        this.punc = true;
        this.pass_id = "Unselected"
        this.beginGame();
    }

    async updatePassage(mempass) { //add code to ensure you recieve a mempass object
        this.pass_title = mempass.pass_id;
        if (punc) {
            this.goalarray = mempass.puncarray;
        } else {
            this.goalarray = mempass.nopuncarray;
        }
        this.current_word = 0;
        
    }

    async beginGame() {
        //show title
        //insert passage after clearning previous one
        this.typearray = [];
        this.current_word=0;
    }

    async typeWord(word) {
        if (word === this.puncarray(current_word)) {
            this.current_word++;
            if (this.current_word >= this.word_count) {
                //end game!
                this.beginGame();
            } else {
                //update the typearray to fill in the previous word
                this.typearray[this.current_word-1] = this.goalarray[this.current_word-1];
            }
        
        } else {
            showWrong(); //give an error message, let them try again
        }
    }

    async forgotWord() {
        this.typeWord(this.goalarray[this.current_word]);
    }

    async noPuncTypeWord(word) {

    }

}

const game = new typeGame;