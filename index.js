module.exports = Change

var Status = require('d3.force-link-status')

// Change is an object to manipulate the links in a force directed graph.
// Paremeters:

// - `loops`: true if a link can connect a node to itself?
// - `directed`: true if a link from A -> B === B -> A?
// - `multiedge`: true if the link A -> B can appear multiple times in a graph.

// Change will maintain a new attribute on each of the nodes, called
// `neighborhood`, which is an array of references to each link from or two a
// node. This is to facilitate easy manipulation of the links relative to a
// node.

function Change(loops, directed, multiedge) {
  Status.call(this, directed)
  this.loops = loops
  this.multiedge = multiedge
}

var cons = Change
  , proto = cons.prototype = Object.create(Status.prototype)

proto.constructor = cons

// `Change#add_link`: Add a link to the graph. If the graph does not allow multiple edges, check first to
// make sure we don't already have it. `Change#add_link also updates the
// neighborhoods of the source and the target.
proto.add_link = function(link, force) {
  var name = this.name(link)
    , idx

  if(!this.multiedge && this.has(link, force)) {
    return false
  }
  if(!this.loops) {
    if (link.source == link.target) {
      return false
    }
  }

  link.source.neighborhood.push(link)
  link.target.neighborhood.push(link)

  this.links.push(link)
  return true
}

// removes the link, once. If the graph is not directed, will not know the
// difference between a link and its reverse. Can also take an array or a
// single link.
proto.remove_link = function(link, force) {
  var reverse 
    , remove = remove_link(force)

  if(!link.length) {
    link = [link]
  }

  return link.map(remove_link, this)
}

function remove_link(force) {
  return function(link, idx, link_array) {
    var index = this.indexOf(link)
      , link_array = this.force.links()

    // find the element in the links array and remove it
    if(index === -1) {
      return false
    }

    target_index = source.neighborhood.indexOf(link)
    source_index = source.neighborhood.indexOf(link)

    // remove the source from the targets neighborhood, and the target from the
    // source neighborhood
    link_array[index].source.neighborhood.splice(target_index, 1)
    link_array[index].target.neighborhood.splice(source_index, 1)

    // need to test to mak sure this updates the force array
    link_array.splice(index, 1)
    return true
  }
}

// returns a new object which is the reverse of `link`.
proto.reverse = function(link) {
  var copy = this.copy(link)

  copy.source = link.target
  copy.target = link.source

  return copy
}

// produce a copy of its argument.
proto.copy = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

