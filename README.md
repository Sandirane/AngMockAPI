# AngMockAPI

## Overview

**AngMockAPI** is an Angular 19 project that interacts with a RESTful API ([Mock API](https://mock-api.binaryboxtuts.com/)) to manage projects.  
It includes features such as user authentication, CRUD project management, and internationalization (i18n) using Transloco with English and French support. The UI is built with PrimeNG.

## Features

- **Authentication:** User registration and login using JWT-based authentication.
- **Project Management:** Create, read, update, and delete projects.
- **User Profiles:** View user profile information.
- **Internationalization (i18n):** Supports English and French using Transloco.
- **Route Guards:** Protects admin routes, accessible only by authenticated users.
- **Error Handling:** Centralized error display for better UX.

## Technologies Used

- [Angular 19](https://angular.io/)
- [PrimeNG](https://www.primefaces.org/primeng/)
- [PrimeFlex](https://www.primefaces.org/primeflex/)
- [Transloco](https://ngneat.github.io/transloco/) 

## Folder Structure
angmockapi/
├──src/
	├── index.html
	├── main.ts
	├── styles.css
	├── app/
		├── app.component.ts
		├── app.config.ts
		├── app.routes.ts
		├── core/
		│   ├── guards/
		│   ├── interceptor/
		├── models/
		│   └── services/
		├── feature/
		│   ├── about/
		│   ├── admin/
		│   ├── auth/
		│   ├── home/
		│   └── pagenotfound/
		└── shared/
			└── components/

## Setup Instructions

1. **Clone the repository**  
   `git clone https://github.com/Sandirane/AngMockAPI.git`
2. **Install dependencies**  
   `npm install`
3. **Run the development server**  
   `ng serve`
4. **Visit the app**  
   Open `http://localhost:4200/home` in your browser

## API Reference

This app uses a third-party mock RESTful API:  
[https://mock-api.binaryboxtuts.com](https://mock-api.binaryboxtuts.com)

## Demo Application

[https://angmockapi.web.app/home](https://angmockapi.web.app/home)

## 🧑‍💻 Author

Created by **Sandirane**  
[GitHub Profile](https://github.com/Sandirane)
