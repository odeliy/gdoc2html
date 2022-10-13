# Google Doc to WordPress Formatter

## What the problem is

If you copy rich text from Google docs into the WordPress visual editor it does not copy cleanly. Lots of unnecessary HTML tags get added that can break the styling of the post.

Some WP editors has a built in "clear formatting" function. This helps, but also comes with its own set of drawbacks. It clears all bolded, italicized, and underlined text. As well as adds inappropriate `aria` attributes to list item tags.

## What this solves

This web app formats rich text from Google Docs into clean HTML that can be pasted directly into WordPress text-mode editor.

It also formats hyperlinks so that all external going links open in a new tab, whereas internal links do not.

## Deployment

A live version of this repo is available on [Netlify](https://gdoc2wp.netlify.app/)

## Getting started

From your command line, first clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/odeliy/gdoc2wp

# Go into the repository
$ cd gdoc2wp

# Remove current origin repository
$ git remote remove origin
```

Then you can install the dependencies using NPM:

```bash
# Install dependencies
$ npm install
```

A `.prettierrc.json` config file is included for consistent styling. If using VS Code, install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and then right click > format document. Or for a better approch create a folder `.vscode` and a file inside `settings.json`. Include the following in the file:

```bash
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
}
```
