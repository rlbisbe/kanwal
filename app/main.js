// to depend on a bower installed component:
// define(['component/componentName/file'])



define(["jquery", "knockout", "taskViewModel", "listViewModel"], function($, ko, TaskViewModel, ListViewModel) {

	function ViewModel() {
		var self = this;
		self.lists = ko.observableArray([]);
		self.newList = ko.observable();
		self.editingTask = ko.observable();

		self.addList = function(){
			self.lists.push(new ListViewModel(self.newList(), self.save, self.editTask));
			self.newList("");
			self.save();
		}

		self.editTask = function(data){
			self.editingTask(data);
			$('#myModal').modal();
		}

		self.save = function(){
   			localStorage.setItem("db", ko.toJSON(self.lists));
		}

		self.load = function(){
			if (localStorage.db) {

				var db = JSON.parse(localStorage.db);
				for (var i in db){
					var list = db[i];
					self.lists.push(new ListViewModel(list.listTitle, self.save, self.editTask, list.tasks))
				}
			}
		}

		self.load();
	}

  ko.applyBindings(new ViewModel(), $('html')[0]);
});
