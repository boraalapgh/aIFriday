#!/usr/bin/env node

/**
 * AI Friday Automation CLI
 *
 * Main entry point for all AI Friday automation scripts
 */

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');

// Import script classes
const SessionGenerator = require('./scripts/generate-session');
const RecordingProcessor = require('./scripts/process-recordings');
const CalendarUpdater = require('./scripts/update-calendar');
const ConfluenceExporter = require('./scripts/export-confluence');

program
  .name('ai-friday')
  .description('AI Friday meeting automation tools')
  .version('1.0.0');

program
  .command('new-session')
  .description('Create a new AI Friday session with templates')
  .action(async () => {
    try {
      await new SessionGenerator().run();
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program
  .command('process-recordings')
  .description('Organize meeting recordings and artifacts')
  .action(async () => {
    try {
      await new RecordingProcessor().run();
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program
  .command('update-calendar')
  .description('Generate calendar invites and announcements')
  .action(async () => {
    try {
      await new CalendarUpdater().run();
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program
  .command('export-confluence')
  .description('Format content for Confluence export')
  .action(async () => {
    try {
      await new ConfluenceExporter().run();
    } catch (error) {
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program
  .command('workflow')
  .description('Run a complete session workflow')
  .option('-t, --type <type>', 'workflow type: new|complete', 'new')
  .action(async (options) => {
    try {
      if (options.type === 'new') {
        console.log(chalk.blue.bold('🚀 Starting new session workflow...\n'));
        await new SessionGenerator().run();
        console.log(chalk.yellow('\n📅 Generating calendar content...'));
        await new CalendarUpdater().run();
        console.log(chalk.green.bold('\n✅ New session workflow completed!'));
      } else if (options.type === 'complete') {
        console.log(chalk.blue.bold('🏁 Starting session completion workflow...\n'));
        await new RecordingProcessor().run();
        console.log(chalk.yellow('\n📄 Exporting to Confluence...'));
        await new ConfluenceExporter().run();
        console.log(chalk.green.bold('\n✅ Session completion workflow finished!'));
      }
    } catch (error) {
      console.error(chalk.red('Workflow error:', error.message));
      process.exit(1);
    }
  });

// Add help examples
program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ ai-friday new-session              Create a new session');
  console.log('  $ ai-friday workflow --type new     Complete new session setup');
  console.log('  $ ai-friday workflow --type complete Process completed session');
  console.log('  $ ai-friday process-recordings       Organize meeting artifacts');
  console.log('  $ ai-friday export-confluence        Format for Confluence');
});

// Handle no command
if (!process.argv.slice(2).length) {
  console.log(chalk.blue.bold('🤖 AI Friday Automation Tools\n'));
  console.log('Available commands:');
  console.log('  new-session         Create a new AI Friday session');
  console.log('  process-recordings   Organize recordings and artifacts');
  console.log('  update-calendar      Generate calendar content');
  console.log('  export-confluence    Format for Confluence export');
  console.log('  workflow            Run complete workflows');
  console.log('');
  console.log('Run "ai-friday --help" for more information.');
  process.exit(0);
}

program.parse();