var Change = require('./index')
  , test = require('test')




function Tester(loops, directed, multiedge) {
  this.loops = loops
  this.multiedge = multiedge
  this.directed = directed

  this.c =  new Change
}

Tester.prototype.go = function() {
  this.setup()
  this.add_link()
  this.remove_link()
  this.reverse_link()
  this.copy()
}

Tester.prototype.setup = function() {
  // need to initalize a force directed graph, or at least a force driected
  // graph like thing
}

Tester.prototype.add_link = function() {
}

Tester.prototype.remove_link = function() {

}

Tester.prototype.reverse_link = function() {

}

Tester.prototype.copy = function() {

}
