# Sincerely
An AI-powered passive-aggressive message converter

### Inspiration
In any social setting, there exists bounds to the acceptable forms of communication between individuals. There are things people can't say, even if they feel it's warranted. Whether it be through an email to a coworker, a request from a boss, asking for an owed favor from a friend, or even a text to a family member, the social limits to what we can say strongly impact the choice of our words. However, there is one universal exception to this constraint: passive-aggressiveness. Passive-aggressiveness is a vehicle to convey our true emotions to another person. Through simultaneously boasting the punch of an insult, and the elegance of a complement, passive-aggressiveness is the perfect solution for offering both internal satisfaction and demonstrating external power, while cleverly dancing on the lines of the social constructs of cordiality.

We have created a convenient Google Chrome extension, which allows for one to alter the passive-aggressiveness of any text they enter into the popup, and insert it into whatever message they want to share. Powered by OpenAI's Chat GPT, the possibilities for creative means to express oneself are endless. 

Gone are the days of saying things without truly being heard.

It's time to be sincere...

### Features
Sincerely is a web extension for Chrome, powered by Chat GPT by OpenAI, that takes text inputted by users and assesses its existing passive-aggressiveness, displaying it on a scale from 1 to 7 (1 being neutral, and 7 being extremely passive-aggressive). It allows users to adjust the level of the passive-aggressiveness of the text through the use of a slider conveniently placed in the extension. After users enter their text in the text box, they can click "Generate", and Sincerely will adjust the passive-aggressiveness according to the slider value. The generated text can be easily copy and pasted into any document.

### How we built it
Frontend: HTML, CSS, JS
Backend: Node.js, Express.js, OpenAI API

### Challenges we ran into

The primary issue we ran into was organizing the project on github between a team of four programmers who were new to the process of using a shared repository. A lot of the issues came from communicating pulls and pushes, and managing different branches.

Additionally, a significant issue arose from one of the functionalities we wanted to implement. We planned to allow users to be able to highlight text on a document, with which Sincerely would automatically plug into the passive-aggressiveness slider. However, we reached a significant roadblock when the extension would not recognize the text selected. We eventually were able to resolve this issue, but implementing it smoothly within the program wasn't possible due to time constraints.

### Accomplishments we're proud of

Taking into account that all team members had little to no experience developing software like this, being able to create each of the components resulted in small victories that we celebrated with equal fervor.

### What we learned

We each learned a significant amount regarding frontend and backend development, especially regarding the use of APIs and the integration of AI. We ran into many errors, and spent a majority of the time debugging. This taught us the process of good testing and breaking down code into understandable pieces that we could use to find the root of the problem.

Another important area we learned was compromise and teamwork, even when everyone had different visions for the product. Communicating and understanding eachothers views helped us create a final product that we all are proud of.

### What's next for Sincerely

We plan to deploy Sincerely on the chrome web store such that it can become publicly available for all to use!

