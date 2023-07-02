export class Building {
  /**
   * Creates a new building object
   * @param {number} x The x-coordinate of the building
   * @param {number} y The y-coordinate of the building
   * @param {string} buildingType The building type
   * @returns A new building object
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.id = crypto.randomUUID(),
    this.name = 'Untitled';
    this.type = 'building';
    this.updated = true;
  }

  /**
   * Updates the state of this building by one simulation step
   * @param {object} city 
   */
  update(city) {
    this.updated = false;
  }

  /**
   * Cleanup the state for this object
   */
  dispose() {
    // No-op
  }

  /**
   * Returns true if this building has road access
   */
  hasRoadAccess() {
    const result = this.city.findTile();
    return result !== null;
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = '';
    html += '<br><strong>Building</strong><br>';
    return html;
  }
}