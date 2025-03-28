FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# First copy only composer files
COPY composer.json composer.lock ./

# Install dependencies (with --ignore-platform-reqs if needed)
RUN composer install --ignore-platform-reqs --no-interaction --no-scripts

# Then copy the entire application
COPY . .

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Enable Apache rewrite
RUN a2enmod rewrite

EXPOSE 80
CMD ["sh", "-c", "php artisan migrate --force && apache2-foreground"]
