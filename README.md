# SWR Todo List

- A Todo List created with [SWR](https://github.com/zeit/swr) and [json-server](https://github.com/typicode/json-server)

**_Note_**: You need to create a `db.json` in the root in the following manner for the project to work as it uses `json-server` as a database.

```json
{
  "todos": [
    {
      "id": "1",
      "title": "Task 1",
      "completed": false
    }
  ]
}
```

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode along with the database.<br />
Open [http://localhost:4001](http://localhost:4001) to view the app in the browser.

Open [http://localhost:3001](http://localhost:3001) to view the database in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
