'use strict';

import path from 'path';
import fs from 'fs';
import nconf from 'nconf';

let rootDir = path.normalize(path.join(__dirname, '/..'));
let env = process.env.NODE_ENV || 'development';

// Test if dot env exists.
if (fs.existsSync(path.join(rootDir, '.env'))) {
  require('dotenv').load();
}

let defaults = {
  root: rootDir,
  postgres_url: process.env.POSTGRESQL_URL,
  port: 3000
};

defaults.site = process.env.SITE || 'http://localhost:3000';

defaults.app = {
  name: 'Test'
};

defaults.secretKey = process.env.SECRET_KEY || 'tintsiokdjafdkljds';

/*
 * Setup nconf to use (in order):
 *  1. Command-line arguments
 *  2. Environment variables
 */
nconf.argv().env();

nconf.defaults(defaults);
