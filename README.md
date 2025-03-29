# diff-sentry
Next-generation solution to reliable security in OSS.

# Deploy
Frontend

```shell
heroku buildpacks:add -a diff-sentry-frontend https://github.com/lstoll/heroku-buildpack-monorepo
heroku config:set -a diff-sentry-frontend APP_BASE=DiffSentry
heroku buildpacks:add -a diff-sentry-frontend heroku/nodejs

heroku buildpacks:add -a diff-sentry-backend https://github.com/lstoll/heroku-buildpack-monorepo
heroku config:set -a diff-sentry-backend APP_BASE=DiffSentry
heroku buildpacks:add -a diff-sentry-backend heroku/python
git push diff-sentry-backend main
```