/** Textual markov chain generator */

function randomWord(options_arr){
    let random_idx = Math.floor(Math.random() * options_arr.length);
    return options_arr[random_idx];
}

class MarkovMachine {
    /** build markov machine; read in text.*/
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
    *
    *  for text of "the cat in the hat", chains will be
    *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
    makeChains() {
        // TODO
        let chains = new Map();
        let words_arr_length = this.words.length;

        for(let i = 0; i < words_arr_length; i++){
            let current_word = this.words[i];
            let next_words = [];
            
            let idx_new = i;
            while(idx_new != -1){
                if((idx_new + 1) == words_arr_length){
                    next_words.push(null);
                }else{
                    next_words.push(this.words[idx_new + 1]);
                }
                idx_new = this.words.indexOf(current_word, idx_new + 1);
            }
            
            if(!chains.has(current_word)){
                chains.set(current_word, next_words);
            }
        }

        this.chains = chains;  
    } 

    /** return random text from chains */
    makeText(numWords = 100) {
        // TODO
        let random_text = "";
        let words_count = 0;
        let basic_words = Array.from(this.chains.keys());
        let current_word = randomWord(basic_words);
        
        while(words_count < numWords && current_word !== null){
            words_count++;
            random_text += current_word + " ";
            current_word = randomWord(this.chains.get(current_word));
        }

        return random_text.trim();
    }
}


module.exports = {
    MarkovMachine,
};