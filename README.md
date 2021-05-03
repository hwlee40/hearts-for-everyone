# Hearts for Everyone!

Hearts for Everyone is a silly project made to share hearts with people on the internet. It's also a super cool filter (looking to hopefully implement it as some kind of camera filter in the future)!

[Try out the live version of the project](https://hwlee40.github.io/hearts-for-everyone/)

## Demonstration

![](/hearts_demo.gif)

## How does it work?

Super simple! I used google's web-based machine learning model [Teachable Machine](https://teachablemachine.withgoogle.com/) and trained it to recognize two classes: idle and hands up. I took the model into [p5.js](https://p5js.org/) and applied a pixel array to the webcam to assign to the hands up class. And volià! Hearts for everyone 💖.