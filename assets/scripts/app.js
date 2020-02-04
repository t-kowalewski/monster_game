// DATA
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
////////////////////////////////////////////////////

// UI
adjustHealthBars(chosenMaxLife);

////////////////////////////////////////////////////
function attackType(type) {
  let maxDamage;
  if (type === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (type === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }


  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentPlayerHealth && currentMonsterHealth <= 0) {
    alert('Draw!');
  }
}


// Event Handlers
function attackHandler() {
  attackType('ATTACK');
}

function strongAttackHandler() {
  attackType('STRONG_ATTACK');
}

// Event Listeners
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);