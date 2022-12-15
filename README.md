# Laravel-React(Inertia) Starterkit

<p align="center">
<img src="https://i.imgur.com/AZ6FCon.png">
</p>

## Features

- [Roles & Permissions](https://spatie.be/docs/laravel-permission/)
- [Tailwindcss](https://tailwindcss.com)
- [Mantine](https://mantine.dev/)

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

## Docker Installation

- Edit `.env` and set your database connection details
- Set http port to 80 `APP_PORT=80` for development
- Set https port to 443 `APP_PORT_HTTPS=443` for development
- `docker compose build`
- `docker compose up`
- `docker compose exec app composer install`
- `docker compose exec app php artisan key:generate`
- `docker compose exec app php artisan migrate --seed`
- `docker compose exec app npm install`
- `docker compose exec app npm run build`

and all set🎉
