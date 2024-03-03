const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (inputs) => {

  let cursor = 0
  let tokens = []

  while(cursor < inputs.length){
    const character = inputs[cursor];
    if(isParenthesis(character)){
      tokens.push({
        type : 'Parenthesis',
      value : character
          })
          cursor++;
          continue;
    }

    if(isWhitespace(character)){
      cursor++; 
      continue;
    }
    
    if(isNumber(character)){

      let foundNumber = character;

      while(isNumber(inputs[++cursor])){
        foundNumber+=inputs[cursor];
      }

      tokens.push({
        type : 'Number',
        value : parseInt(foundNumber, 10)
      })

    
      continue
    }


    if(isLetter(character)){
      let found = character;

      while(isLetter(inputs[++cursor])){
        found+=inputs[cursor];
      }

      tokens.push({
        type : 'Name',
        value : found
      })

      continue;
    }


    if(isQuote(character)){
      let found = "";

      while(!isQuote(inputs[++cursor])){
        found+=inputs[cursor];
      }

      tokens.push({
        type : 'String',
        value : found
      })

      cursor++
      continue;
    }


    throw new Error(`${character} is unexpected`)
  }


  return tokens;

};

module.exports = { tokenize };
