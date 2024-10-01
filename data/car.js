class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  
  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  };

  go(){
    if(this.isTrunkOpen){
      return ; 
    }
    this.speed += 5;
    if (this.speed > 200) {
      this.speed = 200;
    }
  };

  break(){
    this.speed-=5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  };

  openTrunk(){
    if(this.speed > 0){
      return ; 
    }
    this.isTrunkOpen = true;
  };

  closeTrunk(){
    this.isTrunkOpen = false;
  };
  
  displayInfo(){
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model}, speed:${this.speed} Km/h, trunk: ${trunkStatus}`);
  };

}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(){
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  };

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  };

  displayInfo(){
     console.log(`${this.brand} ${this.model}, speed:${this.speed} Km/h,`);
  };

};

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
const racecar1 = new RaceCar({brand: 'Mclaren', model: 'F1', acceleration: 20});

console.log(car1);
console.log(car2);
console.log(racecar1);

car1.go();
car1.openTrunk();
car1.go();
car2.openTrunk();
car2.go();
racecar1.go();
racecar1.go();
racecar1.break();
racecar1.openTrunk();

car1.displayInfo();
car2.displayInfo();
racecar1.displayInfo();

