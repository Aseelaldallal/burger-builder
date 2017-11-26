

# CREATING APP

1. Run create-react-app burger-builder
2. Create Git repository, link it to project
3. Enable css modules so css files can be scoped to specific component in application
    * Run: npm run eject
    * Edit config-> webpack.config.dev.js
    * Edit config-> webpack.config.prod.js
4. Remove logo.svg and its imports
5. Remove App.css
6. Adjust index.html: Modify Title
7. Create Components and Containers subfolders in source folder
8. Implement Components. 
    * Navigation Related Components
    * The meat of our application
9. Create hoc folder in source (maybe add aux.js if you want)

# OUR SPECIFIC APP

1. Create Layout Folder under Components since for now, we don't need to manage state

# PROP TYPE VALIDATION

npm install --save prop-types

# ENABLING CSS MODULES EDIT

In webpack.config.dev.js and webpack.config.prod.js, make sure you have this:

test: /\.css$/,
use: [
    require.resolve('style-loader'),
    {
    loader: require.resolve('css-loader'),
    options: {
        ...//whatever was therebefore
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
    },
    }

The modules and localIdentName are the ones being modified.