# Ecommerce

## Techs used:

### Frontend

- Next.js (Reactjs Framework)
- Tailwindcss (CSS Framework)
- Axios (XMLHttpRequest)
- Formik (Form handler)

### Backend

- PostgresSQL
- Node.js
- Strapi Headless CMS

## Prerequisites

- [Download Node.js and NPM](https://nodejs.org/en/download/)
- [Download PostgresSQL](https://www.postgresql.org/download/)
  Be sure create `ecommerce` database in `pgAdmin 4` and enter database password at `backend ~ config ~ database.js`

## Run Locally

Clone the project

```bash
  git clone git@github.com:Shubham-731/armando-ecommerce.git
```

Go to the project directory

```bash
  cd ecommerce
```

Install dependencies

```bash
  npm install
  cd frontend
  npm install
  cd ../backend
  npm install
```

Start the dev server

```bash
  cd ecommerce
  npm run dev
```

Start the server

```bash
  cd ecommerce
  npm run start
```

## Environment Variables

Although, sample environment variables are provided, but you should replace them by yours.
To run this project, you will need to add the following environment variables to your .env file

### In Frontend:

`NEXT_PUBLIC_STRAPI_API_HOST`

### In Backend:

`STRIPE_PUBLIC_KEY`

`NEXT_DEV_URL`

`STRIPE_SECRET_KEY`
