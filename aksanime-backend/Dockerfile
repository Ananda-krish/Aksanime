FROM php:8.2-apache

# Set working directory to /var/www/html
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

# Copy ONLY the necessary files from akasanime-backend
COPY composer.json composer.lock ./
COPY database/ database/
COPY bootstrap/ bootstrap/
COPY config/ config/
COPY public/ public/
COPY resources/ resources/
COPY routes/ routes/
COPY app/ app/

# Install dependencies (using --ignore-platform-reqs for compatibility)
RUN composer install --ignore-platform-reqs --no-interaction --no-scripts

# Copy the rest of the application
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage \
    /var/www/html/bootstrap/cache

# Enable Apache rewrite
RUN a2enmod rewrite

EXPOSE 80
CMD ["sh", "-c", "php artisan migrate --force && apache2-foreground"]
