# startup
GitHub HW Assignment!

This is an edit from VS code!

And this is an edit from GitHub! Wowie zowie!

There we go... all better!

In this assignment I learned that gitlens really helps when resolving merges and also got a taste of why github is so useful... I am very inspired to go look at some open source code out there now, make a fork/copy, and test some things out! The sky is the limit!!!!

 # Elevator Pitch
 ## AnkiType
Do you ever have to memorize "elevator pitches" (like this one) for important business meetings, but find it takes too much time? Or do you have to memorize entire scripts for plays, but find the task seemingly impossible? If so, AnkiType is here to help you do just that - the impossible - in record time. AnkiType is a new tool that assists with passage memorization via a revolutionary, new memorization method called "typemory." Typemory consists of typing out words in a passage, starting with just several words at a time but building up to typing out the entire passage word-for-word, all from memory. Thanks to AnkiType, you can memorize passages in the same amount of time you would have spent worrying about it.


![AnkiTypepic](https://user-images.githubusercontent.com/122409716/214924230-aa613057-602a-4afe-930c-5bb62e81f96a.png)

Key Features
- Beautiful UI
- Interactive application (user can select what percentage to fill in, if timed, etc.)
- Leaderboards for each database allows for personal log of best times in addition to friends' best times
- Challenge mode within leaderboards for real-time 'typemory' racing with friends
- Can save multiple databases of passages to memorize
- Login authenticator to allow for private databases
- And, of course, available on mobile app stores

## Some Lessons Learned

Often times to obtain spacing on the nav bar, you can add a margin to the individual elements on the nav bar and that will give you some spacing.

For bootstrap, use data-bs-toggle="button" when defining the button to make it a toggle button.

Often times, simple but functional and straightforward is better than complicated but buggy and confusing.

I need to study bootstrap spacing and how that meshes with flex... look into that more.

## Notes on Web Server

IP Address: http://18.189.66.142/

Domain: http://www.typemory.link/
SSH login cmd: ssh -i [key pair file] ubuntu@[ip address]

Use sudo vi Caddyfile -> i to edit
Esc to stop editing -> :wq to save your edits
sudo service caddy restart to begin https service

# HTML

Common Elements:
- header
- nav (for navigation, usually contains multiple div or divisions)
- main (can have multiple sections, ul or unordered lists, tables, and an aside)
- inline elements such as `<div> I said <b>NO!</b> My answer is final. </div>` can be used to bring attention to text or mark a sections as something.
- also, img, svg, video, audio


## Simon HTML Assignment

I learned how powerful html is albeit very basic looking. You can display all the information you need to in an organized manner, collect data from the user, and display images/shapes. I also learned that even if you set the language to english, you can still display Japanese text just fine.

The following line of code took me a while to understand, but then I realized it was setting the icon that shows in the tab on your browser! Pretty neat stuff, aye?
    <link rel="icon" href="favicon.ico" />

# CSS

Selectors:
Type the following under <head><style> or <head><link>link to CSS doc or inline style="color:black"
- NOTE: any declaration at a lower level will override higher level
```
body {
  font-family: sans-serif;
}
```
- If it is a class, use: `.class_name` or `p.class_name` to narrow it down to only paragraphs of that class.
- If it is an ID, use: `#ID_name`
- There is also an attribute selector: a[href] where href can = "./pic_name.png" or href* = "https://" for websites, etc.
- And finally, a pseudo secelctor: `section:hover {}`

- colors can be keyword, RGB hex (#0FA2), RGB function (rgb(25%, 220, 128, 0.5)), or HSL (same as RGB but col, grey, light)

- BOX MODEL: "caution: pals before marriage" from inside out, content, padding, border, margin
- CSS defaults to content box for sizing (change to border-box for size to match visual size)



Be sure to position things absolutely or fix them (depending on what you want them to do when the user scrolls) to posiiton things around the display. Additionally, when having animations that involve going off screen and coming on screen, don't forget to edit the width.

Also, use flex to position your page's elements! It is the move. flex: #ratio of the screen (ex. use 1 and 3 for secondary and main section) #fixed px value (for header/footer)

## Bootstrap

REMEMBER THE FOLLOWING:
- always include <meta name="viewport" content="width=device-width, initial-scale=1" /> under head
- always include <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous" /> under head
- always include <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script> just before end of body

Use the following when implementing your program:
- <button... class ="btn btn-success" data-bs-toggle-"button" (for toggling 1st letter show/no show)
- <header class ="sticky-top"
- <footer class ="sticky-bottom"
- include a cover page so it looks clearn
Reference this website for more ideas on what to implement: https://getbootstrap.com/docs/5.2/examples/

## Simon CSS Implementation

I learned the importance of understanding what all of the bootstrap classes do whenever you implement them... because if you don't understand, you will get stuck trying to fix one little formatting thing for a good while! The containers really clicked for me though, and I was able to visualize more easily how all of the containers work togther. I also learned that you could override some undesirable features by using your own stylesheet. I had to do that for a bootstrap login menu that I implemented, as some of the text wasn't centering on it. Once I changed the display of the text's container to flex, however, I could then center its content.

# JavaScript

## JS Obj/Classes

Remember to use the this. whenever accessing the variables/attributes of the obj/class. Also, when defining a func as an attribute of a func or class, remember that you don't need to declare function before doing so.

## JS Promises and Async/Await

Here is some example code:

```ruby
const haveMoney = false;
const amHungry = true;

function liveLife () {
  return new Promise((resolve,reject) => {
    if (haveMoney && amHungry) {
      resolve('arrrrrriba costa vida! yo quiero un taco!')
    } else if (amHungry) {
      resolve('knock it off Napoleon, make yoself a dang quesedilla!')
    } else {
      reject('just keep working on your homework')
    }
  })
}

liveLife().then((message) => {
  console.log(message)
}).catch((error) => {
  console.log(error)
})
```

And for the same code but async/await:

```ruby 
const haveMoney = false;
const amHungry = false;

async function fxnToLiveLife () {
    try {
  const yourLife = await liveLife();
  console.log(yourLife);
} catch (error) {
  console.log(error);
} finally {
  console.log("good work")
}
}

function liveLife () {
  return new Promise((resolve,reject) => {
    if (haveMoney && amHungry) {
      resolve('arrrrrriba costa vida! yo quiero un taco!')
    } else if (amHungry) {
      resolve('knock it off Napoleon, make yoself a dang quesedilla!')
    } else {
      reject('just keep working on your homework')
    }
  })
}

fxnToLiveLife();
```

## Simon JS

- Be sure to include `<script src="js file name.js"></script>` in your head html section.
- NOTE: Sometimes you need to include this at the end of the body in case your code references HTML elements during initialization!
- Also add  `onclick = "fxn()"` to buttons and forms so that your js is called.
- Additionally, you can define multiple classes for a button element and create a class specifically for the javascript to discover the button.


## Startup JS

- the /g at the end of RegExp means to select every item, not just the first one that matches!
- You can use the JS document to define needed variables and access them in the classes.
- Use classes and initialize an object of the class to get the JS started on each page.
- Use localStorage.setItem(item name, item value) to create local data and localStorage.getItem(item name) to access that data
- PERSONAL NOTE: Check form action on collections page?
