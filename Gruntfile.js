module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' Kailash Nadh (http://kailashnadh.name)\n' +
            ' Del Bianco Luca <vshjxyz@gmail.com>\n\n' +
            ' <%= pkg.name %> <%= pkg.version %>\n' +
            ' <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' <%= pkg.description %>\n\n' +
            ' License: MIT License\n' +
            '*/\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      main: {
        src: [
          'js/Indexed-localStorageDB.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      main: {
        src: ['<%= concat.main.dest %>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // TODO:
  grunt.registerTask('test', []);

  // Distribution task.
  grunt.registerTask('dist', ['clean', 'concat', 'uglify']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);
};

