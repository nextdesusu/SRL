import {
  STR_HP_MULT,
  CON_HP_MULT,
  DEX_ARMOUR_MULT,
  WIS_MP_MULT,
  INT_MP_MULT,
} from "../consts/Actor";

export default class Stats {
  constructor(str, dex, con, int, wis) {
    this.owner = null;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
  }

  get maxHp() {
    return this.str * STR_HP_MULT + this.con * CON_HP_MULT;
  }

  get maxMp() {
    return this.int * INT_MP_MULT + this.wis * WIS_MP_MULT;
  }

  get baseArmour() {
    return this.dex * DEX_ARMOUR_MULT;
  }

  get basicMagicPower() {
    return this.int + this.wis;
  }
}
