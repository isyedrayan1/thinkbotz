# ThinkBotz Web

Welcome to the official website for **ThinkBotz** — the student association of the AIML Department at AITK, Kadapa.

This project is a modern, responsive web application built with **React**, **TypeScript**, and **Tailwind CSS**. It provides information about the association, showcases events, displays a dynamic gallery, and offers easy ways to contact the team.

---

## 🚀 Features

- **Home Page:**  
  Overview of the association, top upcoming events, and quick navigation.

- **About Page:**  
  Mission, vision, and a responsive, hierarchical display of the team (HOD, President, Treasurer, Technical, Coordinators).

- **Events Page:**  
  List and detail view of all events, with filtering for upcoming, completed, and featured events.

- **Gallery Page:**  
  Dynamic, section-based gallery grouped by event, supporting multiple images per event.

- **Contact Page:**  
  Contact form (sends to thinkbotz@gmail.com via user's email client), technical team contact, and all core contact info.

- **Responsive Design:**  
  Fully mobile-friendly and accessible.

- **Modern UI:**  
  Built with Tailwind CSS and Lucide icons for a clean, modern look.

---

## 📁 Project Structure

```
src/
  components/
    layout/         # Layout components (Footer, Header, etc.)
    sections/       # Section components (e.g., eventsSection)
    ui/             # UI primitives (Button, Card, etc.)
  pages/
    About.tsx       # About page
    Contact.tsx     # Contact page
    Events.tsx      # Events listing page
    EventDetail.tsx # Event detail page
    Gallery.tsx     # Gallery page
  App.tsx           # Main app entry
  index.tsx         # React entry point
  index.css         # Tailwind CSS
```

---

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/thinkbotz.git
   cd thinkbotz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:8000
   ```

---

## 📝 Customization

- **Team & Hierarchy:**  
  Update `src/pages/About.tsx` to change team members or hierarchy.

- **Events:**  
  Add or edit events in `src/pages/EventDetail.tsx` and `src/pages/Events.tsx`.

- **Gallery:**  
  Add new event sections and images in `src/pages/Gallery.tsx`.

- **Contact Info:**  
  Update contact details in `src/pages/Contact.tsx`.

---

## 👨‍💻 Technical Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

---

## ✨ Credits

Website created by [Syed Rayan](https://isyedrayan.online)  
Technical Team – ThinkBotz

---

## 📄 License

This project is for educational and organizational use by ThinkBotz.  
For other uses, please contact
