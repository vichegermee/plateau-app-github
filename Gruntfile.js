'use strict';
/**
 * @ngdoc interface
 * @name Grunt
 * @module Grunt
 * 
 * @description Dans ce module on va configurer les différentes taches que l'on
 *              souhaite appliquer à notre appliquer et les lancer
 * @example
 * 
 * <pre>
 * grunt
 * 		.registerTask('default', [ 'newer:jshint', 'newer:jscs', 'test',
 * 				'build' ]);
 * </pre>
 * 
 * Ici seront lancer les taches par defaut.Pour lancer ces taches on procede de
 * la maniere suivante :
 * 
 * @example
 * 
 * <pre>
 * grunt
 * </pre>
 */
/**
 * @ngdoc object
 * @name grunt initConfig
 * @module Grunt
 * 
 * @description A linterieur de la fonction wrapper on a un bloc (initConfig) et
 *              un ensemble de tache personnalisée. Ce bloc (initConfig) permet
 *              de configurer l'ensemble des tâches lancées par Grunt.
 * 
 * @example
 * 
 * <pre>
 *   // injection de dependances dans le fichier index.html
 *   wiredep : {
 *   app : {
 *   src : [ '&lt;%= yeoman.app %&gt;/index.html' ],
 *   ignorePath : /\.\.\//
 *   },	  
 * </pre>
 */
module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// loads all grunt tasks
	require('load-grunt-tasks')(grunt);
	
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin',
		ngtemplates: 'grunt-angular-templates',
		cdnify: 'grunt-google-cdn',
		configureProxies: 'grunt-connect-proxy'
	});

	// Configurable paths for the application
	var appConfig = {
		app : require('./bower.json').appPath || 'app',
		dist : 'dist'
	};

	grunt.initConfig({

			
				yeoman : appConfig,
				/**
				 * @ngdoc function
				 * @name watch
				 * @module Grunt
				 * 
				 * @description Cette fonction a pour role d'exécuter des taches
				 *              predefinies à chaque fois que les modèles de
				 *              fichiers surveillés sont ajoutés, modifiés ou
				 *              supprimés et recharge la page grace au
				 *              livereload
				 */
				watch : {
					bower : {
						files : [ 'bower.json' ],
						tasks : [ 'wiredep' ]
					},
					js : {
						files : [ '<%= yeoman.app %>/**/{,*/}*.js' ],
						tasks : [ 'newer:jshint:all', 'newer:jscs:all' ],
						options : {
							livereload : '<%= connect.options.livereload %>'
						}
					},
					jsTest : {
						files : [ 'test/spec/{,*/}*.js' ],
						tasks : [ 'newer:jshint:test', 'newer:jscs:test',
								'karma' ]
					},
					styles : {
						files : [ '<%= yeoman.app %>/**/habillage/{,*/}*.css' ],
						tasks : [ 'newer:copy:styles', 'postcss' ]
					},
					gruntfile : {
						files : [ 'Gruntfile.js' ]
					},
					livereload : {
						options : {
							livereload : '<%= connect.options.livereload %>'
						},
						files : [ '<%= yeoman.app %>/**/{,*/}*.html',
								'<%= yeoman.app %>/**/habillage/{,*/}*.css',
								'<%= yeoman.app %>/**/habillage/{,*/}*.{png,jpg,jpeg,gif,webp,svg}' ]
					}
				},
				/**
				 * @ngdoc function
				 * @name connect
				 * @module Grunt
				 * 
				 * @description Cette fonction a pour role de lancer un serveur
				 *              web afin d'executer notre code en utilisant
				 *              livereload. Elle permet aussi de lancer un
				 *              serveur pour nos tests.
				 */
				// The actual grunt server settings
				connect : {
					options : {
						port : 9000,
						// Change this to '0.0.0.0' to access the server from
						// outside.
						hostname : 'localhost',
						livereload : 35729
					},
					 proxies: [
					{
						context: '/collaborateurs', 
						host: 'localhost',
						port: 3001
					}],
					livereload : {
						options : {
							open : true,
							middleware : function(connect) {
								 var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
								return [
										proxy,   
										connect.static('.tmp'),
										connect()
												.use(
														'/bower_components',
														connect
																.static('./bower_components')),
										connect()
												.use(
														'/app/**/habillage',
														connect
																.static('./app/**/habillage')),
										connect.static(appConfig.app) ];
							}
						}
					},
					test : {
						options : {
							port : 9001,
							middleware : function(connect) {
								return [
										connect.static('.tmp'),
										connect.static('test'),
										connect()
												.use(
														'/bower_components',
														connect
																.static('./bower_components')),
										connect.static(appConfig.app) ];
							}
						}
					},
					dist : {
						options : {
							open : true,
							base : '<%= yeoman.dist %>'
						}
					}
				},

				
				/**
				 * @ngdoc function
				 * @name jshint
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de valider la qualité du
				 *              code javaScript.
				 *               all : analyse tous les fichiers specifiés dans src .
				 *              test : analyse tous les  fichiers de test specifiés dans src.
				 *             
				 */
				jshint : {
					options : {
						jshintrc : '.jshintrc',
						reporter : require('jshint-stylish')
					},
					all : {
						src : [ 'Gruntfile.js', '<%= yeoman.app %>/{,*/}*.js' ]
					},
					test : {
						options : {
							jshintrc : 'test/.jshintrc'
						},
						src : [ 'test/spec/{,*/}*.js' ]
					}
				},

				
				/**
				 * @ngdoc function
				 * @name jscs
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de verifier le style du
				 *              code javaScript.
				 *               all : analyse tous les fichiers specifiés dans src.
				 *               test : analyse tous les  fichiers de test specifiés dans src.
				 *             
				 */
				jscs : {
					options : {
						config : '.jscsrc',
						verbose : true
					},
					all : {
						src : [ 'Gruntfile.js', '<%= yeoman.app %>/{,*/}*.js' ]
					},
					test : {
						src : [ 'test/spec/{,*/}*.js' ]
					}
				},

				
				/**
				 * @ngdoc function
				 * @name clean
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de nettoyer des
				 *              repertoires.
				 *               dist: nettoie le contenu repertoire dist suivant les chemins specifiés dans src.
				 *               server:nettoie le fichier .tmp contenant les fichiers concatenés
				 */
				clean : {
					dist : {
						files : [ {
							dot : true,
							src : [ '.tmp', '<%= yeoman.dist %>/{,*/}*',
									'!<%= yeoman.dist %>/.git{,*/}*' ]
						} ]
					},
					server : '.tmp',
					doc : 'docs'	
				},

				
				/**
				 * @ngdoc function
				 * @name postcss
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de transformer les fichiers css
				 */
				postcss : {
					options : {
						processors : [ require('autoprefixer-core')({
							browsers : [ 'last 1 version' ]
						}) ]
					},
					server : {
						options : {
							map : true
						},
						files : [ {
							expand : true,
							cwd : '.tmp/styles/',
							src : '{,*/}*.css',
							dest : '.tmp/styles/'
						} ]
					},
					dist : {
						files : [ {
							expand : true,
							cwd : '.tmp/styles/',
							src : '{,*/}*.css',
							dest : '.tmp/styles/'
						} ]
					}
				},

			
				/**
				 * @ngdoc function
				 * @name wiredep
				 * @module Grunt
				 * 
				 * @description Cette fonction permet d'injecter des dependances
				 * 			app : injecte des dependances dans le fichier html
				 * 			test: injecte automatiquement des dependances dans le fichier de config de karma
				 */
				wiredep : {
					app : {
						src : [ '<%= yeoman.app %>/index.html' ],
						ignorePath : /\.\.\//
					},
					test : {
						devDependencies : true,
						src : '<%= karma.unit.configFile %>',
						ignorePath : /\.\.\//,
						fileTypes : {
							js : {
								block : /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
								detect : {
									js : /'(.*\.js)'/gi
								},
								replace : {
									js : '\'{{filePath}}\','
								}
							}
						}
					}
				},

			
				filerev : {
					dist : {
						src : [
								'<%= yeoman.dist %>/**/{,*/}*.js',
								'<%= yeoman.dist %>/**/styles/{,*/}*.css',
								'<%= yeoman.dist %>/**/styles/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
								'<%= yeoman.dist %>/styles/fonts/*' ]
					}
				},

				useminPrepare : {
					html : '<%= yeoman.app %>/index.html',
					options : {
						dest : '<%= yeoman.dist %>',
						flow : {
							html : {
								steps : {
									js : [ 'concat', 'uglifyjs' ],
									css : [ 'cssmin' ]
								},
								post : {}
							}
						}
					}
				},
				/**
				 * @ngdoc function
				 * @name imagemin
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de compresser des images
				 * 				provenant de app pour les mettre en suite dans le repertoire dist
				 */
				imagemin : {
					dist : {
						files : [ {
							expand : true,
							cwd : '<%= yeoman.app %>/**/habillage',
							src : '{,*/}*.{png,jpg,jpeg,gif}',
							dest : '<%= yeoman.dist %>/**/styles'
						} ]
					}
				},
				/**
				 * @ngdoc function
				 * @name svgmin
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de compresser des SVG
				 * 				provenant de app pour les mettre en suite dans le repertoire dist
				 */
				svgmin : {
					dist : {
						files : [ {
							expand : true,
							cwd : '<%= yeoman.app %>/**/habillage',
							src : '{,*/}*.svg',
							dest : '<%= yeoman.dist %>/**/styles'
						} ]
					}
				},
				/**
				 * @ngdoc function
				 * @name htmlmin
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de compresser les fichiers html
				 * 				provenant de app pour les mettre en suite dans le repertoire dist
				 */
				htmlmin : {
					dist : {
						options : {
							collapseWhitespace : true,
							conservativeCollapse : true,
							collapseBooleanAttributes : true,
							removeCommentsFromCDATA : true
						},
						files : [ {
							expand : true,
							cwd : '<%= yeoman.dist %>',
							src : [ '*.html' ],
							dest : '<%= yeoman.dist %>'
						} ]
					}
				},
				/**
				 * @ngdoc function
				 * @name ngtemplates
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet d'accelerer notre application.
				 * 				Elle compresse nos fichiers html et met en cache nos templates dans templateCache
				 * 				Nos templates pourront etre charger automatiquement
				 */
				ngtemplates : {
					dist : {
						options : {
							module : 'plateauAppApp',
							htmlmin : '<%= htmlmin.dist.options %>',
							usemin : 'scripts/scripts.js'
						},
						cwd : '<%= yeoman.app %>',
						src : '**/{,*/}*.html',
						dest : '.tmp/templateCache.js'
					}
				},

				ngAnnotate : {
					dist : {
						files : [ {
							expand : true,
							cwd : '.tmp/concat/scripts',
							src : '*.js',
							dest : '.tmp/concat/scripts'
						} ]
					}
				},

				// Replace Google CDN references
				cdnify : {
					dist : {
						html : [ '<%= yeoman.dist %>/*.html' ]
					}
				},

				/**
				 * @ngdoc function
				 * @name copy
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction copie les images , fichiers html , fichiers css et le contenu de font de bootstrap.
				 * 				La copie se fait du repertoire app vers le repertoire dist.
				 */
				copy : {
					dist : {
						files : [
								{
									expand : true,
									dot : true,
									cwd : '<%= yeoman.app %>',
									dest : '<%= yeoman.dist %>',
									src : [ '{,*/}/*.{ico,png,txt}', '*.html',
											'common/habillage/{,*/}*.{png,jpg}'

									]
								}, {
									expand : true,
									cwd : '.tmp/images',
									dest : '<%= yeoman.dist %>/images',
									src : [ 'generated/*' ]
								}, {
									expand : true,
									cwd : 'bower_components/bootstrap/dist',
									src : 'fonts/*',
									dest : '<%= yeoman.dist %>'
								} ]
					},
					styles : {
						expand : true,
						cwd : '<%= yeoman.app %>/common/habillage',
						dest : '.tmp/styles/',
						src : '{,*/}*.css'
					}
				},
				exec: {
					lancement_json_server: {
						cmd: 'json-server --watch app/data/trombinoscope.json --port 3001',
						stderr: false
					}
				},

				/**
				 * @ngdoc function
				 * @name concurrent
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de lancer plusieurs taches a la fois
				 * 		        dist: lancer a la fois les taches mises entre crochets.
				 */
				concurrent : {
					testGruntExec : ['exec:lancement_json_server','watch'],
					server : [ 'copy:styles' ],
					test : [ 'copy:styles' ],
					dist : [ 'copy:styles', 'imagemin', 'svgmin' ]
				},

				/**
				 * @ngdoc function
				 * @name karma
				 * @module Grunt
				 * 
				 * 
				 * @description Cette fonction permet de lancer les tests unitaire en se basant sur le fichier de config de karma(karma.conf.js)
				 */
				karma : {
					unit : {
						configFile : 'test/karma.conf.js',
						singleRun : true
					}
				},
				 /**
			       *   @ngdoc function
			       *   @name ngdoc
			       *   @module Grunt
			       *
			       *   @description
			       *    Cette fonction permet de générer la documentation sous forme de site web à partir des annotations @ngdocs.
			       *      GD : documentation en rapport avec notre fichier gruntfile
			       */
				ngdocs : {
					options : {
						dest : 'docs',
						html5Mode : false,
						startPage : '/',
						title : 'PlateauApp Documentation'
					},
					api: {
						src : [ 'Gruntfile.js' ],
						title : 'Gruntfile documenation'
					},
					all: {
						src : [ 'app/**/*.js' ],
						title : 'Gruntfile documenation'
					}
				}
			});

	grunt.registerTask('serve', 'Compile then start a connect web server',
			function(target) {
				if (target === 'dist') {
					return grunt.task
							.run([ 'build', 'connect:dist:keepalive' ]);
				}

				grunt.task.run([ 'clean:server', 'wiredep',
						'concurrent:server', 'postcss:server',
						'connect:livereload', 'concurrent:testGruntExec' ]);
			});
//Tache de developpement
	grunt.registerTask(
					'server',
					'DEPRECATED TASK. Use the "serve" task instead',
					function(target) {
						grunt.log
								.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
						grunt.task.run([ 'serve:' + target ]);
					});
//Tache de test
	grunt.registerTask('test', [ 'clean:server', 'wiredep', 'concurrent:test',
			'postcss', 'connect:test', 'karma' ]);

	grunt.registerTask('build', [ 'clean:dist', 'wiredep', 'useminPrepare',
			'concurrent:dist', 'postcss', 'ngtemplates', 'concat',
			'ngAnnotate', 'copy:dist', 'cdnify', 'cssmin', 'uglify', 'filerev',
			'htmlmin' ]);
	// tâche de génération de la doc:
	grunt.registerTask('doc', [ 'ngdocs' ]);
	// tache executer par defaut
	grunt.registerTask('default', [ 'newer:jshint', 'newer:jscs', 'test',
			'build' ]);
};
