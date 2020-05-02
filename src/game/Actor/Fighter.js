export default class Fighter {
  constructor(str, dex, con, RGB) {
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.RGB = RGB;
    this.weapon = null;
    this.hp = this.maxHp;
  }

  get maxHp() {
    const basicHp = 10;
    const strMult = this.str * 2;
    const conMult = this.con * 5;
    return basicHp + strMult + conMult;
  }

  wieldWeapon(newWeapon) {
    this.weapon = newWeapon;
  }

  attack(target) {}

  takeDamage(amount) {}

  heal(amount) {}
}
