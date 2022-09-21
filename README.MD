# Google Doc to WordPress Formatter

## What the problem is

If you copy rich text from Google docs into the WordPress visual editor it does not copy cleanly. Lots unnecessary html tags get added that can break the styling of the page.

Some WP editors has a built in "clear formatting" function. This helps, but also comes with it's own set of drawbacks. It clears all bolded, italicized, and underlined text. As well as adds inappropriate arias attributes to list item tags.

## What this solves

This web app formats rich text from Google Docs into html that can be pasted cleanly into WordPress text-mode editor.

It also formats hyperlinks so that all external going links open in new, whereas internal site links do not.

## Upcoming features...

- pre-format tables
- option to auto insert ToC shortcode
- auto remove and html comments (?)
- remove double carriage returns (?)

## Deployment

A live version of this repo is available on [Netlify](https://jocular-peony-b076c1.netlify.app/)

## Getting started

From your command line, first clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/odeliy/gdoc2wp

# Go into the repository
$ cd autofill-jumplinks

# Remove current origin repository
$ git remote remove origin
```

Then you can install the dependencies using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm start
```