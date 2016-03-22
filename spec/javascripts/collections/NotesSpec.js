describe('Notes Collection', function() {
  var Notes = cleverNote.Collections.Notes;
  var notes = new Notes();

  describe('#initialize', function() {
    it('does not set a notebook if notebook is not passed', function() {
      notes = new Notes();
      expect(notes.notebook).toBeUndefined();
    });

    it('sets notebook if passed', function() {
      notes = new Notes({ notebook: 'notebook'});
      expect(notes.notebook).toBe('notebook');
    });
  });

  describe('#parse', function() {
    describe('when response has page', function() {
      var response = { page: 4, total_pages: 6, models: {} };

      it('returns the response without the page params', function() {
        expect(notes.parse(response)).toBe(response.models);
      });

      it('sets the page attribute', function() {
        notes.parse(response);
        expect(notes.page).toBe(4);
      });

      it ('sets the totalPages attribute', function () {
        notes.parse(response);
        expect(notes.totalPages).toBe(6);
      });
    });

    describe('when response does not have page', function() {
      var response = { models: {} };

      it ('does not alter the response', function() {
        expect(notes.parse(response)).toBe(response);
      });
    });
  });

  describe('#getOrFetch', function() {
    var server;
    var callback;

    beforeEach(function () {
      server = sinon.fakeServer.create();
      callback = sinon.spy();
      notes.getOrFetch(1, callback);
    });

    afterEach(function () { server.restore(); });

    it('adds the fetched note to the collection', function() {
      respond(200, server);
      expect(notes.get(1)).toBeDefined();
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
