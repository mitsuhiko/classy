var Animal = Class.$extend({
  __init__: function(options) {
    options = typeof(options) == 'object' ? options : {name: 'Animal', health: 100};
    for (var key in options) {
      this[key] = options[key];
    }
    // required defaults
    this.name = (typeof(options.name) == 'string' ? options.name : 'Animal');
    this.health = (typeof(options.health) == 'integer' ? options.health : 100);
  },

  die: function() {
    this.health = 0;
  },

  eat: function(what) {
    this.health += 5;
  },

  dead: function() {
    return (this.health <= 0);
  }
});

var Parasite = Animal.$extend({
  eat: function(animal) {
    this.$super(animal);
    animal.health -= 5;
  }
});

var Cat = Animal.$extend({
  eat: function(animal) {
    this.$super(animal);
    animal.die();
  }
});

var HouseCat = Cat.$extend({
  'cute': true,
  'scary': false
});

var Lion = Cat.$extend({
  'cute': false,
  'scary': true
});
