// # Change #
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
  this.loops = loops
  this.multiedge = multiedge

  this.status = new Status(directed)
}

var cons = Change
  , proto = cons.prototype = Object.create(Status.prototype)

proto.constructor = cons


// ##`Change#add_link`##
// Add a link to the graph. If the graph does not allow multiple edges, check first to
// make sure we don't already have it. `Change#add_link` also updates the
// neighborhoods of the source and the target to include the new link.

// **Paremeters**:

// - `link`: A link object.
// - `force`: A d3.layout.force()-like object.

// **Returns**: 
// `true` if the link was successfully added to the array, `false` otherwise.

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

  this.force.links().push(link)
  return true
}

// ## `Change#remove_link` 

// Remove the link, once. If the graph is not directed, it will treat a link
// and its reverse as though they were identical. 

// This method will also update the neighborhood attributes of the source and
// target, removing its first argument from both.

// *Parameters:*

// - `link`: A link object
// - `force`:  a d3.layout.force()-like object

// **Returns:**  If the link to be removed remove is in the d3.layout.force().link() array, returns
// `true`. Returns `false` otherwise.

proto.remove_link = function(link, force) {
  var index = this.indexOf(link)
    , link_array = this.force.links()

  if(index === -1) {
    return false
  }

  target_index = source.neighborhood.indexOf(link)
  source_index = source.neighborhood.indexOf(link)

  link_array[index].source.neighborhood.splice(target_index, 1)
  link_array[index].target.neighborhood.splice(source_index, 1)

  link_array.splice(index, 1)
  return true
}

// ## `Change#reverse` ##
// Returns a new object which is the reverse of the argument.
proto.reverse = function(link) {
  var copy = this.copy(link)

  copy.source = link.target
  copy.target = link.source

  return copy
}

// ## `Change#copy` ##
// Produce a copy of the argument.
proto.copy = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}
