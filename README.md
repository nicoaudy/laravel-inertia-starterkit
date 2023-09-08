# Laravel-React(Inertia) Starterkit

<p align="center">
<img src="https://imgur.com/a/X4V9Sf5">
</p>

## Features

- [bun.sh](https://bun.sh/)
- [Roles & Permissions](https://spatie.be/docs/laravel-permission/)
- [Tailwindcss](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)
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
- `bun install`

## Usage

#### Development

```bash
bun run dev
```

#### Production

```bash
bun run build
```

## Notes

If you want to use javascript version, switch to branch `lang:javascript`

and all set🎉
