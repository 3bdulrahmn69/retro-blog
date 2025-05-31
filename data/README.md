# Retro Blog Database Schema

A comprehensive guide to the data structure and API endpoints for the Retro Blog application.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Structure](#database-structure)
- [Object Schemas](#object-schemas)
- [API Endpoints](#api-endpoints)
- [Data Validation Rules](#data-validation-rules)
- [Example Data](#example-data)
- [Setup Instructions](#setup-instructions)
- [Authentication & Security](#authentication--security)
- [Data Migration](#data-migration)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)
- [Development Guidelines](#development-guidelines)

## 🎯 Overview

This database uses JSON Server to simulate a REST API with two main collections:

- **Users**: Authentication and user profile data with bcrypt password hashing
- **Posts**: Blog posts with embedded comments and soft deletion support

### Technology Stack

- **JSON Server**: Mock REST API for development
- **bcrypt**: Password hashing and security
- **UUID/Timestamp**: Unique identifier generation
- **ISO 8601**: Standardized datetime formatting

## 🗃️ Database Structure

```
data/
├── db.json              # Main database file
└── README.md           # This documentation
```

### Current Data Overview

```json
{
  "users": [8],          // 8 registered users
  "posts": [15]          // 15 total posts (4 soft-deleted)
}
```

## 📊 Object Schemas

### User Object

```typescript
interface User {
  id: number;             // Auto-generated unique identifier
  name: string;           // Display name (2-50 chars, letters/spaces/hyphens)
  email: string;          // Email address (unique, validated format)
  password: string;       // bcrypt hashed password (min 8 chars original)
}
```

**Field Constraints:**

- `id`: Auto-incremented by JSON Server starting from 1
- `name`: 2-50 characters, supports letters, spaces, hyphens, apostrophes
- `email`: RFC 5322 compliant, max 254 characters, must be unique
- `password`: bcrypt hash with salt rounds (original min 8 chars with complexity requirements)

**Example:**

```json
{
  "id": 2,
  "name": "Abdulrahman Moussa",
  "email": "email@a.c",
  "password": "$2a$10$DonmYae.niD8JS8n2objSe6wAnOIOIstq1u/QgkRgukAcVBLBrNtu"
}
```

### Post Object

```typescript
interface Post {
  id: string;             // UUID (new) or timestamp (legacy)
  title: string;          // Post title (1-200 chars)
  content: string;        // Post content (1-10000 chars)
  image?: string;         // Optional image URL
  author: string;         // Author display name (from user.name)
  userId: number;         // Reference to user.id
  createdAt: string;      // ISO 8601 creation timestamp
  updatedAt?: string;     // ISO 8601 last update timestamp
  deletedAt?: string;     // ISO 8601 deletion timestamp
  editedAt?: string;      // ISO 8601 edit timestamp
  isDeleted: boolean;     // Soft delete flag (default: false)
  comments: Comment[];    // Array of embedded comments
}

interface Comment {
  id: string;             // Timestamp-based unique ID
  content: string;        // Comment text (1-1000 chars)
  userId: string;         // Reference to commenting user's ID
  userName: string;       // Display name of commenting user
  createdAt: string;      // ISO 8601 creation timestamp
}
```

**Field Constraints:**

- `id`: UUID v4 format for new posts, timestamp for legacy posts
- `title`: Non-empty, max 200 characters, required
- `content`: Non-empty, max 10000 characters, required
- `image`: Valid URL format or empty string, optional
- `isDeleted`: Boolean for soft deletion (preserves data integrity)
- `comments`: Array, can be empty, embedded in post document

## 🔌 API Endpoints

### Authentication Endpoints

```http
POST   /register         # Register new user
POST   /login           # User authentication
```

### Users Collection

```http
GET    /users           # Get all users (admin only)
GET    /users/:id       # Get user by ID
PUT    /users/:id       # Update user profile
DELETE /users/:id       # Delete user account
```

### Posts Collection

```http
GET    /posts           # Get all active posts
GET    /posts/:id       # Get specific post by ID
POST   /posts           # Create new post (auth required)
PUT    /posts/:id       # Update existing post (auth required)
PATCH  /posts/:id       # Partial update post (auth required)
DELETE /posts/:id       # Soft delete post (auth required)
```

### Advanced Query Parameters

#### Filtering

```http
GET /posts?userId=2                    # Posts by specific user
GET /posts?isDeleted=false            # Active posts only
GET /posts?author=Abdulrahman         # Posts by author name
```

#### Sorting & Pagination

```http
GET /posts?_sort=createdAt&_order=desc    # Sort by date (newest first)
GET /posts?_sort=title&_order=asc         # Sort by title alphabetically
GET /posts?_page=1&_limit=10              # Pagination (10 posts per page)
```

#### Search & Filtering

```http
GET /posts?q=retro                        # Full-text search
GET /posts?title_like=gaming              # Partial title match
GET /posts?createdAt_gte=2025-05-01       # Posts after date
```

#### Relationships

```http
GET /posts?_expand=user                   # Include user data
GET /users/2/posts                        # All posts by user ID 2
```

## ✅ Data Validation Rules

### User Validation (validation.ts)

#### Name Validation

- **Required**: Cannot be empty
- **Length**: 2-50 characters
- **Format**: Letters, spaces, hyphens, apostrophes only
- **Pattern**: No consecutive spaces
- **Regex**: `/^[a-zA-Z\s'-]+$/`

#### Email Validation

- **Required**: Cannot be empty
- **Format**: RFC 5322 compliant
- **Length**: Max 254 characters
- **Unique**: Must be unique across all users
- **Pattern**: No consecutive dots, proper domain structure

#### Password Validation

- **Length**: 8-128 characters
- **Complexity**: Must contain:
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one number
  - At least one special character
- **Security**: No common weak patterns (123456, qwerty, etc.)

### Post Validation

#### Content Validation

- **Title**: 1-200 characters, non-empty, required
- **Content**: 1-10000 characters, non-empty, required
- **Image**: Valid URL format or empty string
- **Author**: Must match creating user's name
- **UserId**: Must reference existing user

#### Comment Validation

- **Content**: 1-1000 characters, non-empty, required
- **UserId**: Must reference existing user
- **UserName**: Must match commenting user's name

## 📝 Example Data

### Complete User Example

```json
{
  "id": 2,
  "name": "Abdulrahman Moussa",
  "email": "email@a.c",
  "password": "$2a$10$DonmYae.niD8JS8n2objSe6wAnOIOIstq1u/QgkRgukAcVBLBrNtu"
}
```

### Complete Post Example

```json
{
  "id": "205a6293-6324-4ee4-9e32-6c93fa2f3d03",
  "title": "The Glorious Return of the Floppy Disk: More Than Just a Save Icon",
  "content": "In the age of cloud storage and terabyte drives...",
  "image": "https://images.unsplash.com/photo-1652195019227-4f3d3f599959",
  "author": "Abdulrahman Moussa",
  "userId": 2,
  "createdAt": "2025-05-28T10:16:02.325Z",
  "isDeleted": false,
  "comments": [
    {
      "id": "1748433965243",
      "content": "something test",
      "userId": "2",
      "userName": "Abdulrahman Moussa",
      "createdAt": "2025-05-28T12:06:05.243Z"
    }
  ]
}
```

### Soft-Deleted Post Example

```json
{
  "id": "1748618636980",
  "title": "test",
  "content": "t",
  "author": "test",
  "userId": 9,
  "createdAt": "2025-05-30T15:23:56.981Z",
  "isDeleted": true,
  "deletedAt": "2025-05-30T15:24:32.876Z",
  "comments": []
}
```

## ⚙️ Setup Instructions

### 1. Prerequisites

```bash
# Install Node.js (v16 or higher)
node --version

# Install Dependencies
npm install
```

### 2. Start the Database Server

```bash
# Start without watch (faster)
npm run server
```

### 3. Environment Configuration

#### Server Configuration

- **Base URL**: `http://localhost:3000`
- **Users endpoint**: `http://localhost:3000/users`
- **Posts endpoint**: `http://localhost:3000/posts`
- **Auth endpoints**: `http://localhost:3000/register`, `http://localhost:3000/login`

## 🛡️ Authentication & Security

### Password Security

- **Hashing**: bcrypt with 10 salt rounds
- **Storage**: Never store plain text passwords
- **Validation**: Complex password requirements enforced

### JWT Token Authentication

```typescript
// Login response includes JWT token
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Abdulrahman Moussa",
    "email": "email@a.c"
  }
}
```
