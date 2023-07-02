import { createCitizen } from '../citizens.js';
import { Zone } from './zone.js';

export class ResidentialZone extends Zone {
  constructor(x, y, city) {
    super(x, y, city);

    this.type = 'residential';
    this.name = generateBuildingName();

    // Array of residents that live in this building
    this.residents = [];
    // This is the maximum number of people that can live in this building at one time
    this.maxResidents = 1;
  }

  /**
   * Updates the state of this building by one simulation step
   * @param {object} city 
   */
  update(city) {
    this.residents.forEach(resident => resident.update(city));

    // Move in new residents
    if (this.residents.length < this.maxResidents) {
      const resident = createCitizen(this);
      this.residents.push(resident);
    }

    // Update building development state
    if (Math.random() < 0.02) {
      if (this.height < 5) {
        this.height += 1;
        this.updated = true;
      }
    }
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = super.toHTML();

    html += `<br><strong>Residents</strong>`;

    html += '<ul style="margin-top: 0; padding-left: 20px;">';
    if (this.residents.length > 0) {
      for (const resident of this.residents) {
        html += resident.toHTML();
      }
    } else {
      html += '<li>None</li>'
    }
    html += '</ul>';

    return html;
  }
}

// Arrays of words to construct the building names
const prefixes = ['Harmony', 'Serenity', 'Tranquil', 'Bliss', 'Enchanted', 'Elevate', 'Radiant', 'Celestial', 'Crescent', 'Zen'];
const suffixes = ['Residences', 'Gardens', 'Heights', 'Manor', 'Estates', 'Villas', 'Haven', 'Terrace', 'Oasis', 'Court'];

// Function to generate a random building name
function generateBuildingName() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return prefix + ' ' + suffix;
}