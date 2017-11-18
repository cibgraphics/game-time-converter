module.exports = function(grunt) {
  
  // Make sure when installing plugins to use 'npm install <module> --save-dev' to have it add automatically to package.json
  // When installing from a already setup project, use 'npm install' to install dependencies 

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['assets/css/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false
        }
      },
      markup: {
        files: 'index.html',
        tasks: [],
        options: {
          spawn: false
        }
      }
    },

    // JS Linting
    jshint: {
      all: ['assets/js/app.js'],
      options: {
        curly: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
    },


    // SCSS
    sass: {
      dist: {
        options: {
          style: 'nested',
        },
        files: {
          'assets/css/style.css': 'assets/css/scss/style.scss',
          'assets/css/print.css': 'assets/css/scss/print.scss',
        }
      }
    },


    // AutoPrefixer

    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'ie 8', 'ie 9', 'ie 10']
      },
      dist: { // Target
        files: {
          'assets/css/style.css': 'assets/css/style.css',
          'assets/css/print.css': 'assets/css/print.css',
        }
      }
    },


    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true,
          hostname: '0.0.0.0'
        }
      }
    },
    
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sass');

  grunt.loadNpmTasks('grunt-contrib-connect');
  

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);

};