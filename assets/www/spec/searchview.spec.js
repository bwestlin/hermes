describe('Map views search filter', function () {
  beforeEach(function () {
    var html = "<div data-role='page' id='page-map' style='width:200px; height:200px'>" +
        "<div id='search-box' class='ui-mini'>" +
        "<ul id='search-autocomplete' " +
        "data-role='listview' " +
        "data-theme='a' " +
        "data-filter-theme='a' " +
        "data-mini='true' " +
        "data-filter-mini='true' " +
        "data-filter='true' " +
        "data-filter-placeholder='Enter search string' " +
        "data-autodividers='true' " +
        "data-inset= 'true'>" +
        "</ul>" +
        "</div>" +
        "<div id='map_canvas'></div>" +
        "</div>";

    $('#stage').replaceWith(html);
    $.mobile.loadPage("#page-map");

    this.server = sinon.fakeServer.create();
    this.server.respondWith(
        "GET",
        Locations.prototype.url(),
        this.validResponse(this.fixtures.Locations.valid)
    );
  });

  afterEach(function () {
    $('#page-map').replaceWith("<div id='stage'></div>");
    this.server.restore();
  });

  describe('instantiation', function () {
    it('should initialize search view on map view initialization', function () {
      spyOn(SearchView.prototype, "initialize");
      new MapView({ el: $('#map_canvas') });
      expect(SearchView.prototype.initialize).toHaveBeenCalled();
    });

    it('should render search view on location refresh', function () {
      var mapView = new MapView({ el: $('#map_canvas') });
      spyOn(mapView.searchView, "render");
      runs(function () {
        mapView.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return mapView.locations.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect(mapView.searchView.render).toHaveBeenCalled();
      });
    });
  });

  //Maryams pill
  describe('filter functions', function () {
    it('should populate filter with the correct number of campuses', function () {
      this.server.respondWith(
        "GET",
        Locations.prototype.url(),
        this.validResponse(this.fixtures.Locations.valid)
      );

      var mapView = new MapView({ el: $('#map_canvas') });
      spyOn(mapView.searchView, "render");
      runs(function () {
        mapView.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return mapView.locations.length > 0;
      }, "Waiting for returning call", 1000);

      runs(function () {
        expect($("#search-autocomplete li").length).toEqual(0);
        mapView.searchView.populateFilter(["D144", "b a", "Aula Magna", "hejhej", "lars"]);
        expect($("#search-autocomplete li.ui-btn").length).toEqual(5);
      });
    });

 /*   it('should overwrite jquery mobiles filtering', function () {

      var list=["Axel", "Bar Axel", "Baxa"];
      this.server.respondWith(
        "GET",
        Locations.prototype.url(),
        this.validResponse(list)
      );

      var mapView = new MapView({ el: $('#map_canvas') });
      spyOn(mapView.searchView, "render");
      runs(function () {
        mapView.locations.fetch();
        this.server.respond();
      });

      waitsFor(function () {
        return mapView.locations.length > 0;
      }, "Waiting for returning call", 1000);


      runs(function () {
        expect(mapView.searchView.render).toHaveBeenCalled();
      });

      console.log("VADSOMHELST");

      expect($("#search-autocomplete li").length).toEqual(0);

      console.log($("#search-autocomplete li").html());
      $("#search-box input").val("A").change();
      expect($("#search-autocomplete li").length).toEqual(2);
    });*/
  });
});
