module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      default: {
        files: {
            'build/<%= pkg.version %>/annotator.meltdown.min.js': [
                'src/meltdown/js/libs/rangyinputs-jquery.min.js',
                'src/meltdown/js/libs/element_resize_detection.js',
                'src/showdown/showdown.min.js',
                'src/showdown/footnotes.js',
                'src/meltdown/js/jquery.meltdown.js',
                'src/scripts/annotator.meltdown.js'
             ]
        }
      }
    },

    cssmin: {
      target: {
        files: {
            'build/<%= pkg.version %>/annotator.meltdown.min.css': [
                'src/meltdown/css/meltdown.css',
                'src/styles/annotator.meltdown.css'
             ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);

};