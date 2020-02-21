import { inject } from 'aurelia-framework';

@inject()
export class DataService {
  createNewTask(taskName) {
    const newTask = { name: taskName, description: '' };
    this._setData(newTask);
  }

  _setData(data) {
    const isData = this.getListTask();
    if (isData) {
      const storageData = JSON.parse(isData);
      storageData.push(data);
      localStorage.setItem('dataTask', JSON.stringify(storageData));
    } else {
      localStorage.setItem('dataTask', JSON.stringify([data]));
    }
  }

  getListTask() {
    const data = localStorage.getItem('dataTask');
    return data;
  }

  getTaskByID(id) {
    const data = JSON.parse(this.getListTask());
    return data[id];
  }

  updateListTask(task) {
    const data = JSON.parse(this.getListTask());
    const newData = data.filter(tasks => tasks.name !== task.name);
    localStorage.setItem('dataTask', JSON.stringify(newData));
    return newData;
  }

  updateTaskByID(model) {
    const data = JSON.parse(this.getListTask());
    data[model.id].description = model.task.description;
    localStorage.setItem('dataTask', JSON.stringify(data));
  }
}
