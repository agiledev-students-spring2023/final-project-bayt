# Team norms
## General team guidelines
- Join the Discord VC while working to boost productivity and speed up team interactions and communications.
- When you're stuck, **reach out** to the Scrum Master or team member. There's no harm in not knowing certain things.
- If you have exams/busy schedules coming up, you could take up more tasks in order to do less work in the next few days. Alternatively, 
team members could be assigned 5 days in which they can take off work. But make sure to communciate this early(3-7 days) in advance! 

## Sprint cadence
- Sprint length is 2 weeks
- Backlog grooming meeting is at least once per sprint.

## Daily standups
- Daily standups must be done by the end of the day and submitted to the discord channel.
- Members must meet in person/on-line for 1-5 minutes for the standup meeting.
- Memebers that make no progress on a task for more than two standups get reported to management.


# Coding/Contributing guidelines
## Contributing Guide
- Never push broken code to main, make sure your code is working and tested. If you do push it, you must fix it immediately as to avoid assigning extra work to teammates.
- Rarely push to the main branch, always branch and pull request your finished task to the Github. Only push to main if a change is really minor and wont cause significant merge conflicts.
- If the pull request is related to a completed task, always put the issue number in the pull request to make it easier for fellow developers to review.
- People assigned to review the pull request must actually read their code in order to ensure it follows team norms.

## Coding standards
- Use ES6Lint VS code extension for Javascript.
- Use Typescript when writing your code to avoid misunderstood data input types.
- Autoformat your code using `CTRL+SHIFT+I` before committing.  
- Do not write short variable names whose names dont relate to their function and comment your functions.
- Write automated tests to cover critical integration points and functionality (once you learn how to do that).
- Make granular and small commits, per feature or per bug fix.
- Make short, straight to the point, yet descriptive commit messages.

# Project Setup

## Setup the IDE
1. Install VS code
2.  Clone the repository using `git clone https://github.com/agiledev-students-spring-2023/final-project-bayt`.
3.  Open the repo in VS code and download the following extensions:
    - ESlint
    - React Snippets
    - Typescript

### Build and launch the database

- install and run [docker desktop](https://www.docker.com/get-started)
- create a [dockerhub](https://hub.docker.com/signup) account
- run command, `docker run --name mongodb_dockerhub -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest`

The back-end code will integrate with this database. However, it may be occasionally useful interact with the database directly from the command line:

- connect to the database server from the command line: `docker exec -ti mongodb_dockerhub mongosh -u admin -p secret`
- show the available databases: `show dbs`
- select the database used by this app: `use example-mern-stack-app`
- show the documents stored in the `messages` collection: `db.messages.find()` - this will be empty at first, but will later be populated by the app.

If you have trouble running Docker on your computer, use a database hosted on [MongoDB Atlas](https://www.mongodb.com/atlas) instead. Atlas is a "cloud"" MongoDB database service with a free option. Create a database there, and make note of the connection string. In the `.env` file within the `back-end` directory, replace the given `DB_CONNECTION_STRING` value with this one.

### Build and launch the back end

1. Navigate into the `back-end` directory
1. Run `npm install` to install all dependencies listed in the `package.json` file.
1. Run `npm start` to launch the back-end server

### Build and launch the front end

1. Navigate into the `front-end` directory
1. Run `npm install` to install all dependencies listed in the `package.json` file.
1. Run `npm start` to launch the React.js server
