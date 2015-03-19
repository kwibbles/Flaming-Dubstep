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
    copy: {
      build: {
        files: [{
          src: 'node_modules/normalize.css/normalize.css',
          dest: 'build/vendor/normalize.css'
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['assemble', 'copy']);

  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.registerTask('default', ['build']);

};