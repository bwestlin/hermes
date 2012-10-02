var SearchView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, "render", "doSearch", "renderResultList");

    this.collection = new Persons();
    this.collection.on("reset", this.renderResultList, this);

    this.render();
  },

  render: function() {
    var template = _.template( $("#search_template").html(), {} );
    this.el.innerHTML = template;
  },

  events: {
    "click input[type=button]": "doSearch"
  },

  doSearch: function( event ){
    this.collection.fetch({
      data: {user: $("#search_input").val().trim()},
      error: function() {alert("ERROR! Failed to fetch search results.")}
    });
  },

  renderResultList: function() {
    var variables = { result_count: this.collection.length };
    var template = _.template( $("#result_template").html(), variables );
    this.$el.children('#result_content').html(template);

    var that = this;
    _.each(this.collection.models, function (item) {
      that.renderPerson(item);
    });
  },

  renderPerson: function (item) {
    var personView = new PersonView({
      model:item
    });

    this.$el.find('#result_list').append(personView.render().el);
  }
});