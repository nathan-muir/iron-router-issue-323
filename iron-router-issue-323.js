if (Meteor.isClient) {

  function DummySubscriptionHandle(duration){
    var self = this;
    var id = Random.id();
    console.log(id, "# new DummySubscriptionHandle(", duration, ")");
    self._dep = new Deps.Dependency;
    self._ready = false;
    self._to = Meteor.setTimeout(function(){
      self._ready = true;
      self._dep.changed();
      console.log(id, "# subscription ready");
    }, duration);
  }
  DummySubscriptionHandle.prototype.ready = function(){
    var self = this;
    Deps.active && self._dep.depend();
    return this._ready;
  };
  DummySubscriptionHandle.prototype.stop = function(){
    Meteor.clearTimeout(self._to);
  };

  UI.registerHelper('prettyData', function(){
    return JSON.stringify(this);
  });

  Router.map(function(){

    this.route('home', {
      path: '/',
      template: 'navigation',
      layoutTemplate: 'noLayout'
    });

    this.route('content-a-1',{
      path: '/content/a/1',
      template: 'contentA1',
      layoutTemplate: 'layoutA',
      yieldTemplates: {
        "navigation": {to: "navigation"},
        "contentASpecial": {to: "layoutAYield"}
      },
      waitOn: function(){
        return new DummySubscriptionHandle(10 * 1000);
      },
      data: function(){
        return {
          "data-source": "content-a-1"
        }
      },
      onBeforeSwitch: function(pause){
        if (!this.ready()){
          console.log("DummySubscriptionHandle not ready, pausing loading");
          pause();
        }
      }
    });

    this.route('content-a-2',{
      path: '/content/a/2',
      template: 'contentA2',
      layoutTemplate: 'layoutA',
      yieldTemplates: {
        "navigation": {to: "navigation"},
        "contentASpecial": {to: "layoutAYield"}
      },
      waitOn: function(){
        return new DummySubscriptionHandle(10 * 1000);
      },
      data: function(){
        return {
          "data-source": "content-a-2"
        }
      },
      onBeforeSwitch: function(pause){
        if (!this.ready()){
          console.log("DummySubscriptionHandle not ready, pausing loading");
          pause();
        }
      }
    });



    this.route('content-b-1',{
      path: '/content/b/1',
      template: 'contentB1',
      layoutTemplate: 'layoutB',
      yieldTemplates: {
        "navigation": {to: "navigation"},
        "contentBSpecial": {to: "layoutBYield"}
      },
      waitOn: function(){
        return new DummySubscriptionHandle(10 * 1000);
      },
      data: function(){
        return {
          "data-source": "content-b-1"
        }
      },
      onBeforeSwitch: function(pause){
        if (!this.ready()){
          console.log("DummySubscriptionHandle not ready, pausing loading");
          pause();
        }
      }
    });

    this.route('content-b-2',{
      path: '/content/b/2',
      template: 'contentB2',
      layoutTemplate: 'layoutB',
      yieldTemplates: {
        "navigation": {to: "navigation"},
        "contentBSpecial": {to: "layoutBYield"}
      },
      waitOn: function(){
        return new DummySubscriptionHandle(10 * 1000);
      },
      data: function(){
        return {
          "data-source": "content-b-2"
        }
      },
      onBeforeSwitch: function(pause){
        if (!this.ready()){
          console.log("DummySubscriptionHandle not ready, pausing loading");
          pause();
        }
      }
    });




  });


}
