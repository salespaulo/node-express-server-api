'use strict'

var path = require('path')

module.exports = function (grunt) {
  var paths = {
    app: path.join(path.resolve(), '/src/app'),
    test: path.join(path.resolve(), '/target/test/*.js'),
    target: path.join(path.resolve(), '/target'),
    config: path.join(path.resolve(), '/config')
  }

  var notify = {
    compile: {
      options: {
        title  : 'node-server-api: Compile',
        message: 'Finished!'
      }
    },
    test: {
      options: {
        title  : 'node-server-api: Test',
        message: 'Finished!'
      }
    },
    zip: {
      options: {
        title  : 'node-server-api: ZIP target',
        message: 'Ziped OK!'
      }
    },
    publish: {
      options: {
        title  : 'node-server-api: Publish',
        message: 'Published OK!'
      }
    },
    success: {
      options: {
        title  : 'node-server-api: Success',
        message: '## Already! ##'
      }
    }
  }

  var shell = {
    exec: {
      command: 'node target/app'
    },
    publish: {
      command: 'cd target && npm publish && cd -'
    }
  }

  var clean = {
    src: ['<%= paths.target %>', path.resolve() + '/*.log', path.resolve() + '/*.txt', path.resolve() + '/*.zip']
  }

  var copy = {
    js: {
      expand: true,
      cwd: path.join('<%= paths.app %>', '/'),
      src: '**/*.js',
      dest: path.join('<%= paths.target %>', '/')
    },
    npm: {
      expand: true,
      cwd: path.resolve(),
      src: 'package.json',
      dest: path.join('<%= paths.target %>', '/')
    },
    json: {
      expand: true,
      cwd: path.join('<%= paths.config %>', '/'),
      src: '**/*.json',
      dest: path.join('<%= paths.target %>', '/config', '/')
    },
    favicon: {
      expand: true,
      cwd: path.join('<%= paths.app %>', '/'),
      src: '**/favicon.ico',
      dest: path.join('<%= paths.target %>', '/static')
    }
  }

  var mocha = {
    test: {
      options: {
        reporter: 'spec',
        captureFile: 'results.txt',
        quiet: false,
        clearRequireCache: false,
        noFail: false
      },
      src: ['<%= paths.test %>']
    }
  }

  var watch = {
    js: {
      files: [ '<%= paths.app %>/**/*.js' ],
      tasks: ['copy', 'mochaTest', 'notify:compile']
    }
  }

  var nodemon = {
    default: {
      script: '<%= paths.target %>/index.js',
      options: {
        cwd: path.resolve(),
        watch: ['<%= paths.target %>'],
        ignore: ['node_modules']
      }
    }
  }

  var concurrent = {
    default: {
      tasks: ['watch', 'nodemon']
    },
    options: {
      logConcurrentOutput: true
    }
  }

  var compress = {
    main: {
      options: {
        archive: path.basename(path.resolve()) + '.zip'
      },
      files: [
        { expand: true, cwd: '<%= paths.target %>', src: ['**'] },
      ]
    }
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      dev : {
        NODE_ENV : 'development',
      },
      test : {
        NODE_ENV : 'test',
      },
      local : {
        NODE_ENV : 'localhost-development',
      },
      production : {
        NODE_ENV : 'production',
      }
    },
    notify: notify,
    compress: compress,
    shell: shell,
    paths: paths,
    copy: copy,
    mochaTest: mocha,
    clean: clean,
    watch: watch,
    nodemon: nodemon,
    concurrent: concurrent
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('compile', ['clean', 'copy', 'notify:compile'])
  grunt.registerTask('test',    ['compile', 'mochaTest', 'notify:test'])

  grunt.registerTask('dev',     ['env:dev', 'test', 'notify:success', 'concurrent'])
  grunt.registerTask('prod',    ['env:production', 'compile', 'notify:success', 'concurrent'])

  grunt.registerTask('default', ['env:dev', 'test', 'notify:success', 'shell:exec'])

  grunt.registerTask('zip',   ['compile', 'compress', 'notify:zip'])
  grunt.registerTask('deploy',   ['zip', 'shell:publish', 'notify:publish'])
}
