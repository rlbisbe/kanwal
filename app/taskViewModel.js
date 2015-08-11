define(["jquery", "knockout"], function($, ko) {

	function CommentViewModel(title, timestamp){
		var self = this;
		self.title = ko.observable(title);
		self.timestamp = ko.observable(timestamp || new Date().toJSON().slice(0,10));
	}

	function TaskViewModel(onEditTask, onSaveEdition, title, description, comments){
		var self = this;
		self.title = ko.observable(title || "");
		self.description = ko.observable(description || "Add description");
		self.comments = ko.observableArray([]);
		self.newComment = ko.observable("");
		self.editingDescription = ko.observable(false);


		self.editDescription = function (argument) {
			self.editingDescription(true);
		}

		self.updateDescription = function (argument) {
			self.editingDescription(false);
			onSaveEdition();
		}

		self.editTask = function(){
			onEditTask(self);
		}

		self.addNewComment = function(){
			self.comments.unshift(new CommentViewModel(self.newComment()));
			self.newComment("");
			onSaveEdition();
		}

		if (comments) {
			for (var i in comments){
				self.comments.push(new CommentViewModel(comments[i].title, comments[i].timestamp))
			}
		};
	}

	return TaskViewModel;
});