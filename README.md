http://stackoverflow.com/questions/17643381/how-to-upload-my-angularjs-static-site-to-github-pages/17713723#17713723

The recommended way of deploying the dist directory is using git subtree.

Remove the dist directory from the .gitignore file.

Add the dist directory to your repository and commit it with your project.

git add dist && git commit -m "Initial dist subtree commit"

Once the dist directory is part of your project we can use git subtree to set up a separate repository on a different branch. Note: prefix must be the relative path to your dist directory. This is assuming dist is in your root directory.

git subtree push --prefix dist origin gh-pages

Now you can commit to your entire repository in your default (master) branch and whenever you want to deploy the dist directory you can run:

git subtree push --prefix dist origin gh-pages
