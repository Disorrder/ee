# ee
Simple EventEmitter js

## Installation
`npm i --save @disorrder/ee`

## Basic usage
```javascript
import EventEmitter from "@disorrder/ee";

class Clickable extends EventEmitter {
    counter = 0;

    onClick(e) {
        this.counter++;
        this.emit("click", e);
    }
}

let btn = new Clickable();
btn.on("click", () => {
    console.log("Counter:", btn.counter);
});
```