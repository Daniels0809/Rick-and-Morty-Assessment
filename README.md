# Rick & Morty Bakery - Advanced Multiverse Registry

This project represents a comprehensive refactoring of a legacy application into a modern, scalable, and professional architecture using **Next.js 15**, **TypeScript**, and **Vanilla CSS**.

## 📝 Refactoring Report (Employability Assessment)

In compliance with the assessment objectives, the following technical findings and implemented solutions are detailed below.

### 1. Issues Detected in the Original Code
*   **Disorganized Architecture**: Components were scattered without a clear separation between business logic and presentation. There was an overreliance on client components where unnecessary.
*   **Typing Technical Debt**: Extensive use of `any` and a lack of interfaces for API contracts (Rick and Morty API), which invalidated the benefits of TypeScript.
*   **Non-existent State Management**: No handling for loading states (`loading`), network errors, or "no results" cases.
*   **Deficient API Logic**: Search was performed inefficiently, calling the API on every keystroke without debouncing, and pagination was not integrated with filters.
*   **Security and Session Leaks**: The authentication system was inconsistent, allowing access to protected routes due to weak client-side validation.

### 2. Technical Decisions and Justification
*   **Separation of Concerns (SoC)**:
    *   **Services**: `api.ts` was created to centralize HTTP requests, encapsulating `fetch` logic and error handling.
    *   **Components**: Pure components (`CharacterCard`, `StatsCard`) were modularized for easier reusability and testing.
    *   **Types**: Interfaces were centralized in `src/types` to ensure a single data contract throughout the app.
*   **Strict TypeScript Activation**: The compiler was configured to disallow implicit `any`, ensuring every piece of data from the multiverse is properly typed.
*   **Performance Optimization**: Implementation of a `useDebounce` hook for searches, reducing resource consumption on both the client and the API server.
*   **Professional UI/UX (Citadel Tech Theme)**: The generic design was replaced with an immersive interface, demonstrating aesthetic problem-solving capabilities without relying on third-party libraries (Pure Vanilla CSS).

### 3. Data Flow Improvements
*   **Synchronized Pagination**: The application now allows navigation through hundreds of API pages while keeping active name and status filters.
*   **Auth Guards**: Route protection logic was implemented in the Dashboard, automatically redirecting users if no valid session exists in `localStorage`.
*   **Real-time Feedback**: Users now receive visual confirmation via thematic loaders and descriptive messages when something goes wrong.

## 🚀 Key Features
*   **Interdimensional Dashboard**: Character monitoring with dynamic statistics.
*   **Advanced Filters**: Global search integrated with life status.
*   **Terminal System**: Functional login and registration with persistence.
    *   **Admin**: `admin@admin.com` / `123`
*   **Fixed & Fluid Design**: Fixed navbar with transparency and a professionally organized footer.

## 🛠️ Tech Stack
*   **Next.js 15 (App Router)**
*   **TypeScript (Strict Mode)**
*   **Vanilla CSS + Custom Properties**
*   **Rick and Morty API**

## 🔮 Future Improvement Proposals
1.  **Server Actions**: Implement authentication form submissions via Next.js Server Actions for enhanced security.
2.  **Context API**: Migrate the authentication state to a Context Provider to avoid manual `localStorage` checks in every component.
3.  **Unit Testing**: Add unit tests with Jest to ensure the continued correct operation of the API service.
4.  **Virtualization**: Implement list virtualization (windowing) if displaying thousands of records simultaneously is required.

---
*This project demonstrates not only the ability to program but also to think, analyze, and act like a professional developer when faced with legacy code.*
