# Reminder how to start the APP

1. cd to rackethub_backend (start the backend)
2. `python app.py`
3. open another terminal (start the client side)
  - npm start
4. make sure the backend database mongodb is running (start the mongodb database)
  - start another terminal 
  - open to:
  ```
    Path
    ----
    C:\Program Files\MongoDB\Server\7.0\bin
  ```
  - `mongod` on that terminal.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

https://www.youtube.com/watch?v=foiMMI-pEes&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&index=9


```
racquethub_backend/
├── app.py                        # Main Flask application entry point
├── authentication/               # Package for authentication-related code
│   ├── __init__.py               # Initialize the authentication package
│   ├── routes.py                 # Define authentication routes (login, register, etc.)
│   └── models.py                 # Define authentication-related database models
├── utils/                        # Package for utility functions
│   ├── __init__.py               # Initialize the utils package
│   └── helper.py                 # Utility functions used throughout the application
├── config.py                     # Configuration settings for the application
├── requirements.txt              # List of Python dependencies
└── .env                          # Environment variables (optional)

racquethub_app/
├── racquethub_backend            # Main backend file
├── src/                          # Main front end components
│   └── App.tsx
├── package.json
├── venv
└── .env

```



# TODO List

## After Submitting a New Proposal

- Close modal
- Disable the submit button while processing the request
- Show a success banner 
- Rerender the proposal list component to display the new proposal 
- THe new proposal is not showing after dialog is closed. <--------->

## Feature: Delete Proposal

- Implement functionality for logged-in users to delete/update  proposals
