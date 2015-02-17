//fonction lancee lors de 'grunt' dans la console
module.exports = function(grunt) {

    'use strict';

    var src = 'src/',
        dist = 'dist/',
        js = 'js/',
        style = 'style/',
        temp = 'temp/', 
        all = '**/*', 
        img = 'img/'
        ;

    //importer les taches suivantes
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['build', 'watch']);
	//tableau, on peut en mettre plusieur donc lancees en meme temps
    grunt.registerTask('build', ['clean', 'jshint', 'uglify', 'concat:javascript', 'javascript', 'sass', 'copy']);
    grunt.registerTask('javascript', 'Start js tache', javascriptTask);


   //dans les fichiers suivants
    grunt.initConfig( {
        jshint: {
            all: [
                'Gruntfile.js',
                src + js + '**/*.js',
                '!' + src + js + 'vendor/**/*.js'
            ]
        },
        uglify: {
            main: {
                files: [{
                    src: [
                        src + 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                        src + js + 'app.js',
                        src + js + '**/*.js',
                        '!' + src + js + 'vendor/**/*.js'
                    ],
                    dest: temp + js + 'script.js'
                }]
            },
            options: {
                preserveComments: 'some',
                sourceMap: true 
				//creera le fichier js.map automatiquement
            }
        },
        copy: {
            other: {
                expand: true,
                filter: 'isFile',
                cwd: src,
                src: [
                    all, 
                    '!' + all + '.js',
                    '!' + all + '.scss',
                    '!' + 'bower_components/' + all,
                    '!' + 'bower.json'
                ],
                dest: dist,
            },
            html: {
                expand: true,
                filter: 'isFile',
                cwd: src,
                src: [
                    all + '.html', 
                    '!' + 'bower_components/' + all,
                ],
                dest: dist,
            },
            img: {
                expand: true,
                filter: 'isFile',
                cwd: src + img,
                src: [
                    all + '.jpg', 
                    all + '.png', 
                ],
                dest: dist + img,
            },
            font: {
                expand: true,
                filter: 'isFile',
                cwd: src + 'bower_components/bootstrap/fonts',
                src: [
                    all,
                ],
                dest: dist + 'fonts/bootstrap/',
            }
        },
        sass: {
            dist: {
                files: [{
                    src: [src + style + 'main.scss'],
                    dest: dist + style + 'style.css'
                }],
                options: {
                    style: 'compressed'
                }
            }
        },
        clean: {
            build: {
                src: [dist + all, temp + all]
            }
        },
        concat: {
            javascript: {
                src: [
                    src + 'bower_components/jquery/dist/jquery.min.js',
                    temp + js + 'script.js'
                ],
                dest: dist + js + 'script.js'
            }
        },
        watch: {
            scripts: {
                files: [src + all + '.js'],
                tasks: ['jshint', 'uglify', 'concat', 'javascript']
            },
            sass: {
                files: [src + all + '.scss'],
                tasks: ['sass']
            },
            html: {
                files: [src + all + '.html'],
                tasks: ['copy:html'],
            },
            img: {
                files: [
					src + img + all + '.jpg',
					src + img + all + '.png'					
				],
                tasks: ['copy:img'],
            },
            files: {
                files: [
                    src + all, 
                    '!' + src + all + '.html',
                    '!' + src + all + '.js',
                    '!' + src + all + '.scss',
                    '!' + src + all + '.jpg',
                    '!' + src + all + '.png',
                    '!' + src + 'bower_components/' + all,
                    '!' + src + 'bower.json'
                ],
                tasks: ['copy:html']
            },
            options: {
                spawn: false,
                reload: true
            }
        }
    });

    /*grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });*/

    function javascriptTask() {
        //si il y a une erreur, require stoppe
        grunt.task.requires('jshint');
        grunt.task.requires('uglify');
        grunt.task.requires('concat:javascript');
        grunt.log.writeln('Task done');
    }
};