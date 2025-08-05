# TurbovetsChallenge

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kaushalchandrapal/turbovets-challenge.git
cd turbovets-challenge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure .env for Backend (apps/api/.env)
```env
JWT_SECRET=wO9kMG9mTByeIw9dwFC0IDPKrC/sQmNWvWaJqjPaFDROAc3+IDPSGfUHbytrMSUifYq7Xnp4vbT2A5zmYICl4A==
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=
DATABASE_NAME=turbovets_challenge
```

### 4. Run Backend
```bash
npx nx run api:serve:development --verbose
```

### 5. Run Frontend
```bash
npx nx serve dashboard --verbose | less
```

## 🧱 Architecture Overview
```kotlin
turbovets-challenge/
│
├── apps/
│   ├── api/        → NestJS backend
│   └── dashboard/  → Angular frontend
│
├── libs/
│   ├── data/       → Shared interfaces and DTOs
│   └── auth/       → Reusable RBAC decorators, guards, and logic
```
- Nx Monorepo: Unified workspace for backend and frontend.
- libs/data: Shared models across apps.
- libs/data: Shared models across apps.

## 🗃️ Data Model Explanation
### Entities and Relationships
- **User**
  - `id`: Primary Key
  - `email`: Unique
  - `name`
  - `password`: Hashed
  - `role`: Enum (OWNER, ADMIN, VIEWER)
  - `organizationId`: Foreign Key → Organization
  - `createdAt`
  - `updatedAt`

- **Organization**
  - `id`: Primary Key
  - `name`
  - `parentOrganizationId`: Nullable (Self-referencing FK)
  
- **Task**
  - `id`: Primary Key
  - `title`
  - `description`
  - `createdBy`: Foreign Key → User
  - `organizationId`: Foreign Key → Organization
  - `status`: Enum (PENDING, IN_PROGRESS, DONE)
  - `order`: number (ordering in status column)
  - `createdAt`
  - `updatedAt`

### Enums
 - **Role** - OWNER, ADMIN, VIEWER 
 - **TaskStatus** - PENDING, IN_PROGRESS, DONE 

## 🔐 Access Control Implementation
### JWT Auth
- Issued on login.

### Guards & Decorators
- @Roles('ADMIN'), @Roles('OWNER'), @Roles('VIEWER')

### Organizational Scoping
- Users can only access tasks in their own org.
- Hierarchy supports multi-level org delegation.

## 📡 API Docs
### 🔐 Auth
- POST /auth/login
```json
{
  "email": "admin@example.com",
  "password": "secure123"
}
```

Response
```json
{
  "access_token": "JWT_TOKEN"
}
```

- POST /auth/register
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "T3sting1@",
  "role": "OWNER",
  "organizationId": "1"
}
```

### 📋 Tasks
- GET /tasks - get All tasks (according to status)
- POST /tasks
```json
{
  "title": "Design UI",
  "description": "Homepage layout",
  "status": "PENDING"
}
```

- PATCH /tasks/:id
```json 
{
  "newIndex": 2,
  "newStatus": "PENDING",
}
```

- DELETE /tasks/:id

## 🔮 Future Considerations
### ✅ Advanced Role Delegation
- Custom roles and dynamic permission assignment.

### 🔁 JWT Refresh Tokens
- Implement secure refresh/rotation mechanism.

## 🧑‍💻 Contributors
- @kaushalchandrapal
