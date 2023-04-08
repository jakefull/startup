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

## Notes on Web Server and DNS

Mapping of domain names:
- Address (A) records: straight mapping, domain name to IP address
- Canonical Name (CNAME) records: domain name alias, one domain name to another domain name

NOTE: subdomains are the entire domain, not just the first part of the url


IP Address: http://18.189.66.142/

Domain: http://www.typemory.link/
SSH login cmd: ssh -i [key pair file] ubuntu@[ip address]

Use sudo vi Caddyfile -> i to edit
Esc to stop editing -> :wq to save your edits
sudo service caddy restart to begin https service


## Other

- Json formatting: Always has key in quotes {"x":3}
- 

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

FONTS:
- Two ways to import:
```
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```
or:
```
@font-face {
  font-family: 'Something';
  src: url('https://cs260.click/fonts/quicksand.woff2');
}

p {
  font-family: Something;
}
```
- BOX MODEL: "caution: pals before marriage" from inside out, content, padding, border, margin
- CSS defaults to content box for sizing (change to border-box for size to match visual size)
Animations:
```
 @keyframes demo {
 from {
 something: value
 }
 //optional: percentage value definitions
 to {
 something: other value
 }
 ```
 
FLEX
- `flex: 0 80px` means will not grow (0) and starting basis height of 80px
- `flex: 1`f gives a fractional value for growth. (if 3, gets 3 units of space)




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

## Inserting
- You can use `<script src="index.js"><script>` under head or insert functions in a script element on the html document
- You can also write JS code under onClick
- Select HTML elements using:
queryselector('p') - the FIRST p
queryselectorall('p') - an iterator to iterate over ALL p!
- textContent sets child text for element

Use chmod +x deploy.sh in console to make a script executable

## JS Arrow Functions
- Arrow functions with no parenthasees have an automatic return statement built in


## JS Arrays
- sort: runs a function and sorts an array in place
- find: finds first value that satisfies a fxn
- reduce: reduces an array using a function to a single item
- map: maps an array to a new array (a.map(i=>i+i))
- filter: removes all items that dont satisfy fxn (a.filter(i=>i%2))
- every: runs a fxn to see if all items match (a.every(i=>i<3))
- some: every but to see if any items match

Also note that 


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

When evaluating a promise using the .then .catch. finally, the computer is going to "skip past it" and keep executing the code below. When evaluating a promise using async and await (try, catch etc.), the code hits the await and stops until that await promise is resolved.

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
- PERSONAL NOTE: Check form action on collections page? ALSO, see CSS flex grid for collections page!

# `POST MIDTERM`

## URL
Example: https://byu.edu:443/cs/260/student?filter=accepted#summary
- shceme: https
- domain name: byu.edu
- port: 3000 (specifies which port is used to connect to domain server)
- path: /school/byu/user/8014
- parameters: filter=names&highlight=intro,summary
- anchor: summary (sub-location)
URN is a Uniform Resource Name that doesn't specify a specific location.
URI is a Uniform Resource Identifier that could refer to either a URL or a URN.

## Ports
Common port numbers:
- 20: FTP (file transfer protocol)
- 22: SSH for remote devices
- 25: Simple Mail Transfer Protocol (SMTP) for sending email
- 53: DNS for looking up IP addresses
- 80: HTTP for web requests
- 110: Post Office Protocol (POP3) for retrieving email
- 123: Netwrok Time Protocol (NTP) for managing time
- 161: Simple Network Management Protocol (SNMP) for managing routers, printers, etc.
- 194: Internet Relay Chat (IRC) for chatting
- 443: HTTPS

## HTTP
Verbs:
- GET
- POST
- PUT
- DELETE
- OPTIONS

Status Codes:
- 1xx: informational
- 2xx - success
- 3xx - redirect
- 4xx - client errors (invalid request)
- 5xx - server errors

## SOP and CORS
SOP is Same Origin Policy. Only allows JavaScript to make rquests to domain if it is same domain that user is viewing. Default is SOP aka to not allow other origins.
CORS is Cross Origin Resource Sharing. Allows server to respond with what origins are allowed. If *, any origin can make the request

## Node.js

1. Create project directory
2. Initialize it by running `npm init -y`
3. Add `node-modules` to `.gitignore`
4. Install desired packages using `npm install <package name>`
5. Add `require('<package name>')` to JS code
6. Run your code w/ `node main.js`

For a localhost server, install npm package `http` and use:

```ruby
const http = require('http');
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello Node.js!</h1>');
  res.end();
});

server.listen(8080, () => {
  console.log(`Web service listening on port 8080`);
});
```

## Simon Service
- I learned that you can use chmod 600 file_name to change permissions of a file. I needed to do this because my key was public and the deployment script only allowed private keys.
- I also learned that when you clone things from git, it clones them according to whatever operating system you are on (when possible). This is why when I copied over files I had cloned onto my windows over to my linux subsystem, the deployment script would not work.
- Also! npm is installed on your server! So when you deploy, you don't need to deploy npm packages and what not... plus, if you deployed packages from windows to a linux server, that would also cause some issues...
- Lastly, I learned that when you run the code in VS, you can access it in your own browser using localhost:specified_port_#. I was confused since the "Go live" option disappeared once I created my backend, but it makes sense now since the backend specifies which port to use.

## MongoDB
- First off, use `ssh -i "$key" ubuntu@$hostname` to shell into your server (host name in my case would be typemory.link)
- Set the environment variables in WSL by adding them to ~/.bash_profile and then calling source ~/.bash_profile
- On the server, however, set the environment variablese by adding them to /etc/environment

## Authentication/Login
- httpOnly - ensures that credentials are only viewable by http, not js
- secure - ensures credentials only sent over https
- sameSite - only the same domain that sent the credentials can receive them back
- ALWAYS run the following command after deploying to the server!! 
`pm2 restart all --update-env
pm2 save`

## Websocket
- code for constructor: `const wss = new WebSocketServer({ noServer: true });` where WebSocketServer requires `ws`
- use `ws.on(` to specify certain conditions when data is sent, such as  messsage, pong, or close.
- remember to export the module at the end of the code: `module.exports = {class name };`

## Startup service notes
- make sure you always define variables that require certain installed npm packages in each js file
- make sure your node is up to date!
- If you are trying to set a global variable equal to the return value of some promise but aren't able to return it asynchrously, you can declare a global variable and then redefine that variable within a function the promise calls after it resolves!
- If you are waiting for a service to get setup or a promise to resolve, don't have anything in the code that will use that service/is dependent on that promise right after!
 
 ## React DOM
 - whenever you have a function that is returning an html element, pass the attributes of that element in as parameters
 - see sandbox tutorial! That explains a lot of things and is very helpful. Good example


## React Router

Here is an example snippet of code showing the router structure:
```ruby
<nav>
  <NavLink to='/'>Home</Link>
  <NavLink to='/about'>About</Link>
  <NavLink to='/users'>Users</Link>
</nav>

<main>
  <Routes>
    <Route path='/' element={<Home />} exact />
    <Route path='/about' element={<About />} />
    <Route path='/users' element={<Users />} />
    <Route path='*' element={<Navigate to='/' replace />} />
</Routes>
       
```

## Simon React
 - You have to npm install in the source folder AND in the service directory
 - In order to debug frontend/backend simultaneously, you can host a react debug service on port 3001 and then route all requests to port 3000 (create a folder called .env.local and in it write `PORT=3001`
 - Use the following commands to use bootstrap with react:
 `npm install bootstrap react-bootstrap`
 `import 'bootstrap/dist/css/bootstrap.min.css';` in app.jsx
 ## PM2 Troubleshooting
 - PM2 basically runs the programs on your server
 - Whenever you add a service under a new subdomain, you have to edit the caddy file and specify a new port, deploy your subdomain files, AND you have to do `pm2 start index.js` in the directory containing the files. Then finish by doing `pm2 save` and you should be g2g.
