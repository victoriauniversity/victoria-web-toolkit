'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    // contains the file specifications, which are the same for dev and prod
    var sassFiles = [{
            expand: true,
            cwd: 'assets/sass',
            // apply this rule to all scss files EXCEPT style.scss
            src: ['**/*.scss', '!style.scss'],
            dest: 'assets/css',
            ext: '.css'
        },
        {
            // we drop the main style.css into a temp folder so it can be run through bless without overwriting
            expand: true,
            cwd: 'assets/sass',
            src: 'style.scss',
            dest: 'assets/css/grunt_css',
            ext: '.css'
        }
    ];
    

    grunt.initConfig({

        // Watch Config
        watch: {
            files: ['views/**/*'],
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'assets/js/**/*.js',
                ],
            },
            css: {
                files: [
                    'assets/css/**/*.css',
                ],
            },
            sass: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['sass:dev', 'bless:css']
            },
            images: {
                files: [
                    'assets/images/**/*.{png,jpg,jpeg,webp}'
                ],
            },
            express: {
                files:  [ 'app.js', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            },
        },


        // Sass Config
        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache',
                compass: true,
                trace: true,
                unixNewlines: true,
                update: false // update: true causes the sass compilation task to fail for uncertain reasons
            },
            dev: {
                options: {
                    style: 'nested',//nested, compact, compressed, expanded
                    lineComments: true
                },
                files: sassFiles
            }, 
            prod: {
                options: {
                    style:'compressed',//nested, compact, compressed, expanded
                    lineNumbers:false,
                },
                files: sassFiles
            }
        },
        //Bless config
        bless: {
            css: {
                files: {
                    'assets/css/style.css': 'assets/css/grunt_css/style.css'
                }
            },
        },

        // Express Config
        express: {
            options: {
              // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },

        // Open Config - set your favourite browser and text editor here
        open: {
            site: {
                path: 'http://localhost:3000',
            },
            editor: {
                path: '',
                app: ''
            }
        }
    });

    // Register Tasks
    // Work
    grunt.registerTask('dev', 'Start working on this project.', [
        'sass:dev',
        'bless:css',
        'express:dev',
        'open:site',
        // 'open:editor',
        'watch'
    ]);


    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'express:dev',
        'watch'

    ]);
    

    // Build
    grunt.registerTask('prod', 'Build production ready assets and views.',  function() {
        grunt.task.run('sass:prod', 'bless:css');
        grunt.log.writeln('grunt restart - restarts the grunt server - you may need to do this');
    });

    

    grunt.registerTask('default', 'My "default" task description.', function() {
        grunt.log.writeln('grunty: Here is what you can do!' + "\n");
        grunt.log.writeln('grunt dev - this task complies the sass with line numbers and split the style.css into two sheets.');
        grunt.log.writeln('            Also runs the watch task and opens the browser, livereload is active.');
        grunt.log.writeln('grunt prod -  this task complies the sass, splits the style.css into two sheets then minifies the new sheets.');
        grunt.log.writeln('grunt restart - restarts the grunt server');
    });

};
