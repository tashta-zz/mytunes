var PlaylistEntryView = Backbone.View.extend({

  template: _.template(
      '<div><%= title %><a class= "remove" href="/">Remove from playlist</a></div>'
  ),

  events: {
  	'click .remove': 'remove'
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  },

  remove:function(e){
  	e.preventDefault();
  	this.model.unset('queuedAt');
  }

});
