# Introduction

This is an Yeoman-scaffolded Angular app with a Flask backend

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

```grunt serve:dist```

All the files needed for deployment can now be found in the dist directory.

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
