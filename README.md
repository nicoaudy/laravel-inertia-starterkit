# Laravel-React(Inertia) Starterkit

<p align="center">
<img src="https://i.imgur.com/AZ6FCon.png">
</p>

## Features

- [Roles & Permissions](https://spatie.be/docs/laravel-permission/)
- [Tailwindcss](https://tailwindcss.com)
- [Mantine](https://mantine.dev/)
- [Redis](https://redis.io/)
- [Mailcatcher](https://mailcatcher.me/)

## Docker Installation

- `make install`
- Access your app from port `1000`
- Access your mailcatcher from port `1026`

## Installation

- `composer install`
- Edit `.env` and set your database connection details
- (When installed via git clone or download, run `php artisan key:generate`)
- `php artisan migrate`
- `npm install`

## Usage

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
```


## Notes

If you want to use javascript version, switch to branch `lang:javascript`

and all set🎉
