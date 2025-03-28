# Use official PHP 8.2 image with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# Copy Laravel files
COPY . .

# Install PHP dependencies
RUN composer install

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Enable Apache rewrite module
RUN a2enmod rewrite

# Expose port 80 (HTTP) or 443 (HTTPS)
EXPOSE 80

# Start Apache and Laravel
CMD ["sh", "-c", "php artisan migrate --force && apache2-foreground"]
