#!/usr/bin/env node

/**
 * Automated Vercel Environment Variables Setup Script
 * 
 * This script reads from .env.local and sets up environment variables in Vercel
 * Usage: node scripts/setup-vercel-env.js
 * 
 * Prerequisites:
 * 1. Install Vercel CLI: npm i -g vercel
 * 2. Login to Vercel: vercel login
 * 3. Link project: vercel link
 * 4. Have .env.local file with your environment variables
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPrerequisites() {
  log('🔍 Checking prerequisites...', 'blue');
  
  try {
    execSync('vercel --version', { stdio: 'pipe' });
    log('✅ Vercel CLI is installed', 'green');
  } catch (error) {
    log('❌ Vercel CLI not found. Install it with: npm i -g vercel', 'red');
    process.exit(1);
  }

  try {
    execSync('vercel whoami', { stdio: 'pipe' });
    log('✅ Logged in to Vercel', 'green');
  } catch (error) {
    log('❌ Not logged in to Vercel. Run: vercel login', 'red');
    process.exit(1);
  }

  const vercelJsonPath = path.join(process.cwd(), '.vercel', 'project.json');
  if (!fs.existsSync(vercelJsonPath)) {
    log('❌ Project not linked to Vercel. Run: vercel link', 'red');
    process.exit(1);
  }
  log('✅ Project is linked to Vercel', 'green');
}

function readEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    log('❌ .env.local file not found. Please create it first.', 'red');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      }
    }
  });

  return envVars;
}

function setVercelEnvVar(key, value) {
  const environments = ['production', 'preview', 'development'];
  
  environments.forEach(env => {
    try {
      log(`Setting ${key} for ${env}...`, 'yellow');
      execSync(`vercel env add ${key} ${env}`, {
        input: value,
        stdio: ['pipe', 'pipe', 'pipe']
      });
      log(`✅ Set ${key} for ${env}`, 'green');
    } catch (error) {
      log(`❌ Failed to set ${key} for ${env}: ${error.message}`, 'red');
    }
  });
}

function generateNextAuthSecret() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('base64');
}

function main() {
  log('🚀 Vercel Environment Variables Setup', 'bold');
  log('=====================================', 'bold');

  checkPrerequisites();

  const envVars = readEnvFile();
  
  // Generate NEXTAUTH_SECRET if not present
  if (!envVars.NEXTAUTH_SECRET) {
    log('🔑 Generating NEXTAUTH_SECRET...', 'yellow');
    envVars.NEXTAUTH_SECRET = generateNextAuthSecret();
  }

  // Set NEXTAUTH_URL if not present
  if (!envVars.NEXTAUTH_URL) {
    try {
      const projectInfo = JSON.parse(fs.readFileSync('.vercel/project.json', 'utf8'));
      envVars.NEXTAUTH_URL = `https://${projectInfo.name}.vercel.app`;
      log(`🌐 Setting NEXTAUTH_URL to: ${envVars.NEXTAUTH_URL}`, 'blue');
    } catch (error) {
      log('⚠️  Could not auto-detect NEXTAUTH_URL. Please set it manually.', 'yellow');
    }
  }

  log('\n📝 Setting environment variables in Vercel...', 'blue');

  // Required environment variables
  const requiredVars = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'POSTGRES_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL_NON_POOLING',
    'POSTGRES_USER',
    'POSTGRES_HOST',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ];

  let successCount = 0;
  let missingVars = [];

  requiredVars.forEach(varName => {
    if (envVars[varName]) {
      setVercelEnvVar(varName, envVars[varName]);
      successCount++;
    } else {
      missingVars.push(varName);
    }
  });

  log('\n📊 Summary:', 'bold');
  log(`✅ Successfully set: ${successCount} variables`, 'green');
  
  if (missingVars.length > 0) {
    log(`⚠️  Missing variables: ${missingVars.join(', ')}`, 'yellow');
    log('Please add these to your .env.local file and run the script again.', 'yellow');
  }

  log('\n🎉 Environment setup complete!', 'green');
  log('You can now deploy with: vercel --prod', 'blue');
}

if (require.main === module) {
  main();
}

module.exports = { main };