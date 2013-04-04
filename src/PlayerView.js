var PlayerView = Backbone.View.extend({

  initialize: function(){
    // set up an event listener on the songs collection
    this.collection.on('change', this.handleQueueChange, this);
    this.collection.on('ended', this.handleQueueChange, this);
  },

  // templates are a nicer way to put js data into html strings
  template: _.template('<audio src="<%= url %>" controls autoplay></audio><div><%= title %></div>'),

  events: {
  },

  render: function(){
    var that = this;
    if(this.model){
      this.$el.html(this.template(this.model.attributes));
    }
    this.$('audio').on('ended', function() {that.ended();});
    return this.$el;
  },

  play: function(model) {
    this.model = model;
    this.render();
  },

  ended: function() {
    this.model.unset('queuedAt');
  },

  // event listener
  handleQueueChange: function(){
    if(!this.model || this.model !== this.collection.queued()[0]){
      this.model = this.collection.queued()[0];
      this.render();
    }
  }

});