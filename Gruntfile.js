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
    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('deploy', ['assemble', 'gh-pages']);

  grunt.registerTask('default', ['assemble']);

};