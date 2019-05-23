#! /usr/bin/env node

const path = require('path')
    , packageJson = require(path.join(process.cwd(), 'package.json'))
    , childProcess = require('child_process')

const deps = packageJson.envDependencies || {}
const devDeps = packageJson.devEnvDependencies || {}

const packages = Object.keys(deps).map(key =>
  deps[key].replace(/\${([0-9a-zA-Z_]*)}/g, (_, x) => process.env[x])
).join(' ')

const devPackages = Object.keys(devDeps).map(key =>
  devDeps[key].replace(/\${([0-9a-zA-Z_]*)}/g, (_, x) => process.env[x])
).join(' ')

try {
  if (['development', undefined].includes(process.env.NODE_ENV)) {
    childProcess.execSync('npm install --no-save ' + packages + devPackages, { stdio:[0, 1, 2] })
  } else {
    childProcess.execSync('npm install --no-save ' + packages, { stdio:[0, 1, 2] })
  }
} catch (e) { }
