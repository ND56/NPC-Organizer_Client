# npcHub: Front-end README.

Back-end Repo: https://github.com/ND56/NPC-Organizer_API
Deployed Front-end: https://nd56.github.io/NPC-Organizer_Client/
Deployed Back-end: https://dashboard.heroku.com/apps/npc-organizer/settings

## Background: Dungeons & Dragons ("D&D")

To understand the utility of npcHub (and it's moniker), one must first have a basic understanding of the classic tabletop game commonly known as D&D.

D&D is a role-playing game ("RPG") in which a group of people come together to play characters---i.e., "player characters," or, "PCs"---in a game created by an individual known as the Dungeon Master ("DM").

While DMs often have many tools at their disposal to construct the world in which the PCs will play their game, it is an incredibly onerous task. The DM is responsible for creating civilizations, cultures, monsters, pantheons, and--finally--every person that exists in that world aside from the PCs.

This last category is commonly referred to as "non-player characters," or "NPCs"---and that's where npcHub comes into play! As I expand on below, my app is designed to alleviate some of the burden that DMs face in creating their worlds, allowing for faster game-building and more D&D-playing.

## Overview of npcHub

npcHub is a place for DMs to create, share, and validate other DM's NPCs.

I created a standard one-to-many relationship between users and NPCs to allow for DMs to CRUD NPC resources. This has many uses for DMs; one use is that it allows DMs to store their NPCs somewhere and they can come back to them and reuse them in future D&D adventures (i.e., DMs can keep them organized).

Another big part of why this app is useful is its search functionality and its ability for DMs to not only manage their own NPCs, but to share NPCs with eachother. The current iteration of the app allows DMs to view all public NPCs (the app has an option to set NPCs to private), as well as to search through NPCs based on a number of criteria (including NPC name, class, race, level, challenge rating, and NPC creator).

In this current iteration, the search functionality operates mostly based on exact equivalence between the search parameters and the NPC attribute; however, two exceptions are searches by race and searches by class---which are somewhat more robust. Both of these searches make use of stored arrays of classes, subclasses, races, and subraces and will return all NPCs falling within one of those arrays if the user's search parameter also falls within one of the arrays. In other words, a search for "Elf" will return all variations of Elves (e.g., Drow, Eladrin, etc.) and a search for "Wizard" will return all variations of Wizard (e.g., Illusionist, Necromancer, etc.).

In the final stages of this iteration, I implemented a "like" functionality. The idea dawned on me after I asked some friends to make a few NPCs to get my database started and I subsequently found myself repeatedly checking back to see what they updated. I realized that the hope of a "reward" kept me coming back to my deployed app and it struck me that this was much like social media, which---whether we want to admit it or not---many of us use because of the lottery-like rewards that come in the form of "likes" and "follows."

Realizing that this could draw more users to my app, I decided to implement a many-to-many relationship between users and npcs through a new resource aptly named "likes." In this current iteration, when viewing other DM's NPCs (DMs cannot "like" their own NPCs), DMs can "like" those NPCs (DMs can only "like" an NPC once) and the UI provides a readout of how many times each NPC has been liked. In addition, every user's home page has a display of the two NPCs that have garnered the most likes. In addition to being a tool that can draw more DMs to my app, I think this also serves the dual purpose of allowing DMs to validate eachother's NPCs and to draw the best of the group to the attention of other users---making my app that much more effective in its purpose. After all, better NPCs will yield better D&D gameplay.

## Technologies Used

Front-end: (1) HTML (including Handlebars), (2) CSS, (3) Bootstrap, and (4) JavaScript (including jQuery for DOM manipulation and jQuery/AJAX for API interactions).

Back-end: (1) PostgreSQL and (2) Ruby on Rails.

## Improvements Anticipated in Future Iterations

There were many goals that I didn't get to accomplish in this current iteration. Some future features I hope to implement include the following:

(1) A dynamic UI: I didn't have time to test the UI at different resolutions, so the app is only currently ideal on a standard computer screen. Relatedly, I'd like to improve overall UI design and styling.

(2) I want to create another resource of "folders" (a one-to-many relationship with users) that will allow DMs to store NPCs in specific folders that they can name, e.g., based on which adventures the NPCs are in.

(3) I want to build a tool that will automatically generate NPCs for DMs by relying on an existing third party 5th edition D&D API (http://www.dnd5eapi.co/).

(4) While my app has both front- and back-end validations, the requirement that users provide a username currently relies solely on a front-end validation. I hope to change that  in the future.

(5) I would like to make the search functionality even more robust than it currently is. For example, I'd like the search-by-name feature to not rely solely on equivalence. Also, I'd like to implement the ability to search by multiple NPC attributes at the same time.

(6) I would like DMs to be able to export NPCs to a pdf.

(7) I want to make much more use of the many-to-many relationship I implemented with "likes." I simply ran out of time, but I'd like to at the very least make it so users can see how many "likes" they've garnered and can also specifically see which of their NPCs have received likes.

(8) I want to have the delete NPC button double-check with the user before the resource is deleted.

(9) I want to make it so users can make iterative searches instead of having to return to their profile page before making another search. However, a lot happens behind the scenes when a user returns to their profile page, so I'll need to make sure any "new search" button also handles those tasks.

(10) My code is in dire need of refactoring. I drafted this first iteration in a span of 6 days, and much of it was therefore---by necessity---rushed. Much of my code could and should be refactored to be more efficient.

## Wireframes

(1) Wireframe 1/3: https://imgur.com/bw7vCOI
(2) Wireframe 2/3: https://imgur.com/dLguZvp
(3) Wireframe 3/3: https://imgur.com/onqkUUE

## User Stories (Created during early planning stages)

(1) As a user, I want to be able to register to this app.
(2) As a user, I want to be able to log in to this app.
(3) As a user, I want to be able to change my password.
(4) As a user, I want to be able to log out of this app.
(5) As a user, I want to be able to upload an NPC to the database.
(6) As a user, I want to be able to retrieve NPCs that I've created based on varying search parameters.

## Planned Schedule For First Iteration (Established during early planning stages)

Monday (3/5/18)

  Planning
     Review full-stack-project-practice
     Review full-stack-project-modeling-lab
     Create User Stories
     Create Wire Frames
     Create ERD

Tuesday (3/6/18)

  Set Up: API
     Download Rails API Template
     Create a Github Repository
     Deploy to Heroku

Tuesday (3/6/18)

  Set Up: Client
     Download Browser Template
     Create a Github Repository
     Deploy to Github Pages

Wednesday & Thursday (3/7/18-3/8/18)

  API
     Review rails-api-one-to-many or rails-api-many-to-many
     Scaffold your resource
     Test your resource's end points with curl scripts
     Update resource controller to inherit from Protected or OpenRead controller
     Test your resource's end points with curl scripts
     Add the relationship to a User
     Add User ownership to resource controller

Friday & Saturday (3/9/18-3/10/18)

  Client
     Review api-token-auth
     Sign Up (curl then web app)
     Sign In (curl then web app)
     Change Password (curl then web app)
     Sign Out (curl then web page)
     All API calls have success or failure messages
     Review query-ajax-post
     Create resource (curl then web app)
     Get all of their owned resources (curl then web app)
     Delete single resource (curl then web app)
     Update single resource (curl then web app)

Sunday (3/11/18)

  Bonnus Features & Project Wrap-Up

Monday (3/12/18)

  Bonnus Features & Project Wrap-Up

Tuesday (3/13/18)

  Bonnus Features & Project Wrap-Up
