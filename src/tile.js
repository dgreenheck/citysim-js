import { createBuilding } from './buildings/buildingFactory.js';

/**
 * Represents a single tile of the city
 */
export class Tile {
  /**
   * Creates a new tile object
   * @param {number} x The x-coordinate of the tile
   * @param {number} y The y-coordinate of the tile
   */
  constructor(x, y) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.terrainId = 'ground';
    this.building = null;
  }

  /**
   * Computes the Manhattan distance between two tiles
   * @param {Tile} tile The tile to get the distance to
   * @returns {number} Distance in tile units
   */
  distanceTo(tile) {
    return Math.abs(this.x - tile.x) + 
           Math.abs(this.y - tile.y);
  }

  /**
   * Removes the building from this tile
   */
  removeBuilding() {
    this.building.dispose();
    this.building = null;
  }

  /**
   * Places a new building onto the tile
   * @param {string} tile 
   */
  placeBuilding(buildingType) {
    this.building = createBuilding(this.x, this.y, buildingType);
  }

  /**
   * 
   * @returns {string} HTML representation of this object
   */
  toHTML() {
    let html = '';
    html += `Coordinates: (X: ${this.x}, Y: ${this.y})<br>`;
    html += `Terrain: ${this.terrainId}<br>`;

    if (this.building) {
      html += this.building.toHTML();
    }

    return html;
  }
}