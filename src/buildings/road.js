import { Building } from './building.js';

export class Road extends Building {
  constructor(x, y, city) {
    super(x, y, city);
    this.type = 'road';
  }
}