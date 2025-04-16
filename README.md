# retransfer

[![Badge OSC](https://img.shields.io/badge/Evaluate-24243B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yODIxXzMxNjcyKSIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI3IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz4KPGRlZnM%2BCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8yODIxXzMxNjcyIiB4MT0iMTIiIHkxPSIwIiB4Mj0iMTIiIHkyPSIyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjQzE4M0ZGIi8%2BCjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzREQzlGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM%2BCjwvc3ZnPgo%3D)](https://app.osaas.io/browse/eyevinn-docker-retransfer)

Docker container to copy a file from one location to another. For example copy a file from a webserver and store in an S3 bucket.

## Usage

Build container

```
docker build -t retransfer:local .
```

Download a file on a web server `https://www.eyevinn.se/instagram.ecb3802c.png` and upload it to an S3 bucket:

```
docker run --rm \
  -e AWS_ACCESS_KEY_ID=<aws-access-key-id> \
  -e AWS_SECRET_ACCESS_KEY=<aws-secret-access-key> \
  retransfer:local \
  retransfer -v https://www.eyevinn.se/instagram.ecb3802c.png s3://lab-testcontent-store/birme/
```

For S3 compatible cloud storage not on AWS you can provide the S3 Endpoint URL in the environment variable `S3_ENDPOINT_URL`.

```
docker run --rm \
  -e AWS_ACCESS_KEY_ID=<aws-access-key-id> \
  -e AWS_SECRET_ACCESS_KEY=<aws-secret-access-key> \
  -e S3_ENDPOINT_URL=<s3-endpoint-url> \
  retransfer:local \
  retransfer -v https://www.eyevinn.se/instagram.ecb3802c.png s3://lab-testcontent-store/birme/
```

## Development

Prerequisites:
- curl
- AWS cli

Install Node dependencies

```
npm install
```

Build

```
npm run build
```

Run script locally

```
% node dist/cli.js -h
Usage: cli [options] <source> <dest>

Copy a file from one location to another

Arguments:
  source                      Source URL (supported protocols: http, https, s3)
  dest                        Destination URL (supported protocols: s3)

Options:
  --sat <sat>                 Service Access Token
  --staging-dir <stagingDir>  Staging directory (default: /tmp/data)
  -v, --verbose               Verbose mode (default: false)
  -h, --help                  display help for command
```

## Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

## About Eyevinn Technology

[Eyevinn Technology](https://www.eyevinntechnology.se) is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor. As our way to innovate and push the industry forward we develop proof-of-concepts and tools. The things we learn and the code we write we share with the industry in [blogs](https://dev.to/video) and by open sourcing the code we have written.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
