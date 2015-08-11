define(["jquery", "knockout", "taskViewModel", "bootstrap"], function($, ko, TaskViewModel) {

	function ListViewModel(title, onSave, onEditTask, tasks){
		var self = this;

		self.listTitle = ko.observable(title || "test");
		self.newTask = ko.observable(new TaskViewModel(onEditTask, onSave));
		self.tasks = ko.observableArray([]);
		self.editingTitle = ko.observable(false);
		self.addingNewTask = ko.observable(false);

		self.addNewTask = function(){
			self.addingNewTask(true);
		}

		self.saveNewTask = function(){
			self.tasks.push(self.newTask());
			self.newTask(new TaskViewModel(onEditTask, onSave));
 			self.addingNewTask(false);
			onSave();
		}

		self.removeTask = function(data){
			var index = self.tasks.indexOf(data)
			self.tasks.splice(index,1);
			onSave();
		}

		self.editTitle = function(data){
			self.editingTitle(true);
		}

		self.saveTitle = function(data){
			self.editingTitle(false);
			onSave();
		}

		if (tasks) {
			for (var i in tasks){
				self.tasks.push(new TaskViewModel(onEditTask, onSave, tasks[i].title, tasks[i].description, tasks[i].comments))
			}
		};
	}

	return ListViewModel;
});