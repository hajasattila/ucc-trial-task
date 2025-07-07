# UCC Trial Task – Event Management System

## Technologies Used

- **Frontend:** [Angular](https://angular.io/)  
  Built with a component-based architecture, ensuring modularity, reusability, and maintainability.

- **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
  Utility-first CSS framework used for responsive and modern UI design.

- **Backend:** [Strapi](https://strapi.io/)  
  A Node.js-based headless CMS that provides a secure and flexible REST API for event management and user authentication using JWT tokens.

---

## Project Overview

### 1. Approach

The goal of this project was to build a multi-user event management system where users can create, edit, and delete their own events. The system implements secure authentication and prevents unauthorized access.

### 2. Solution

- **JWT Authentication:** Only registered users can access the system. Role and permission management are handled by Strapi.
- **Event CRUD:** Each user can create, view, update, and delete their own events.
- **Support:** Events are linked to their owners, ensuring users only see and manage their own data.
- **Security:** All API requests require a valid JWT token to function.
- **Helpdesk System:** A built-in helpdesk feature assists users with common questions. The chatbot can respond to basic inquiries using a keyword-based dictionary. If a user requires human assistance, they can request it, and an authorized agent (with appropriate permissions) can view and reply to these messages through a dedicated interface.

### 3. Design

- **Wireframes & UI:** Created using Tailwind CSS for a modern, responsive design.


- **Sitemap:**
    - `/login` – Login page
    - `/events` – List of user's events
    - `/events/create` – Create a new event
    - `/events/:id/edit` – Edit an existing event
    - `/helpdesk` – Chatbot and human support interface


- **User Journey:**
    1. The user logs in.
    2. Views their events.
    3. Creates a new event or edits an existing one.
    4. Deletes an event if needed.
    5. Opens the Helpdesk if support is needed.


- **Data Flow:**
  Angular → (JWT + REST API) → Strapi → Database  
  Each API request is authenticated, and the backend only returns data relevant to the logged-in user. Helpdesk messages are stored and filtered per user, and agents can respond only if the message is flagged for human review.

### 4. Tools Used


- **Angular CLI** – for frontend application structure
- **Tailwind CSS** – for UI styling
- **Strapi CMS** – for backend and API generation
- **JWT Auth** – for secure access ([jwt.io](https://jwt.io/))
- **Postman** – for testing APIs
- **GitHub** – for version control  

### 5. Sources

### 5. Sources

- Angular Official Documentation: https://angular.io/docs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Strapi Documentation: https://docs.strapi.io/
- JWT Standard & Playground: https://jwt.io/
- MDN Web Docs: https://developer.mozilla.org/
- StackOverflow 
- ChatGPT
- GitHub Discussions
- Dev.to articles – https://dev.to/t/angular
- DigitalOcean Tutorials – https://www.digitalocean.com/community/tutorials


---

## Installation

```bash
# Backend setup
cd UCC_server
npm install
npm run develop

# Frontend setup
cd UCC_client
npm install
ng serve
```
## Run Frontend and Backend Together

If you'd like to run both the frontend and backend concurrently, use the following command:

```bash
npm run dev
```
This executes the following concurrently script:

> secret-server-project@1.0.0 dev
> concurrently "npm start --prefix UCC_client" "npm run develop --prefix UCC_server"

Demo Video  
The demo video showcasing the project functionality: 