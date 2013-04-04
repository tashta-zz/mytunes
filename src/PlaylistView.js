var PlaylistView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('change', this.render, this);
    this.collection.on('ended', this.render, this);
  },

  queuedSongs: function(){
    return this.collection.queued();
  },

  render: function(){
    if (this.queuedSongs().length>0){
      this.subviews = this.queuedSongs().map(function(song){
        return new PlaylistEntryView({model: song});
      });
      return this.$el.html("<h3>Playlist</h3>").append(
        _(this.subviews).map(function(subview){
          return subview.render();
        })
      );
    } else {
      return this.$el.html("click on something");
    }
  },

  ended: function(model) {
    this.model = model;
    this.render();
  }

});




