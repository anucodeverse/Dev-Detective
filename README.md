# Dev-Detective
A simple and interactive web application that allows users to search for any GitHub profile and view their details. It also includes a Battle Mode to compare two GitHub users based on their repository stars.

# Features
🔎 Single User Search
Search any GitHub username
Display:
Profile image
Name
Bio
Join date
Followers & Following
Profile link
Show top 5 latest repositories
Each repository is clickable

# Battle Mode
Compare two GitHub users
Calculates total stars from all repositories
Shows:
Winner 🏆 (highlighted in green)
Loser (highlighted in red)
If both have equal stars → shows Tie 🤝
Profiles are clickable

# Loading & Error Handling
Shows Loading... while fetching data
Displays User Not Found message if invalid username
Prevents app crash

# Clear Functionality
Clears all inputs
Resets UI to default mode
Hides profile card

# UI Design
Clean and modern UI
Responsive layout
Smooth hover effects
Glassmorphism style cards

#Technologies Used
HTML
CSS
JavaScript (ES6)
GitHub REST API
*API Used
GitHub Users API
https://api.github.com/users/{username}

#Project Structure
Dev-Detective/
│
├── index.html
├── style.css
├── script.js
└── README.md

# How to Run the Project
Download or clone the repository
Open index.html in your browser
Enter a GitHub username
Click Search

#How to Use Battle Mode
Click on Battle Mode
Enter two GitHub usernames
Click Battle
View the winner based on total stars

# Learning Outcomes
Working with APIs using fetch()
Using async/await
Handling JSON data
Error handling in JavaScript
DOM manipulation
Working with multiple API calls
Building interactive UI

📸 Screenshots

(Add your project screenshots here)

# Future Improvements
Add dark/light theme toggle
Add loading spinner animation
Show more detailed repository stats
Improve mobile responsiveness

Author
Ananthalakshmi

⭐ Acknowledgement

This project is built as part of a learning task to understand APIs, asynchronous JavaScript, and real-world application development.
