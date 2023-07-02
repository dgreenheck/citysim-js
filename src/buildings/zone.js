import { Building } from './building.js';
import { City } from '../city.js';

/**
 * Represents a residential, commercial or industrial zone
 */
export class Zone extends Building {
  constructor(x, y, city) {
    super(x, y, city);

    this.style = Math.floor(3 * Math.random()) + 1
    this.height = 1;
    this.hasRoadAccess = false;
  }

  update(city) {
    // Continuously check for road access if this zone does not have
    // road access
    if (!this.hasRoadAccess) {
      this.updateRoadAccess(city);
    }
  }
  /**
   * Returns true if this building has road access
   * @param {City} city Reference to the city data model
   */
  updateRoadAccess(city) {
    // Road must be within 2 tiles
    const road = city.findTile(this, (tile) => {
      
    }, 2);

    return (road !== null);
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = super.toHTML();
    html += `Style: ${this.style}<br>`;
    html += `Height: ${this.height}<br>`;
    return html;
  }
}