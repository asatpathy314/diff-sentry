# Documentation
## Getting Started with Diff Sentry's CI

Our number one goal with this project is to make integrating vulnerability scanning
into your pipeline as pain free as possible. Which is why you can add it to your repo in 
just three steps.

1. Create a `.github` folder at the root of your respository.
2. Create a `workflows` folder in the `.github` folder.
3. Copy the file in `CI/sentry.yml` into your `workflows` folder.

Now you're done, and on every PR or commit to main DiffSentry will run our entire
vulnerability detection engine on the changes.

## Advanced

### Configuring the CI pipeline to run on branches other than Main
If you want to add external branches like `prod` or `dev` you can do so at the top
of the `sentry.yml` file.

```yml
on:
  pull_request:
    branches:
      - main  # change for CI on PR
  push:
    branches:
      - main  # change for CI on push
```

### API
If you'd like to self-host your API in security-critical applications for private use cases (examples for this include corporate development) you need only change the API URL base used in the API request here.

```js
// Send request to DiffSentry backend
const response = await fetch('https://diff-sentry-backend-c77f0d5e98bc.herokuapp.com/diffsentry', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
});
```

Everything else will work the same.

API docs.

### Changing the Report Format
There's a few caveats here. 

This line in the report:

```md
# DiffSentry Security Scan Results
```

Is used as a search query for future commits to the PR so the bot updates old comments
instead of repreatedly creating new ones and cluttering the PR. If you want to update or replace the format, make sure that you either keep the above line or replace the below code:

```js      
const botComment = comments.data.find(comment => 
    comment.user.login === 'github-actions[bot]' && 
    comment.body.includes('DiffSentry Security Scan Results')
);
```

Don't worry though, you're free to use the phrase "DiffSentry Security Scan Results" in your PR comments.



