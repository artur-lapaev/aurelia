import { DialogService } from 'aurelia-dialog';
import { DataService } from 'resources/services/data.service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { EditorForm } from '../editor-form/editor-form';
import { Router, RouterEvent } from 'aurelia-router';

@inject(DataService, EventAggregator, DialogService, Router)
export class ListTask {
  constructor(dataService, eventAggregator, dialogService, router) {
    this.dataService = dataService;
    this.dialogService = dialogService;
    this.eventAggregator = eventAggregator;
    this.router = router;
    this._parseData(this.dataService.getData());
  }

  created() {
    this.eventAggregator.subscribe(RouterEvent.Complete, event => {
      const routeName = event.instruction.config.name;
      if (routeName === 'edit') {
        const dataModel = { id: +event.instruction.params.id, name: this.dataService.getTaskByID(+event.instruction.params.id) };
        this.dialogService.open({ viewModel: EditorForm, model: dataModel, action: this.action }).whenClosed(response => {
          this.router.navigateToRoute('home');
        });
      }
    });

    this.eventAggregator.subscribe('newTask', newTask => {
      this._parseData(newTask);
    });
  }
  _parseData(serviceData) {
    return this.dataTask = serviceData ? JSON.parse(serviceData) : [];
  }

  removeTask(task) {
    this.dataTask = this.dataService.updateData(task);
  }
}
