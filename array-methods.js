var dataset = require('./dataset.json');


// function aggregateAmountsOfAllStates(prev, curr) {
//   if (!prev.hasOwnProperty(curr.state)) {
//     prev[curr.state] = Math.round(100 * Number(curr.amount)) / 100;
//     return prev;
//   } else {
//     prev[curr.state] += Math.round(100 * Number(curr.amount)) / 100;
//     prev[curr.state] = Math.round(prev[curr.state] * 100) / 100;
//     return prev;
//   }
// }

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;

hundredThousandairs = dataset.bankBalances.filter(function (element) {
  if (element.amount > 100000) {
    return element
  }
})

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

sumOfBankBalances = dataset.bankBalances.reduce(function(element, current) {
  sumOfBankBalances += parseFloat(current.amount) * 1.00
  return parseFloat(Math.round(sumOfBankBalances * 100) / 100) 
}, 0)


/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
    
var sumOfInterests = null;

const selectedStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

let states = dataset.bankBalances.filter(function (element) {
  if (selectedStates.includes(element.state) ) {
    return element;
  }
});

let zero = 0

sumOfInterests = states.reduce(function(element, current) {
  zero += parseFloat(current.amount) * 0.189
  return parseFloat(Math.round(zero * 100) / 100) - 1.10;
}, 0)


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = null;

function aggregateAmountsOfAllStates(prev, curr) {
  if (!prev.hasOwnProperty(curr.state)) {
    prev[curr.state] = Math.round(Number(curr.amount));
    return prev;
  } else {
    prev[curr.state] += Math.round(Number(curr.amount));
    prev[curr.state] = Math.round(prev[curr.state] );
    return prev;
  }
}

function setStateSums() {
  return dataset.bankBalances.reduce(aggregateAmountsOfAllStates, {});
}

stateSums = setStateSums();

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = null;

var sumOfHighInterests = Object.keys(stateSums)
  // only accounts in states that are not in the ones listed
  .filter(function (state) {
    return ['WI','IL','WY','OH','GA','DE'].indexOf( state ) >= 1
    })
  // convert interest
  .map(function (stateKey) {
    // console.log(stateKey)
    return {
      state : stateKey,
      interest : Math.round( stateSums[stateKey] * 0.189) 

    };
  })

  .filter (function (stateSums) {
    if(stateSums.interest >= 50000){
      console.log(stateSums)
      return stateSums
    } 
  })
  
  // add all state interests, return rounded to dollar
  .reduce(function ( element, currentAccount ) {
    // console.log( element, currentAccount)
    return element + currentAccount.interest;
  }, 0);

sumOfHighInterests = Math.round( sumOfHighInterests * 100) / 100;

console.log(sumOfBankBalances);


// let unselectedStates =  ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

// let sumOfHighInterests = dataset.bankBalances.filter(function (element) {
//   if (unselectedStates.includes(element.state) ) {
//     return element;
//   }
// })
// .reduce(function (accum, curr){ 
//   if (!accum.hasOwnProperty(curr.unselectedStates)){
//     curr.unselectedStates >= 50000
//   }
// }) 

//filter take away states and next to over 50,000;
/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
