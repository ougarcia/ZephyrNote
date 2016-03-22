describe('Notebooks Collection', function() {
  var Notebooks = cleverNote.Collections.Notebooks;
  var notebooks = new Notebooks();

  it('has the correct url', function() {
    expect(notebooks.url).toBe('/api/notebooks');
  });

  it('has the correct title', function() {
    expect(notebooks.title).toBe('Notebooks');
  });

  it('has the correct model', function() {
    expect(notebooks.model).toBe(cleverNote.Models.Notebook);
  });

  describe('#getOrFetch', function() {
    var server;
    var callback;

    beforeEach(function () {
      server = sinon.fakeServer.create();
      callback = sinon.spy();
      notebooks.getOrFetch(1, callback);
    });

    afterEach(function () { server.restore(); });

    it('adds the fetched note to the collection', function() {
      respond(200, server);
      expect(notebooks.get(1)).toBeDefined();
    });

    it('calls the callback on success', function() {
      respond(200, server);
      expect(callback.calledOnce).toBeTruthy();
    });

    it('does not call the callback on failure', function() {
      respond(422, server);
      expect(callback.calledOnce).toBeFalsy();
    });

    function respond(status, server) {
      server.requests[0].respond(
        status,
        { "Content-Type": "application/json" },
        JSON.stringify([{ id: 1, title: 'test note'}])
      );
    }
  });
});
