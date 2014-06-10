module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/ipsum.min.js': ['src/ipsum.js']
                }
            }
        }
    });
    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default task(s).
    grunt.registerTask('default', ['uglify']);
};