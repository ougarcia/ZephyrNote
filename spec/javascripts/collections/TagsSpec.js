describe('Tags Collection', function() {
  var Tags = cleverNote.Collections.Tags;
  var tags = new Tags();

  it('has the correct url', function() {
    expect(tags.url).toBe('/api/tags');
  });

  it('has the correct title', function() {
    expect(tags.title).toBe('Tags');
  });

  it('has the correct model', function() {
    expect(tags.model).toBe(cleverNote.Models.Tag);
  });

  describe('#getOrFetch', function() {
    var server;
    var callback;

    beforeEach(function () {
      server = sinon.fakeServer.create();
      callback = sinon.spy();
      tags.getOrFetch(1, callback);
    });

    afterEach(function () { server.restore(); });

    it('adds the fetched note to the collection', function() {
      respond(200, server);
      expect(tags.get(1)).toBeDefined();
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
