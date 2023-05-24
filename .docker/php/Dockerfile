FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www
VOLUME ["/var/www"]

# Dependencies and necessary packages
RUN apt-get update \
    && apt-get install -y \
    build-essential \
    jpegoptim optipng pngquant gifsicle \
    libcurl4-gnutls-dev \
    libmcrypt-dev \
    libpq-dev \
    libicu-dev \
    zlib1g-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libc-dev \
    libzip-dev \
    libonig-dev \
    libnss3 \
    libx11-6 \
    libx11-xcb1 \
    libxml2-dev \
    libsqlite3-dev \
    gnupg \
    imagemagick \
    libmagickwand-dev \
    zip \
    unzip \
    git \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js and Npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    intl \
    bcmath \
    gd \
    mysqli \
    mbstring \
    exif \
    opcache \
    pdo_mysql \
    pdo_pgsql \
    pdo_sqlite \
    pcntl \
    zip \
    curl \
    dom \
    xml

# Add user for Laravel application
RUN groupadd -g 1000 www \
    && useradd -u 1000 -ms /bin/bash -g www www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
