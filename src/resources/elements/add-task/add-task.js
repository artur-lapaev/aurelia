import { DataService } from 'resources/services/data.service';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DataService, EventAggregator)
export class AddTask {
  constructor(dataService, eventAggregator) {
    this.taskName = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
  }

  addNewTask() {
    const value = this.taskName;
    this.dataService.setData(value);
    this.taskName = '';
    this.eventAggregator.publish('newTask', this.dataService.getData());
  }
}
