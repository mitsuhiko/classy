Classy Classes for JavaScript
=============================

Wooya.  You love JavaScript and use jQuery or another lightweight library
extensively but you notice that your code becomes messier and messier the
larger the application grows?  Well, that's where Classy comes in.  Classy
is a small JavaScript library that implements Python inspired classes for
JavaScript.

Where can you get that classy library?  You can get it from `github
<http://github.com/mitsuhiko/classy>`_:
`Classy 1.0 <http://github.com/mitsuhiko/classy/raw/1.0/classy.js>`_

How does this look like?

Enabling The Library
--------------------

.. sourcecode:: html

   <script type="text/javascript" src="classy.js"></script>

Defining Classes
----------------

.. sourcecode:: javascript

    var Animal = Class.$extend({
      __init__ : function(name, age) {
        this.name = name;
        this.age = age;
        this.health = 100;
      },

      die : function() {
        this.health = 0;
      },

      eat : function(what) {
        this.health += 5;
      }
    });

Creating Subclasses
-------------------

.. sourcecode:: javascript

    var Tiger = Animal.$extend({
      eat : function(animal) {
        this.$super(animal);
        animal.die();
      }
    });

    var Sheep = Animal.$extend({
      __init__ : function(name, age) {
        this.$super(name, age);
        this.shorn = false;
      }
    });

Using These Classes
-------------------

.. sourcecode:: javascript

    var leo = Tiger("Leo", 3);
    var molli = Sheep("Molli", 1);
    leo.eat(molli);

Alternatively you can also use the `new` operator like with regular
JavaScript classes.  But no worries, both do exactly the same:

.. sourcecode:: javascript

    var leo = new Tiger("Leo", 3);
    var molli = new Sheep("Molli", 1);
    leo.eat(molli);

You want to check if an object is an instance of something?  That's
easy as well:

.. sourcecode:: javascript

    var leo = new Tiger("Leo", 3);
    leo instanceof Animal // -> true

Recap and Outro
---------------

What you can do with Classy:

.. js:attribute:: Class.$classyVersion

   The version of Classy as string (``1.0`` for instance).

.. js:function:: Class.$extend(properties)

   Creates a new class by extending the given class.  The `properties`
   is an object with class attributes and methods (functions) for this
   class.

.. js:function:: Class.$noConflict()

   Removes the `Class` object from the `window` object and restores what
   was there before Classy was loaded.  It then returns the class
   object from the function.  This makes it possible to use multiple
   versions of Classy side by side or in combination with other libraries
   that also define an object with that name.  Example usage:

   .. sourcecode:: javascript

      (function(Class) {
        // here you can use the Classy Class object, outside it
        // won't be available
      })(Class.$noConflict());

.. js:function:: this.$super()

   When called from within a Classy function this invokes the parent
   function of the same name.  The arguments are forwarded directly.
   Check out the examples above for how that works.

.. js:function:: Class.__init__()

   The constuctor of a class.  This is created immediately after a
   class was created and gets all the arguments passed when the
   object was created:

   .. sourcecode:: javascript
   
       var leo = new Tiger("Leo", 3);
       // --> __init__ is invoked with "Leo" and 3
