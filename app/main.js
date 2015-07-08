// to depend on a bower installed component:
// define(['component/componentName/file'])



define(["jquery", "knockout"], function($, ko) {

	function ListViewModel(title, onSave, tasks){
		var self = this;

		self.listTitle = ko.observable(title || "test");
		self.newTask = ko.observable();
		self.tasks = ko.observableArray(tasks || []);
		self.editingTitle = ko.observable(false);

		self.addTask = function(){
			self.tasks.push(self.newTask());
			self.newTask("");
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
	}

	function ViewModel() {
		var self = this;
		self.lists = ko.observableArray([]);
		self.newList = ko.observable();

		self.addList = function(){
			self.lists.push(new ListViewModel(self.newList(), self.save));
			self.newList("");
			self.save();
		}

		self.save = function(){
   			localStorage.setItem("db", ko.toJSON(self.lists));
		}

		self.load = function(){
			if (localStorage.db) {

				var db = JSON.parse(localStorage.db);
				for (var i in db){
					var list = db[i];
					self.lists.push(new ListViewModel(list.listTitle, self.save, list.tasks))
				}
			}
		}

		self.load();
	}

  ko.applyBindings(new ViewModel(), $('html')[0]);
});
