test('Classy exists', function() {
  ok(typeof(Class) == 'function',
    'Class is a function defined globally');
});

test('$noConflict unsets Class from window', function() {
  var original = Class;

  var Classy = Class.$noConflict();

  equals(typeof(Class), 'undefined',
    '$noConflict unsets Class from window');

  same(Classy, original,
    'the returned Class is the same as the original');

  // cleanup
  window.Class = original;
});

test('$super calls parent method', function() {
  var Greeter = Class.$extend({
    greeting: function() { return 'Armin!'; }
  });
  var Spaniard = Greeter.$extend({
    greeting: function() { return 'Hola, ' + this.$super(); }
  });
  var Englishman = Greeter.$extend({
    greeting: function() { return 'Hello, ' + this.$super(); }
  });
  same((Spaniard().greeting()), 'Hola, Armin!',
    'Spanish greeting generated.');
  same((Englishman().greeting()), 'Hello, Armin!',
    'English greeting generated.');
});

test('$extend exists and works', function() {
  same(typeof(Class.$extend), 'function',
    'basic class has $extend function');

  var SubClass = Class.$extend({});

  same(typeof(SubClass.$extend), 'function',
    'subclasses also receive $extend');

  same(SubClass.$extend, Class.$extend,
    'base class and subclass have same $extend function');
});

test('classes can be used with or without `new`.', function() {
  var pig1 = new Animal('pig');
  var pig2 = Animal('pig');

  same(pig1, pig2,
    'Animal instances are the same when made with or without `new`');
});

test('__init__ is called with correct arguments', function() {
  var Instrument = Class.$extend({
    __init__: function(volume) {
      this.volume = volume;
    }
  });
  flute = Instrument(20);
  cymbal = Instrument(100);
  equal(flute.volume, 20);
  equal(cymbal.volume, 100);
});

test('basic classical inheritence works', function() {
  garfield = HouseCat({funny: true});
  heathcliff = HouseCat({funny: false});

  equal(garfield.funny, true,
    'attribute was set on instance');
  equal(heathcliff.funny, false,
    'attribute was set on instance');
  equal(typeof(HouseCat().funny), 'undefined',
    'base HouseCat is not affected by subclass mutations');
});

test('instanceof works', function() {
  var lion = Lion();
  ok(lion instanceof Lion,
    'instanceof works on class instances');
  ok(lion instanceof Cat,
    'instanceof works on subclass instances');
  ok(lion instanceof Animal,
    'instanceof works on deep subclass instances');
  ok(!(lion instanceof HouseCat),
    'isinsinstance is false when expected');
});

test('mixins work', function() {
  FatMixin = {
    'is_fat': true,
    'describe': function() {
      return this.name + ' is fat!';
    }
  };
  FatCat = Cat.$extend({
    '__include__': [FatMixin]
  });
  garfield = FatCat({name:'Garfield'});

  ok(garfield.is_fat,
    'mixin attribute is defined');
  equal(garfield.describe(), 'Garfield is fat!',
    'mixin has access to corrent `this.');
});

test('exercise test methods', function() {
  var tick = Parasite();
  var leo = Lion();
  var garfield = HouseCat();

  ok(!(garfield.scary),
    'Cat instances are not scary.');

  ok(leo.scary,
    'Lion instances are scary.');

  equal(garfield.health, 100,
    'default health is 100');

  tick.eat(garfield);

  equal(garfield.health, 95,
    'tick removes 5 health');

  ok(!(garfield.dead()),
    'still not dead');

  leo.eat(garfield);

  ok(garfield.dead(),
    'garfield loses a life');
});

test('non-new creation calls __init__ just once', function() {
  var catched = [];
  var Test = Class.$extend({
    __init__ : function() {
      catched.push(true);
    }
  });
  Test();
  new Test();
  equal(catched.length, 2);
});
