Meteor.methods({
  google: function(query) {
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    var response = Meteor.http.get('https://www.googleapis.com/customsearch/v1?key='+config.googleApiKey+'&cx=013036536707430787589:_pqjad5hr1a&q='+query+'&alt=json');
    if (response.statusCode === 200) {
      var data = response.data;
      //todo: find date inside items, for instance "e3 date" was query
      if(data.items[0]) {
        return data.items[0].link+" ("+data.items[0].title+")";
      }
    }
    return fourohfour.random();
  }
});