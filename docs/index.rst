Classy Classes for JavaScript
=============================

Wooya.  You love JavaScript and use jQuery or another lightweight library
extensively but you notice that your code becomes messier and messier the
larger the application grows?  Well, that's where Classy comes in.  Classy
is a small JavaScript library that implements Python inspired classes for
JavaScript.

Where can you get that classy library?  You can get it from `github
<http://github.com/mitsuhiko/classy>`_:
`Classy 1.4 <http://github.com/mitsuhiko/classy/raw/1.4/classy.js>`_

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

.. js:function:: Class.$withData(data)

   Creates a new instance of the class by bypassing the constructor and
   assigning the attributes from the given object.  This is useful if you
   want to attach methods to an object recieved from a JSON object:

   .. sourcecode:: javascript

      var MyClass = Class.$extend({
        __init__ : function() { alert('called'); },
        toString() : function() {
          return this.value;
        })
      });
      var obj = MyClass.$withData({value: 42});
      alert(obj.toString());

   The example above will alert ``"42"`` only.  So the constructor is not
   called but you have access to the methods defined in the class.

   .. versionadded:: 1.2

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

.. js:attribute:: this.$class

   The class object for this instance.  This is especially useful to
   acccess class attributes from instances.

   .. versionadded:: 1.2

.. js:function:: Class.__init__()

   The constuctor of a class.  This is created immediately after a
   class was created and gets all the arguments passed when the
   object was created:

   .. sourcecode:: javascript
   
       var leo = new Tiger("Leo", 3);
       // --> __init__ is invoked with "Leo" and 3

.. js:attribute:: Class.__include__

   When this attribute is provided when the class is created and set to a
   list of ordinary objects, each attribute of such an object is mixed
   into the class.  Imagine you have some functionality you want to export
   from multiple classes, this is the perfect way:

   .. sourcecode:: javascript
    
      var UpdateMixin = {
        update : function(options) {
          var (var key in options)
            this[key] = options[key];
        }
      };

      var MyClass = Class.$extend({
        __include__ : [UpdateMixin]
      });

      var obj = MyClass();
      obj.update({foo: 1, bar: 2});
      // obj.foo --> 1

   This is similar to subclassing but has the advantage that you can mix
   multiple functions in at the same time.  Please note that you can only
   mix in regular objects, not actual classes with a prototype (like those
   created with `Class.$extend`).

.. js:attribute:: Class.__classvars__

   An object of items that should be added to the class as class level
   attributes:

   .. sourcecode:: javascript

      var MyClass = Class.$extend({
          __classvars__ : {
            MAX_ITEMS : 42
          }
      });
      alert(MyClass.MAX_ITEMS);

   This shows a message box with ``"42"``.  To access these attributes
   from an instance, use the ``$class`` attribute of instances:

   .. sourcecode:: javascript

      alert(MyClass().$class.MAX_ITEMS);

   .. versionadded:: 1.2
