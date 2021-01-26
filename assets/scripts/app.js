// DATA
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
////////////////////////////////////////////////////

// Set UI
adjustHealthBars(chosenMaxLife);
////////////////////////////////////////////////////

// MAIN LOGIC - ACTIONS
// Attack by Player
function attack(type) {
  let damageByPlayer;
  if (type === 'NORMAL') {
    damageByPlayer = dealMonsterDamage(ATTACK_VALUE);
  } else if (type === 'STRONG') {
    damageByPlayer = dealMonsterDamage(STRONG_ATTACK_VALUE);
  }
  currentMonsterHealth -= damageByPlayer;

  endRound();
}

// Attack by Monster & Round Ending
function endRound() {
  const damageByMonster = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageByMonster;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
  }
}
////////////////////////////////////////////////////

// Event Handlers
function attackHandler() {
  attack('NORMAL');
}

function strongAttackHandler() {
  attack('STRONG');
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
