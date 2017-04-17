module.exports = function(grunt){
	var gc = {
		imageNotyfy: __dirname+'\\notify.png',
		minifyHtml: false,
		minifyCss: true
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		less: {
			css: {
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					]
				},
				options : {
					compress: gc.minifyCss,
					ieCompat: false
				}
			}
		},
		autoprefixer:{
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox 16.0', 'Opera 12.1', "Chrome 26.0"],
				cascade: false
			},
			css: {
				expand: true,
				flatten: true,
				src: [
					'test/css/main.css'
				],
				dest: 'assets/css/'
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true
			},
			main: {
				files: {
					'assets/js/main.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/jquery.highlight/jquery.highlight.js',
						'bower_components/hypher/dist/jquery.hypher.js',
						'bower_components/hypher/dist/en-us.js',
						'bower_components/hypher/dist/ru-ru.js',
						'src/js/main.js'
					]
				}
			}
		},
		imagemin: {
			base: {
				options: {
					optimizationLevel: 5,
					//progressive: true,
					//interlaced: true,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{png,jpg,gif,svg}'
						],
						dest: 'assets/images/',
						filter: 'isFile'
					}
				]
			},
			css: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/css/*.{png,jpg,gif,svg}'
						],
						dest: 'src/images/bin/',
						filter: 'isFile'
					}
				]
			}
		},
		copy: {
			main: {
				expand: true,
				cwd: 'src/fonts',
				src: '**',
				dest: 'assets/fonts/',
			}
		},
		jade: {
			index: {
				options: {
					pretty: !gc.minifyHtml,
					data: {
						debug: false
					}
				},
				files: {
					"index.html": [
						"src/html/index.jade"
					]
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: [
					'src/html/**/*.jade',
					'src/html/**/*.html',
					'src/html/**/*.txt',
				],
				tasks: ["jade","notify:done"]
			},
			js: {
				files: [
					'src/js/**/*.js'
				],
				tasks: ['notify:watch', 'uglify','notify:done']
			},
			css: {
				files: [
					'src/less/**/*.{css,less}',
				],
				tasks: ['notify:watch', 'less', 'autoprefixer','notify:done']
			},
			images: {
				files: [
					'src/images/*.{png,jpg,gif,svg}',
					'src/images/css/*.{png,jpg,gif,svg}'
				],
				tasks: ['notify:watch', 'newer:imagemin', 'less', 'autoprefixer','notify:done']
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: '<%= globalConfig.imageNotyfy %>'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: '<%= globalConfig.imageNotyfy %>'
				}
			}
		}
	});
	grunt.registerTask('default', 	['notify:watch', 'imagemin', 'less', 'autoprefixer', 'copy', 'uglify', 'jade', 'notify:done']);
	grunt.registerTask('dev', 		['watch']);
}