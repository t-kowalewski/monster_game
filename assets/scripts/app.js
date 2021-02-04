// DATA
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const NORMAL_ATTACK = 'NORMAL';
const STRONG_ATTACK = 'STRONG';

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_GAME_OVER = 'GAME_OVER';

// User Input & Verification
const enteredValue = prompt('Maximum life for you monster', '100'); //returns string
let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
  alert("You've entered incorrect value. Default life was set to 100");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let gameLog = [];
let lastLoggedEntry;
////////////////////////////////////////////////////

// Set UI
adjustHealthBars(chosenMaxLife);
////////////////////////////////////////////////////

// MAIN LOGIC
// Attack by Player
function attack(type) {
  let damageByPlayer;
  let logEvent;

  // Ternary operator - Optional shortcut - They RETURN value
  // const damageByPlayer =
  //   type === NORMAL_ATTACK
  //     ? dealMonsterDamage(ATTACK_VALUE)
  //     : dealMonsterDamage(STRONG_ATTACK_VALUE);
  // const logEvent =
  //   type === NORMAL_ATTACK ? LOG_PLAYER_ATTACK : LOG_PLAYER_STRONG_ATTACK;
  /////////////////////////////////////////

  if (type === NORMAL_ATTACK) {
    damageByPlayer = dealMonsterDamage(ATTACK_VALUE);
    logEvent = LOG_PLAYER_ATTACK;
  } else if (type === STRONG_ATTACK) {
    damageByPlayer = dealMonsterDamage(STRONG_ATTACK_VALUE);
    logEvent = LOG_PLAYER_STRONG_ATTACK;
  }
  currentMonsterHealth -= damageByPlayer;

  writeToLog(
    logEvent,
    damageByPlayer,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

// Attack by Monster & Round Ending - Bonus Life Check
function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const damageByMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageByMonster;

  writeToLog(
    LOG_MONSTER_ATTACK,
    damageByMonster,
    currentMonsterHealth,
    currentPlayerHealth
  );

  // Bonus Life Check
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    currentPlayerHealth = initialPlayerHealth;
    // Update UI when bonus life used
    removeBonusLife();
    setPlayerHealth(currentPlayerHealth);
    alert("You've used your bonus life");
  }

  // End Round Check
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    writeToLog(
      LOG_GAME_OVER,
      'Player Won',
      currentMonsterHealth,
      currentPlayerHealth
    );

    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    writeToLog(
      LOG_GAME_OVER,
      'Player Lost',
      currentMonsterHealth,
      currentPlayerHealth
    );

    reset();
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
    writeToLog(
      LOG_GAME_OVER,
      'Draw',
      currentMonsterHealth,
      currentPlayerHealth
    );

    reset();
  }
}

// Reset Game
function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

// Write to Log
function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    monsterHealth: monsterHealth,
    playerHealth: playerHealth,
  };

  // Switch Case - Alternative to "if else", always compare ===
  // switch (event) {
  //   case LOG_PLAYER_ATTACK:
  //     logEntry.target = 'Monster';
  //     break;
  //   case LOG_PLAYER_STRONG_ATTACK:
  //     logEntry.target = 'Monster';
  //     break;
  //   case LOG_MONSTER_ATTACK:
  //     logEntry.target = 'Player';
  //     break;
  //   case LOG_PLAYER_HEAL:
  //     logEntry.target = 'Player';
  //     break;
  //   default:
  //     logEntry = {}
  // }
  /////////////////////////////////////////

  if (event === LOG_PLAYER_ATTACK) {
    logEntry.target = 'Monster';
  } else if (event === LOG_PLAYER_STRONG_ATTACK) {
    logEntry.target = 'Monster';
  } else if (event === LOG_MONSTER_ATTACK) {
    logEntry.target = 'Player';
  } else if (event === LOG_PLAYER_HEAL) {
    logEntry.target = 'Player';
  }

  gameLog.push(logEntry);
}
////////////////////////////////////////////////////

// Event Handlers
function attackHandler() {
  attack(NORMAL_ATTACK);
}

function strongAttackHandler() {
  attack(STRONG_ATTACK);
}

function healPlayerHandler() {
  let updatedHealValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal above max life");
    updatedHealValue = chosenMaxLife - currentPlayerHealth;
  } else {
    updatedHealValue = HEAL_VALUE;
  }

  increasePlayerHealth(updatedHealValue);
  currentPlayerHealth += updatedHealValue;

  writeToLog(
    LOG_PLAYER_HEAL,
    updatedHealValue,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log('-----');
  }

  let i = 0;
  for (const arrItem of gameLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);

      for (objKey in arrItem) {
        console.log(`${objKey} => ${arrItem[objKey]}`);
      }
      lastLoggedEntry = i;
      break;
    }

    i++;
  }
  // console.log(gameLog);
}

// Event Listeners
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
