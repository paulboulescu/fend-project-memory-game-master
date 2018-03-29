# Memory Game Project

## About

This is the 3rd Project created under Udacity's Front-End Web Developer Nanodegree. The task was to create a _Memory Game_.

## First Run

* Clone the repository
* Open `index.html` with a browser

## Description

The game consists of a container (_deck_) with 16 elements (_cards_). The cards are marked, face down, with eight different symbols. Each symbol is marked on two cards in the _deck_. The user can turn face up two cards at a time. If the symbols marked on the cards match, the cards are locked in face up position. If the symbols don't match, than the cards are turned back face down. The game ends when the user turns face up all the cards.

## Features

* **Moves Counter** - with each pair of cards turned face up for checking, one move is registered in the counter. The user has to complete the game with as few moves as possible.
* **Rating System** - depending on the number of moves performed, a star rating is displayed: 
  * 1-12 moves for 3 stars
  * 13-15 moves for 2.5 stars
  * 16-18 moves for 2 stars
  * 19-20 moves for 1.5 stars
  * 21-22 moves for 1 star
  * 23-24 moves for 0.5 stars
  * over 25 moves for 0 stars
* **Timer** - from the first turned card till the last valid match of the game, the time is measured.
* **Reset Button** - when clicked (or _r_ key pressed), the game will restart, _Timer_ will be reset to _00:00_, and _Moves Counter_ will be reset to _0 Moves_.
* **Congratulations Pop-Up** - when the game is over, a pop-up appears, informing the user about total time, rating, number of moves, and record.
* **Play Again Button** - inside the _Congratulations Pop-Up_, when clicked (or _Enter_ key pressed), the _Congratulations Pop-Up_ will disappear and a new game will start.

## Internal Dependencies

* _index.html_ - stores the HTML
* _css/app.css_ - stores the CSS
* _js/app.js_ - stores the JavaScript code
* _img/geometry2.png_ - background pattern
* _.gitattributes_ - sets the default behavior, in case people don't have `core.autocrlf set. \# https://help.github.com/articles/dealing-with-line-endings/ * text=auto`
* _.gitignore_ - list of files to be ignored by Git
* _.CONTRIBUTING.md_ - guideline for contribuiting to this project
* _.README.md_ - this current document

## External Dependencies

* Font _Awesome_ - loaded at runtime https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css
* Font _Open Sans_ - loaded at runtime https://fonts.googleapis.com/css?family=Open+Sans:400,700

## Known Issues

The game extends out of the viewport on some mobile/tablets when in a landscape orientation. Portrait (vertical) orientation should be used.

## Use Example

The project can be used as it is, for entertainment purposes, or to develop other similar projects, based on its functionalities.

## License

**MIT License**

Copyright (c) 2018 Paul Boulescu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

For details about contributing, please check out [CONTRIBUTING.md](CONTRIBUTING.md).