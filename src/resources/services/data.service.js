import { inject } from 'aurelia-framework';

@inject()
export class DataService {
  setData(data) {
    const isData = this.getData();
    if (isData) {
      const storageData = JSON.parse(isData);
      storageData.push(data);
      localStorage.setItem('dataTask', JSON.stringify(storageData));
    } else {
      localStorage.setItem('dataTask', JSON.stringify([data]));
    }
  }

  getData() {
    const data = localStorage.getItem('dataTask');
    return data;
  }

  getTaskByID(id) {
    const data = JSON.parse(this.getData());
    return data[id];
  }

  updateData(taskName) {
    const data = JSON.parse(this.getData());
    const newData = data.filter( task => task !== taskName);
    localStorage.setItem('dataTask', JSON.stringify(newData));
    return newData;
  }
  updateTaskByID(model) {
    const data = JSON.parse(this.getData());
    data[model.id] = model.name;
    localStorage.setItem('dataTask', JSON.stringify(data));
  }
}
