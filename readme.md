# JIKU Director Web framework

The project is not completed

## Dependencies

- Composer
- PHP 7.1 (May have compatible problem with PHP5.6)
- MySQL >= 14.14
- Nodejs
- Other dependency requirements for [Brightness Adjust](https://github.com/hlhr202/BrightnessAdjust)

## Developer Guide

### Install Backend:
```
$ composer install
```

### Build front-end:

- install gulp before you start
```
$ npm install --global gulp
```

- under ui folder
```
$ cd ui/
$ npm install
$ npm run build
```

- under root folder, shift the front-end sources to the public folder
```
$ npm install
$ gulp
```

configure the environment(MySQL, serverport) by editing .env file

To enable Debugbar, edit the config/debugbar.php file

The JsonWebToken is used for authentication

### start running
```
$ mysql.server start
$ php artisan serve
```

front-end developer guide can be found [here](./ui/README.md)

If uploading is not working, try change your php.ini file to enlarge the upload_max_filesize to 256M and memory_limit to 128M
