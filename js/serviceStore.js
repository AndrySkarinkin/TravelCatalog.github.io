class ServiceStore {
  constructor() {

  }

  getTravel() {
    let travels = [];
    let travelsToLocalStorage = localStorage.getItem('travels');
    if (travelsToLocalStorage !== null) {
      travels = JSON.parse(travelsToLocalStorage);
    }
    return travels;
  }

  putTravel(id) {
    let pushTravel;
    let travels = this.getTravel();
    let index = travels.indexOf(id);
    if (index === -1) {
      travels.push(id);
      pushTravel = true;
    } else{
      travels.splice(index,1);
      pushTravel = false;
    }
    localStorage.setItem('travels', JSON.stringify(travels));
    return{
      pushTravel: pushTravel,
      travels: travels
    };

  }
}

let serviceStore = new ServiceStore();