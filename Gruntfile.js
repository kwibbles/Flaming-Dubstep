module.exports = function (grunt) {

  grunt.initConfig({
    assemble: {
      options: {
        partials: 'src/partials/**/*.hbs',
        plugins: 'assemble-contrib-permalinks'
      },
      pages: {
        options: {
          layout: 'src/layout.hbs',
          permalinks: {
            preset: 'pretty'
          }
        },
        files: [{
          cwd: 'src/pages',
          dest: 'build',
          expand: true,
          src: ['**/*.hbs']
        }]
      }
    },
    connect: {
      build: {
        options: {
          port: 2015,
          base: 'build'
        }
      }
    },
    watch: {
      assemble: {
        files: ['src/partials/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },
    copy: {
      build: {
        files: [
        { src: 'node_modules/normalize.css/normalize.css',
          dest: 'build/vendor/normalize.css'
        },
        {
          src: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
          dest: 'build/vendor/bootstrap.min.css'
        }]
      }
    },
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['assemble', 'copy']);

  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.registerTask('connect', ['build', 'connect', 'watch', 'gh-pages']);

  grunt.registerTask('default', ['build']);

};