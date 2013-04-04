describe('PlayerView', function() {
  var view, songs;

  beforeEach(function() {
    songs = new Songs();
    songs.reset([
      {
        fake: 'data',
        url: '/test/testsong.mp3',
        title:'test song'
      },
      {
        fake: 'data2',
        url: '/test/testsong2.mp3',
        title: 'test2 song'
      }
    ]);
    view = new PlayerView({collection: songs});
  });

  it('should change when the first song is queued', function(){
    expect(view.model).toBeUndefined();
    var song = songs.models[0];
    song.set('queuedAt', new Date());
    expect(view.model).toEqual(song);
  });

  describe('what happens when the song ends', function(){

    it('should remove the old song from the playlist', function() {
      var playlistView = new PlaylistView({collection: songs});
      var song = songs.models[0];
      song.set('queuedAt', new Date());
      view.ended();
      expect(playlistView.queuedSongs()).not.toContain(song);
    });

    it('should get the next song in the playlist', function() {
      var playlistView = new PlaylistView({collection: songs});
      var song = songs.models[0];
      var song2 = songs.models[1];
      song.set('queuedAt', new Date());
      song2.set('queuedAt', new Date());
      view.ended();
      expect(view.model).toEqual(song2);
    });

  });
});