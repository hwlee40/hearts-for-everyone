# Hearts for Everyone!

Hearts for Everyone is a silly project made to share hearts with people on the internet. It also makes for a super cool filter (looking to hopefully implement it as some kind of camera filter in the future)!

[Try out the live version of the project](https://hwlee40.github.io/hearts-for-everyone/)

## Demonstration

<!-- ![](/hearts_demo.gif) -->

## How does it work?

Super simple! I used google's web-based machine learning model [Teachable Machine](https://teachablemachine.withgoogle.com/) and trained it to recognize two classes: idle and hands up. Then I took the model into [p5.js](https://p5js.org/) and replaced every 12th pixel with a heart emoji depending on how bright that pixel is to assign to the "hands up" class. And volià! Hearts for everyone 💖.