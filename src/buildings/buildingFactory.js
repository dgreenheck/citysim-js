import { CommercialZone } from './commercial.js';
import { ResidentialZone } from './residential.js';
import { IndustrialZone } from './industrial.js';
import { Road } from './road.js';

/**
 * Factory function that creates a new building object of the specified type
 * @param {number} x The x-coordinate of the building
 * @param {number} y The y-coordinate of the building
 * @param {string} type The building type
 * @returns A new building object
 */
export function createBuilding(x, y, type) {
  switch (type) {
    case 'residential': 
      return new ResidentialZone(x, y);
    case 'commercial': 
      return new CommercialZone(x, y);
    case 'industrial': 
      return new IndustrialZone(x, y);
    case 'road': 
      return new Road(x, y);
    default:
      console.error(`${type} is not a recognized building type.`);
  }
}