## Installation

  1. Download or clone the repository:
     
    git clone https://github.com/VriaA/hs-ai-customer-support.git

  2. Install dependencies:

    npm install


## Setting up environmental Variables
Create a `.env.local` file with a variable called `OPENAI_API_KEY` in the root directory as follows:

    OPENAI_API_KEY=key
##### Note: 
- No need to prefix with `"NEXT_PUBLIC"` since it will be used on the server.

##### How to get OpenAI Api Key:

- On the OpenAI API website, login to your account, then navigate to /api-keys to generate your personal API Key.



## Getting Started
  1. Run the development server:

    npm run dev

  2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Deployment

- Use [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
