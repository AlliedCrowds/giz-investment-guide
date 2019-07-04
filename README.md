<a href="https://make-it.alliedcrowds.com"><img src="https://make-it.alliedcrowds.com/assets/images/mitia-logo.f9fadeb44d8954c5b9ddf0f76b46ee4a.svg" title="Make-It" alt="Make It"></a>

# Make-It

> Guide to Investment for African Entrepreneurs

---

## Installation

### Clone

> Clone this repo to your local machine using

```shell
$ git clone https://github.com/AlliedCrowds/giz-investment-guide.git`
```

### Setup

> We use yarn to manage make-it package dependencies. To get:

```shell
$ brew update
$ brew install yarn
```

> To install dependencies:

```shell
$ yarn install
```

**Note:** After installation yarn will run the build script to verify the project builds correctly.

---

### scripts

> to build _make-it_ for development or production:

```shell
$ yarn run build:dev
$ yarn run build:prod
```

> to build for development and host with `webpack-dev-server` with hot reloading:

```shell
$ yarn run watch
```

> to remove the development and production builds, or both, from the distribution folder use:

```shell
$ yarn run clean:dist:dev
$ yarn run clean:dist:prod
$ yarn run clean:dist
```

> to remove `node_modules`:

```shell
$ yarn run clean:node_modules
```

> to clean all dependency and distribution files:

```shell
$ yarn run clean:all
```

> to lint the project use:

```shell
$ yarn run lint
```

> to prettify the project use:

```shell
$ yarn run prettier
```

> to publish the project to development or production environments use:

```shell
$ yarn run publish:dev
$ yarn run publish:prod
```

> to clean, build and then publish the project to development or production environments respectively use:

```shell
$ yarn run deploy:dev
$ yarn run deploy:prod
```

**Note:** `husky` runs `prettier` and `eslint` as a `pre-commit` hook.

If you use `VSCode` with the `eslint` and `prettier` extensions, the IDE will auto-formatted and -correct your code when you save a file.
