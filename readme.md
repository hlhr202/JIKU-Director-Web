# JIKU Director Web framework

The project is not completed

## Dependencies

- Composer
- PHP 7.1 (May have compatible problem with PHP5.6)
- MySQL >= 14.14
- Apache2
- Nodejs
- Other dependency requirements for [Brightness Adjust](https://github.com/hlhr202/BrightnessAdjust)

## Developer Guide

1. Install Backend:
```
$ composer install
```

2. Build front-end:

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

3. configure the environment(MySQL, serverport) by editing .env file

4. To enable Debugbar, edit the config/debugbar.php file

5. The JsonWebToken is used for authentication

6. start running
```
$ mysql.server start
$ php artisan serve
```

7. front-end developer guide can be found [here](./blob/master/ui/README.md)

8. If uploading is not working, try change your php.ini file to enlarge the upload_max_filesize to 256M and memory_limit to 128M
