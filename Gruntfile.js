module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            start: ['tmp'],
            dist: ['dist'],
            end: ['tmp']
        },

        jshint: {
            options: {
                jshintrc: 'tests/.jshintrc'
            },
            dist: {
                src: ['_source/Indexed-localStorageDB.js']
            }
        },

        qunit: {
            options: {
                inject: 'tests/libs/phantom.js'
            },
            files: ['tests/*.html']
        },

        concat: {
            options: {
                stripBanners: false
            },
            dist: {
                src: ['_source/Indexed-localStorageDB.js'],
                dest: 'tmp/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: 'tmp/<%= pkg.name %>.min.js'
            }
        },

        copy: {
            dist: {
                expand: true,
                cwd: 'tmp',
                src: ['**'],
                dest: 'dist'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // TODO:
    grunt.registerTask('test', ['jshint:dist', 'qunit']);

    // Distribution task.
    grunt.registerTask('dist', ['clean:start', 'concat:dist', 'uglify:dist', 'clean:dist', 'copy:dist', 'clean:end']);

    // Default task.
    grunt.registerTask('default', ['test', 'dist']);
};

