/**
 * @typedef {number[][]} Tree 2D array of graph node indexes w/ dimensions: 0 is edge start, 1 is edge end
 *
 * See: https://en.wikipedia.org/wiki/Tree_(graph_theory)
 *
 * NB: The whole 2D array will contain `nNodes * 2` elements because tree edges are undirected
 */

/**
 * @typedef {*} Rng Instance of a seeded psuedo random number generator
 */

/**
 * Returns a tree with `nNodes` nodes, generated w/ provided `rng` instance
 *
 * @function generateTree
 * @param {number} nNodes Number of nodes in generated tree
 * @param {Rng} rng Random number generator instance
 * @returns {Tree} Generated tree
 */
function generateTree(nNodes, rng) {
  // Initialize empty 2D array, [[],...], length: nNodes
  const tree = Array.from(Array(nNodes), () => new Array())
  // Add initial edge (0-1)
  tree[0].push(1)
  tree[1].push(0)
  // Generate remaining tree edges
  // Iterating over remaining 0-degree nodes, i: [2, nNodes)
  for (let i = 2; i < nNodes; i++) {
    // Select another random node with >0-degree
    const r = rng.getInt(i)
    // Add edge
    tree[i].push(r)
    tree[r].push(i)
  }
  return tree
}

function generateGridTree(nNodes, rng) {
  // Initialize empty 2D array, [[],...], length: nNodes
  const tree = Array.from(Array(nNodes), () => new Array())
  // Add initial edge (0-1)
  tree[0].push(1)
  tree[1].push(0)
  // Generate remaining tree edges
  // Iterating over remaining 0-degree nodes, i: [2, nNodes)
  for (let i = 2; i < nNodes; i++) {
    // Select another random node with >0-degree
    const r = rng.getInt(i)
    if (tree[i].length + 1 < 4 && tree[r].length + 1 < 4) {
      // Add edge
      tree[i].push(r)
      tree[r].push(i)
    } else {
      i--
    }
  }
  return tree
}

export { generateTree, generateGridTree }
