# Elza Darya - Personal Website & E-commerce Platform

This is a [Next.js](https://nextjs.org) project with Laravel backend for Elza Darya's personal website, featuring book and poem sales with Paddle payment integration.

## Features

- 🌍 Multi-language support (Turkish, English, Russian, Azerbaijani)
- 📚 Book and poem catalog with preview and purchase functionality
- 💳 Paddle payment integration for secure transactions
- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-first approach
- 🔍 SEO optimized with dynamic meta tags
- 📧 Contact forms and newsletter subscription

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PHP 8.2+ and Composer (for Laravel backend)
- Database (SQLite for development, PostgreSQL/MySQL for production)

### Frontend Setup (Next.js)

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create `.env.local` file with required environment variables:
```bash
# Paddle Configuration
NEXT_PUBLIC_PADDLE_SANDBOX_TOKEN=test_your_sandbox_token
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=live_your_production_token

# API Configuration  
NEXT_PUBLIC_API_URL=https://your-laravel-api.com/api
INTERNAL_API_URL=http://localhost:8000/api
```

3. Run the development server:
```bash
npm run dev
```

### Backend Setup (Laravel)

1. Navigate to the Laravel directory and install dependencies:
```bash
cd ../elza-darya
composer install
```

2. Create `.env` file with Paddle configuration:
```bash
# Paddle Configuration
PADDLE_SELLER_ID=your_seller_id
PADDLE_CLIENT_SIDE_TOKEN=your_client_side_token  
PADDLE_API_KEY=your_api_key
PADDLE_WEBHOOK_SECRET=your_webhook_secret
PADDLE_ENVIRONMENT=sandbox

# AWS S3 for file storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=your_region
AWS_BUCKET=your_bucket_name
```

3. Run migrations and seed the database:
```bash
php artisan migrate --seed
```

4. Start the Laravel server:
```bash
php artisan serve
```

## Paddle Integration

The project uses Paddle for payment processing:

1. **Frontend**: Direct Paddle.js integration for checkout overlay
2. **Backend**: Laravel Cashier Paddle for webhook handling and order management
3. **Webhook**: Automatic order creation on successful payments

### Setting up Paddle

1. Create a Paddle account and get your credentials
2. Configure webhook URL: `https://your-domain.com/api/paddle/webhook`
3. Add Price IDs to your books and poems in the admin panel
4. Test with sandbox environment before going live

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
