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
        files: ['app/assets/js/**/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['app/assets/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false
        }
      },
      pugpages:{
        files: ['app/views/pages/**/*.pug'],
        tasks: ['newer:pug'],
        options: {
            spawn: false
        }
      },
      puglayout:{
        files: ['app/views/layouts/**/*.pug', 'app/views/partials/**/*.pug'],
        tasks: ['pug'],
        options: {
            spawn: false
        }
      },
      fonts:{
        files: ['app/assets/fonts/**'],
        tasks: ['copy:fonts'],
        options: {
            spawn: false
        }
      },
      images:{
        files: ['app/assets/images/**'],
        tasks: ['copy:images', 'imagemin'],
        options: {
            spawn: false
        }
      },
      svg: {
        files: ['app/assets/images/svg-icons/*.svg'],
        tasks: ['svgstore'],
      },
    },


    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true,
          base: 'build',
          hostname: '0.0.0.0'
        }
      }
    },


    // JS Linting
    jshint: {
      all: ['app/assets/js/app.js'],
      options: {
        curly: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
    },



    // JS Concat

    concat: {
      dist: {
        files: {
          'build/assets/js/app.js': ['app/assets/js/dep/jquery.js', 'app/assets/js/lib/*.js', 'app/assets/js/app.js'],
        },
      },
    },



    // Image Minification
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'build/assets/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'build/assets/images/'
        }]
      }
    },

    // SCSS
    sass: {
      dist: {
        options: {
          style: 'nested',
          includePaths: require('node-neat').includePaths
        },
        files: {
          'build/assets/css/style.css': 'app/assets/scss/style.scss',
          'build/assets/css/print.css': 'app/assets/scss/print.scss',
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
          'build/assets/css/style.css': 'build/assets/css/style.css',
          'build/assets/css/print.css': 'build/assets/css/print.css',
        }
      }
    },


    pug: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'app/views/pages/',
          src: ['**/*.pug'],
          dest: "build/",
          ext: '.html'
        }],
      }
    },

    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd:'app/assets/images/',
            src: ['**'],
            dest: 'build/assets/images/'
          },
        ],
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd:'app/assets/fonts/',
            src: ['**'],
            dest: 'build/assets/fonts/'
          },
        ],
      },
      js: {
        files: [
          {
            expand: true,
            cwd:'app/assets/js/',
            src: ['**'],
            dest: 'build/assets/js/'
          },
        ],
      },
    },

    //SVG Store

    svgstore: {
      options: {
        prefix : 'icon-',
        svg: {
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
          style: "display: none;"
        },
        cleanup: ['fill', 'style', "class"],
      },
      default: {
        files: {
          'build/assets/images/svg-sprite.svg' : ['app/assets/images/svg-icons/*.svg']
        }
      },
    },
    
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);

};