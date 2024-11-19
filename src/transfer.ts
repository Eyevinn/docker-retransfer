import { existsSync, mkdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const DEFAULT_STAGING_DIR = '/tmp/data';

export type DownloadOptions = {
  stagingDir: string;
  serviceAccessToken?: string;
  verbose?: boolean;
};

export type UploadOptions = {
  verbose?: boolean;
  s3EndpointUrl?: string;
};

export async function prepare(
  stagingDir = DEFAULT_STAGING_DIR
): Promise<string> {
  if (!existsSync(stagingDir)) {
    mkdirSync(stagingDir, { recursive: true });
  }
  return stagingDir;
}

export async function download(
  source: URL,
  options: DownloadOptions
): Promise<string> {
  const localFileName = join(options.stagingDir, basename(source.pathname));
  if (source.protocol === 'http:' || source.protocol === 'https:') {
    const auth: string[] = [];
    if (options.serviceAccessToken) {
      auth.push('-H');
      auth.push(`x-jwt: Bearer ${options.serviceAccessToken}`);
    }
    const { status, stdout, stderr } = spawnSync(
      'curl',
      auth.concat(['-v', '-o', localFileName, source.href])
    );
    if (options.verbose && stderr) {
      console.log(stderr.toString());
    }
    if (status !== 0) {
      throw new Error('Download failed');
    }
  } else {
    throw new Error(`Unsupported protocol for download: ${source.protocol}`);
  }
  return localFileName;
}

export function createS3cmdArgs(
  cmdArgs: string[],
  s3EndpointUrl?: string
): string[] {
  const args = ['s3'];
  if (s3EndpointUrl) {
    args.push(`--endpoint-url=${s3EndpointUrl}`);
  }
  return args.concat(cmdArgs);
}

export async function upload(
  localFileName: string,
  dest: URL,
  options: UploadOptions
): Promise<string> {
  let destHref = dest.href;
  if (dest.protocol === 's3:') {
    if (dest.pathname.endsWith('/')) {
      destHref = `${destHref}${basename(localFileName)}`;
    }
    const args = createS3cmdArgs(
      ['cp', localFileName, destHref],
      options.s3EndpointUrl
    );
    const { status, stdout, stderr } = spawnSync('aws', args);
    if (options.verbose && stderr) {
      console.log(stderr.toString());
    }
    if (status !== 0) {
      throw new Error('Upload failed');
    }
  } else {
    throw new Error(`Unsupported protocol for upload: ${dest.protocol}`);
  }
  return destHref;
}
