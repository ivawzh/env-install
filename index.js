#! /usr/bin/env node

const path = require('path')
    , packageJson = require(path.join(process.cwd(), 'package.json'))
    , childProcess = require('child_process')

const isDev = ['development', undefined].includes(process.env.NODE_ENV)
const deps = Object.assign({}, packageJson.privatePackagesOnGithub, (isDev && packageJson.devPrivatePackagesOnGithub))

const hasGithubToken = !!process.env.GITHUB_TOKEN
const packages = Object.keys(deps).map(key => {
  const address = deps[key]
  const prefix = hasGithubToken ? "https://" + process.env.GITHUB_TOKEN + ":x-oauth-basic@" : "git+ssh://git@"
  return prefix + address
}).join(' ')

if (!!packages) {
  try {
    childProcess.execSync('npm install --no-save ' + packages, { stdio:[0, 1, 2] })
  } catch (e) {}
}
