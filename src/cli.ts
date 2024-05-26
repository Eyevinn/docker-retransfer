#! /usr/bin/env node

import { Command } from 'commander';
import { prepare, download, upload } from './transfer';

const cli = new Command();
cli
  .description('Copy a file from one location to another')
  .argument('<source>', 'Source URL (supported protocols: http, https, s3)')
  .argument('<dest>', 'Destination URL (supported protocols: s3)')
  .option('--sat <sat>', 'Service Access Token')
  .option(
    '--staging-dir <stagingDir>',
    'Staging directory (default: /tmp/data)'
  )
  .option('-v, --verbose', 'Verbose mode', false)
  .action(async (source, dest, options, command) => {
    try {
      const sourceUrl = new URL(source);
      const destUrl = new URL(dest);

      const stagingDir = await prepare(options.stagingDir);
      const localFileName = await download(sourceUrl, {
        stagingDir,
        verbose: options.verbose,
        serviceAccessToken: options.sat
      });
      const destHref = await upload(localFileName, destUrl, {
        verbose: options.verbose
      });
      console.log(
        `Transfer of ${sourceUrl.href} to ${destHref} completed successfully!`
      );
    } catch (err) {
      console.log((err as Error).message);
    }
  });

cli.parse(process.argv);
