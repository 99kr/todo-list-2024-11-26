# Todo List

In this exercise I want you to create a todo list with Vanilla JavaScript. The todo list is will be simple, not any fancy functionalities or animations _(unless you relly want to get creative)_. The purpose is to solve as much as possible with DOM manipulation. The initial files have been created for you so you can just start coding!

## Instructions

### Basics

- All todos should be visible in some sort of list on the start page.

- There should be som sort of form where you can add new todos.

- You should should be able to be mark a todo as completed

- You should be able to remove a todo

- You should be able to move a todo up or down. In other words, change the order of the todos

- There should always be a copy of the current updated todo list in local storage. if you refresh the web page, no todos should disappear. Even if you close your browser and open it again, the todos should be loaded from local storage.

- Styling is important in frontend development, don't neglect that. But a piece of advice, do the styling part or the logic part first, don't do them at the same time. On thing at a time.

### More complexity

- An author and timestamp should be visible on every todo.

- You should be able to edit a todo in place.

- You should be able to sort the todos after timestamp or author. Timestamp should be the default sorting.

## Extra stuff that you can use.

### Google fonts

[Google fonts - Docs & Catalog](https://fonts.google.com/)

Browse the fonts, in order to use one in your application follow these steps:

1. Click on a font you like, [`Roboto`](https://fonts.google.com/specimen/Roboto) for instance.

2. Click the `Get font`-button and then the `Get embeded code`-button.

3. Make sure you're in the `Web`-tab and click on the `@import`-radio button

4. Cope the code inside the style-tags to the top of you css file and add the font-family to your html-tag

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

html {
  font-family: "Roboto", serif;
}
```

This will set the default font-family on all the elements inside the html-tag. If you want a different font-family on certain elements you can just add those in different css-selectors.

### Material Icons

[Material icons - Docs & Catalog](https://fonts.google.com/icons)

Browse the icons, in order to use them in your application follow these steps:

1. Copy this code and add it inside the head-tag on your HTML document.

```js
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
  rel="stylesheet"
/>
```

2. Pick an icon by clicking on it. A side meny should come in from the right.

3. Make sure you are on the `Web`-tab, scroll down to "Inserting the icon".

4. Copy the code and add it in your HTML document or your generated HTML code inside your js-files. Here is an example for a home icon:

```html
<span class="material-symbols-outlined"> home </span>
```

The class is what gives the icon its looks, and it comes from the link-tag you added earlier. The text "home" is the reference to the icon that is being retrieved from material icons.

Remember, that icons can be styled, you can change color and such things. You usually need some flex-styling on the parent element in order to be properly align the icon with the rest of the content inside the parent element.
