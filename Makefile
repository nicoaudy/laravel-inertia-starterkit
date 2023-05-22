# Variables
app_container = "app"

build:
	echo "Start build the container"
	docker compose build
	echo "Container has been build successfully"

setup:
	docker compose exec $(app_container) php artisan key:generate
	docker compose exec $(app_container) composer install
	docker compose exec $(app_container) npm install
	docker compose exec $(app_container) npm run build

down:
	docker compose down

start:
	docker compose up -d
