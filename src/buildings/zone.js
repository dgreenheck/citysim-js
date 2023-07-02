import { Building } from './building.js';

/**
 * Represents a residential, commercial or industrial zone
 */
export class Zone extends Building {
  constructor(x, y, city) {
    super(x, y, city);

    this.style = Math.floor(3 * Math.random()) + 1
    this.height = 1;
  }

  /**
   * Returns true if this building has road access
   * @param {object} city Reference to the city data model
   */
  hasRoadAccess(city) {
    const result = this.city.findTile();
    return result !== null;
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = super.toHTML();
    html += `Type: ${this.type}<br>`;
    html += `Style: ${this.style}<br>`;
    html += `Height: ${this.height}<br>`;
    return html;
  }
}