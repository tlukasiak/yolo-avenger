# Introduction

This repo is a experiment in creating a Yeoman-scaffolded Angular app with a Flask backend.

The resulting page can be found here: http://tlukasiak.github.io/yolo-avenger


# Installation

Install some prerequisites:

* git

```sudo apt-get install git-core``` (on Ubuntu)

* compass

```apt-get install ruby-compass``` (on Ubuntu)

* node (Installed from http://nodejs.org/).  Node comes with the npm package manager.

Install bower:

```npm install -g bower```

Clone the repo.

Install node modules:

```npm install```
    
Install bower modules:

```bower install```

# Development on a Local Machine

This grunt task will build the app and start a local server on port 9000

```grunt serve```

It also watches the files for changes, allowing livereload (http://livereload.com/) to be used in the browser, eliminating the need for manually rebuilding and refreshing the browser when changes are made to the code.

# Deployment

Building for deployment is a slightly longer process as it performs some mininification and optimization

```grunt build```

All the files needed for deployment can now be found in the dist directory.

To preview the production app locally, run the following:

```grunt serve:dist```

The frontend does not have to be served from the same place as the backend. GitHub Pages is a good place to start.

## GitHub Pages

The process of deploying the Angular app to GitHub Pages can be found here: http://stackoverflow.com/questions/17643381/how-to-upload-my-angularjs-static-site-to-github-pages/17713723#17713723

Here is the summary:
The recommended way of deploying the dist directory is using git subtree.

Remove the dist directory from the .gitignore file.

Add the dist directory to your repository and commit it with your project.

```git add dist && git commit -m "Initial dist subtree commit"```

Once the dist directory is part of you project we can use git subtree to set up a separate repository on a different branch. Note: prefix must be the relative path to your dist directory. This is assuming dist is in your root directory.

```git subtree push --prefix dist origin gh-pages```

Now you can commit to your entire repository in your default (master) branch and whenever you want to deploy the dist directory you can run:

```git subtree push --prefix dist origin gh-pages```


# Architecture

## Angular
Angular Google Maps directive: http://angular-google-maps.org/

## Flask
Flask and Websockets: http://blog.miguelgrinberg.com/post/easy-websockets-with-flask-and-gevent


# Random Developer Notes

* CORS (flask-restful): `http://stackoverflow.com/questions/20147299/typeerror-on-cors-for-flask-restful`


```from flask.ext.restful.utils import cors
...
api = Api(app)
api.decorators=[cors.crossdomain(origin='*')]```

* CORS (normal routes): ```http://flask-cors.readthedocs.org/en/latest/```

* grunt-connect-proxy. For developing Angular apps with a Flask backend
```http://www.hierax.org/2014/01/grunt-proxy-setup-for-yeoman.html```

* Problem: Error: [$resource:badcfg] Error in resource configuration. Expected response to contain an array but got an object
Solution: http://stackoverflow.com/questions/20321351/error-resourcebadcfg-error-in-resource-configuration-expected-response-to


* dist version had a vendor.css load error.  The solution was to install a newer version of grunt-usemin

```npm install grunt-usemin --save```

More information can be found here: https://github.com/yeoman/generator-webapp/issues/242

* Yeoman build without glyphicons
http://stackoverflow.com/questions/18572941/why-does-yeoman-build-without-glyphicons

Made a change to the first line of main.scss

```$icon-font-path: "/fonts/";```

Also added this to ```copy:dist``` in Gruntfile.js:

```, {                                                   
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap',
          dest: '<%= yeoman.dist %>/fonts',
          src: '*.*'
      }
      ```
      
* Error: Loading "cdnify.js" tasks...ERROR
   

Solution: 

```npm install grunt-google-cdn  --save-dev```

* Error: When running ```grunt test```, there is an erro: ```Warning: No provider for "framework:jasmine"! (Resolving: framework:jasmine) Use --force to continue.```

Solution: ```npm install karma-jasmine --save-dev```


* Error: ```Running "karma:unit" (karma) task
INFO [karma]: Karma v0.12.14 server started at http://localhost:8080/
WARN [launcher]: Can not load "Chrome", it is not registered!
  Perhaps you are missing some plugin?
WARN [watcher]: Pattern "/home/tlukasiak/Desktop/yeoman-todo/test/mock/**/*.js" does not match any file.
```

Solution: ```npm install karma-chrome-launcher --save-dev```


