describe('Router', function() {
  var Router = cleverNote.Routers.Router;
  var trigger = {trigger: true};
  var router;

  beforeEach(function() {
    Backbone.history.stop();
    spyOn(Router.prototype, 'startPage');
    spyOn(Router.prototype, 'newNote');
    spyOn(Router.prototype, 'showNote');
    spyOn(Router.prototype, 'showNotebook');
    spyOn(Router.prototype, 'showTag');

    router = new cleverNote.Routers.Router({
      notebooks: new cleverNote.Collections.Notebooks(),
      tags: new cleverNote.Collections.Tags(),
      $rootEl: $('<div>')
    });

    Backbone.history.start();
  });

  it('/notes/new routes to new note page', function() {
    Backbone.history.navigate('/notes/new', trigger);
    expect(router.newNote).toHaveBeenCalled();
  });

  it('empty route routes to start page', function(){
    Backbone.history.navigate('', trigger);
    expect(router.startPage).toHaveBeenCalled();
  });

  it('/notes/:id routes to note with id', function(){
    router.navigate('/notes/1', trigger);
    expect(router.showNote).toHaveBeenCalledWith('1', null);
  });

  it('/notebooks/:id routes to notebook with id', function(){
    router.navigate('/notebooks/1', trigger);
    expect(router.showNotebook).toHaveBeenCalledWith('1', null);
  });

  it('/tags/:id routes to tag with id', function(){
    router.navigate('/tags/1', trigger);
    expect(router.showTag).toHaveBeenCalledWith('1', null);
  });
});
