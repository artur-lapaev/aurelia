import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { DataService } from 'resources/services/data.service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DialogController, DataService, EventAggregator)
export class EditorForm {
  constructor(controller, dataService, eventAggregator) {
    this.controller = controller;
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
  }
  activate(model) {
    this.model = model;
  }

  ok(desc) {
    this.model.task.description = desc;
    this.controller.close(true);
    this.dataService.updateTaskByID(this.model);
    this.eventAggregator.publish('newTask', this.dataService.getListTask());
  }
}
