/**
* @ngdoc directive
* @name plateauAppApp.controller:trombinoscopeCtrl
* @description Directive permettant d'afficher notre organigramme de la dpo
*/
(function() {
	angular.module('plateauAppApp.directives')
	.directive('orgDpoEspPro',['d3','$http',displayOrgDpoEspPro] );
	function displayOrgDpoEspPro(d3,$http) {
		return {
			restrict : "EA",
			link : function(scope){
				var data = d3.json("../../data/collaborateur_dpo_program2_esp_pro.json", function(error, data) {
					// *** Convert data into parent child relationships
					var dataMap = data.reduce(function(map, node) {
						map[node.name] = node;
						return map;
					}, {});

					var treeData = [];

					data.forEach(function(node) {
						var manager = dataMap[node.manager];
						if (manager) {
							(manager.children || (manager.children = [])).push(node);
						} else {
							treeData.push(node);
						}
					});

					// *** Set up the SVG

					var margin = {
						top: 50,
						right: 120,
						bottom: 20,
						left: 150
					},
					width = 800 - margin.right - margin.left,
					height = 750 - margin.top - margin.bottom;

					var i = 0,
					duration = 750,
					root;

					var tree = d3.layout.tree()
					.size([height, width]);

					var diagonal = d3.svg.diagonal()
					.projection(function(d) {
						return [d.x, d.y];
					});

					var svg = d3.select("org-dpo-esp-pro").append("svg")
					.attr("width", 1000)
					.attr("height", 1500)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					var nodesLayer = svg.append('g').attr('id', 'nodes-layer');

					root = treeData[0];
					root.x0 = height / 2;
					root.y0 = 0;

					function collapse(d) {
						if (d.children) {
							d._children = d.children;
							d._children.forEach(collapse);
							d.children = null;
						}
					}

					root.children.forEach(collapse);
					update(root);

					function update(source) {

						// Compute the new tree layout.
						var nodes = tree.nodes(root).reverse(),
						links = tree.links(nodes);

						// Normalize for fixed-depth.
						nodes.forEach(function(d) {
							d.y = d.depth * 200;
						});

						// Update the nodes…
						var node = svg.selectAll("g.node")
						.data(nodes, function(d) {
							return d.id || (d.id = ++i);
						});

						// Enter any new nodes at the parent's previous position.
						var nodeEnter = node.enter().append("g")
						.attr("class", "node")
						.attr("transform", function(d) {
							return "translate(" + source.x0 + "," + source.y0 + ")";
						})
						.on("click", click);

						nodeEnter.append("circle")
						//.attr("r", 1e-6)
						.attr("r", 40)
						.style("fill", function(d) {
							return d._children ? "lightsteelblue" : "#fff";
						})
						.style("stroke", function(d) {
							return d._children ? "#7B6490" : "#009498"
						});

						var defs = nodesLayer.append('defs');
						var clipPath = defs.append('clipPath')
						.attr('id', 'clip-circle')
						.append('circle')
						.attr('r', 40);

						nodeEnter.append("image")
						.attr("xlink:href", function(d) {
							return d.photo;
						})
						.attr("x", "-55px")
						.attr("y", "-50px")
						.attr("width", "110px")
						.attr("height", "100px")
						.attr('clip-path', 'url(#clip-circle)');
						nodeEnter.append("text")
						.attr("x", function(d) {
							return d.children || d._children ? -55 : 55;
						})
						.attr("dy", "-15")
						.attr("stroke", "black")
						.attr('font-size',16)
						.attr("text-anchor", function(d) {
							return d.children || d._children ? "end" : "start";
						})
						.text(function(d) {
							return d.name;
						})
						.style("fill-opacity", 1);
						nodeEnter.append("text")
						.attr("x", function(d) {
							return d.children || d._children ? -55 : 55;
						})
						.attr("dy", "0")
						.attr("fill", "gray")
						.attr('font-size',14)
						.attr("text-anchor", function(d) {
							return d.children || d._children ? "end" : "start";
						})
						.text(function(d) {
							return d.title;
						})
						.style("fill-opacity", 1);
						nodeEnter.append("text")
						.attr("x", function(d) {
							return d.children || d._children ? -55 : 55;
						})
						.attr("dy", "15")
						.attr("fill", "#CF022B")
						.attr('font-size',12)
						.attr("text-anchor", function(d) {
							return d.children || d._children ? "end" : "start";
						})
						.text(function(d) {
							return "(" + d.projet + ")";
						})
						.style("fill-opacity", 1);

						// Transition nodes to their new position.
						var nodeUpdate = node.transition()
						.duration(duration)
						.attr("transform", function(d) {
							return "translate(" + d.x + "," + d.y + ")";
						});

						nodeUpdate.select("circle")
						//.attr("r", 4.5)
						.attr("r", 40)
						.style("fill", function(d) {
							return d._children ? "lightsteelblue" : "#fff";
						});

						nodeUpdate.select("text")
						.style("fill-opacity", 1);

						// Transition exiting nodes to the parent's new position.
						var nodeExit = node.exit().transition()
						.duration(duration)
						.attr("transform", function(d) {
							return "translate(" + source.x + "," + source.y + ")";
						})
						.remove();

						nodeExit.select("circle")
						//.attr("r", 1e-6);
						.attr("r", "40");

						nodeExit.select("text")
						.style("fill-opacity", 1e-6);

						// Update the links…
						var link = svg.selectAll("path.link")
						.data(links, function(d) {
							return d.target.id;
						});

						// Enter any new links at the parent's previous position.
						link.enter().insert("path", "g")
						.attr("class", "link")
						.attr("d", function(d) {
							var o = {
								x: source.x0,
								y: source.y0
							};
							return diagonal({
								source: o,
								target: o
							});
						});

						// Transition links to their new position.
						link.transition()
						.duration(duration)
						.attr("d", diagonal);

						// Transition exiting nodes to the parent's new position.
						link.exit().transition()
						.duration(duration)
						.attr("d", function(d) {
							var o = {
								x: source.x,
								y: source.y
							};
							return diagonal({
								source: o,
								target: o
							});
						})
						.remove();

						// Stash the old positions for transition.
						nodes.forEach(function(d) {
							d.x0 = d.x;
							d.y0 = d.y;
						});
					}

					// Toggle children on click.
					function click(d) {
						//root.children.forEach(collapse);
						if (d.children) {
							d._children = d.children;
							d.children = null;
						} else {
							d.children = d._children;
							d._children = null;
						}
						update(d);
					}


				});
			}
		}

	};

})();
