/**
 * Creates a new citizen
 * @param {object} residence The residence where the citizen lives
 * @returns 
 */
export function createCitizen(residence) {

  const age = 1 + Math.floor(100*Math.random());

  // Citizens can only work if they are 16 or older
  // Retirement age is 65
  let initialState = '';
  if(age < 16) {
    initialState = 'child';
  } else if (age >= 16 && age < 65) {
    initialState = 'unemployed';
  } else {
    initialState = 'retired';
  }

  return {
    /* PROPERTIES  */
    id: crypto.randomUUID(),
    name: generateRandomName(),
    age: age,
    state: initialState,

    // Number of simulation steps in the current state
    stateCounter: 0,

    // A reference to the building the citizen lives at
    residence,
    // A reference to the building the citizen works at
    job: null,

    /* METHODS  */

    /**
     * Updates the state of this citizen by one simulation
     * @param {object} city 
     */
    update(city) {
      switch (this.state) {
        case 'unemployed':
          // Action - Look for a job
          console.log(`${this.name} is looking for a job...`);
          this.job = this.findJob(city);

          // Transitions
          if (this.job) {
            console.log(`${this.name} found a job at ${this.job.name}!`);
            this.state = 'employed';
          }
          break;
        case 'employed':
          // Actions - None

          // Transitions
          if (!this.job) {
            this.state = 'unemployed';
          }
          break;
        case 'child':
        case 'retired':
          // Not-implemented
          break;
        default:
          console.error(`Citizen ${this.id} is in an unknown state (${this.state})`);
      }
    },

    /**
     * Search for a job nearby
     * @param {object} city 
     * @returns 
     */
    findJob(city) {
      const tile = city.findTile(this.residence, (tile) => {
        // Search for an industrial or commercial building with at least one available job
        const building = tile.building;
        if (building && (building.type === 'industrial' || building.type === 'commercial')) {
          if (tile.building.numberOfJobsAvailable() > 0) {
            return true;
          }
        }
  
        return false;
      }, 5);
  
      if (tile) {
        // Employ the citizen at the building
        tile.building.workers.push(this);
        return tile.building;
      } else {
        return null;
      }
    },

    /**
     * Sets the job for the citizen
     * @param {*} job 
     */
    setJob(job) {
      this.job = job;
    },

    /**
     * Returns an HTML representation of this object
     * @returns {string}
     */
    toHTML() {
      return `
        <li>${this.name}
          <ul style="padding-left:8px; font-size: small">
            <li>State: ${this.state}</li>
            <li>Age: ${this.age}</li>
            <li>Job: ${this.job?.name ?? 'N/A'}</li>
          </ul>
        </li>
      `;
    }
  }
}

function generateRandomName() {
  const firstNames = [
    'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella',
    'Liam', 'Noah', 'William', 'James', 'Benjamin',
    'Elizabeth', 'Margaret', 'Alice', 'Dorothy', 'Eleanor',
    'John', 'Robert', 'William', 'Charles', 'Henry',
    'Alex', 'Taylor', 'Jordan', 'Casey', 'Robin'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown',
    'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
    'Clark', 'Lewis', 'Walker', 'Hall', 'Young',
    'Lee', 'King', 'Wright', 'Adams', 'Green'
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return randomFirstName + ' ' + randomLastName;
}