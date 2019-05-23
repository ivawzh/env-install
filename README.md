# private-packages-on-github

Install NPM package hosted by private Github repo. Support both SSH and HTTPS Github connections.

Using private git repositories that requires authentication is often necessary when running npm install, but you don't want to put keys, tokens or passwords in your code, so instead you can use this module that allows you to define packages with environment variable names to inject your keys, passwords or tokens.

Also support dev-only dependencies with `devPrivatePackagesOnGithub`.

Inspired by https://github.com/porsager/env-install.

## Usage

1. Install via `npm install -D private-packages-on-github`
2. Add a `postinstall` script with command `install-private-packages-from-github`
3. Declare your dependencies containing environment variables in `privatePackagesOnGithub`

#### `package.json` example

```js
"scripts": {
    "postinstall": "install-private-packages-from-github"
},
"dependencies": {
    "private-packages-on-github": "^1.0.0"
},
"privatePackagesOnGithub": {
    "some-secret-module": "github.com/you/private-repo"
},
"devPrivatePackagesOnGithub": {
    "some-dev-secret-module": "github.com/you/private-repo"
},
```

In the above example `some-secret-module`, depend on if we have provided ENV `GITHUB_TOKEN`,

- If `GITHUB_TOKEN` is defined, packages will be installed as

    ```sh
    # export GITHUB_TOKEN=abcdefg123456
    npm install https://abcdefg123456:x-oauth-basic@github.com/you/private-repo
    ```

- If `GITHUB_TOKEN` is not defined, we will assume you have configured SSH access on the machine and install packages as

    ```sh
    npm install git+ssh://git@github.com/you/private-repo
    ```

To obtain `GITHUB_TOKEN`, check [Github doc here](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

## Deploy NPM Package

1. Update version in [package.json](./package.json)
2. Publish NPM package

    ```sh
    npm adduser
    npm publish --access public
    ```
