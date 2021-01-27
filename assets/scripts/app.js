// DATA
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const NORMAL_ATTACK = 'NORMAL';
const STRONG_ATTACK = 'STRONG';

// User Input
const enteredValue = prompt('Maximum life for you monster', '100'); //returns string
let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
  alert("You've entered incorrect value. Default life was set to 100");
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
////////////////////////////////////////////////////

// Set UI
adjustHealthBars(chosenMaxLife);
////////////////////////////////////////////////////

// MAIN LOGIC
// Attack by Player
function attack(type) {
  let damageByPlayer;
  if (type === NORMAL_ATTACK) {
    damageByPlayer = dealMonsterDamage(ATTACK_VALUE);
  } else if (type === STRONG_ATTACK) {
    damageByPlayer = dealMonsterDamage(STRONG_ATTACK_VALUE);
  }
  currentMonsterHealth -= damageByPlayer;

  endRound();
}

// Attack by Monster & Round Ending - Bonus Life Check
function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const damageByMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageByMonster;

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
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    reset();
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
    reset();
  }
}

// Reset Game
function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
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

  endRound();
}

// Event Listeners
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
