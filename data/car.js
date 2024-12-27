class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(car) {
    this.#brand = car.brand;
    this.#model = car.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed ${this.speed} km/h`);
  }

  go() {
    if(this.speed < 200 && (this.isTrunkOpen === false)) {
      this.speed += 5;
    } else {console.log(`${this.#brand} ${this.#model}: Trunk is open you can\'t go`)}
  }

  brake() {
    if(this.speed > 0) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if(this.speed > 0) {
      console.log(`${this.#brand} ${this.#model} cannot open trunk - the car is moving`);
      return;
    }
    this.isTrunkOpen = true;
    console.log(`${this.#brand} ${this.#model}: Trunk open`);
  }

  closeTrunk() {
    this.isTrunkOpen = false;
    console.log(`${this.#brand} ${this.#model}: Trunk closed`);
  }
}

const car1 = new Car({brand: "Toyota", model: "Corolla"});
const car2 = new Car({brand: "Tesla", model: "Model 3"});

car1.displayInfo();
car2.displayInfo();

car1.openTrunk();
car1.go();
car1.go();
car1.go();
car1.closeTrunk();
car1.go();
car1.go();
car1.displayInfo();


car2.go();
car2.go();
car2.go();
car2.go();
car2.brake();

car2.displayInfo();

class RaceCar extends Car {
  acceleration;

  constructor(raceCar) {
    super(raceCar);
    this.acceleration = raceCar.acceleration;
  }

  go() {
    if(this.speed < 300) {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {
    return;
  }

  closeTrunk() {
    return;
  }
 }

const macLaren = new RaceCar(
  { brand: 'McLaren', model: 'F1', acceleration: 20 });

// macLaren.displayInfo();
// macLaren.go()
// macLaren.displayInfo();

