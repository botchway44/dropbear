 const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];


const apply = (node) => {

  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);

  if(typeof fn !== 'function') throw new TypeError(`${node.name} is not a function`)

  return fn(...args)
}


const getIdentifier = (node) =>{
  const idetifier = environment[node.name]

  if(!idetifier) return new ReferenceError(`${node.name} is not defined`)
  return idetifier
}


const set = node => {
  environment[node.identifier.name] = node.assignment.value
  //log to value back to the user
  environment.log(node.assignment.value)
}
const evaluate = (node) => {

  if(node && node.type === 'VariableDeclaration') return set(node);
  if(node && node.type === 'CallExpression') return apply(node);
  if(node && node.type ==='Identifier') return getIdentifier(node);
  if(node && node.value) return node.value
  };

module.exports = { evaluate };
