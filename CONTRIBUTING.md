# Contributing to System Design Search Engine

Thank you for your interest in contributing to the **System Design Search Engine**! Whether it's adding new project prompts, fixing a UI bug, or improving documentation, your contributions help engineers worldwide learn through hands-on practice.

## 🚀 How to Contribute

### 1. Adding New Projects
The core of this application is the project data. To add a new system design challenge:
1. Open `src/data.ts`.
2. Locate the `PROJECTS` array.
3. Add your new object following the existing structure:
   ```typescript
   {
     id: 123,
     title: "Your Project Title",
     category: "Category Name", // Ensure this matches one of the existing CATEGORIES
     stack: ["React", "Node.js", "Redis"],
     description: "A short, engaging summary of the project.",
     prompt: "A detailed specification of what to build..."
   }
   ```
4. Verify your change by running `npm run dev` and checking the UI.

### 2. Reporting Bugs & Requesting Features
* **Bugs:** If you encounter a UI glitch or a search functionality error, please check the [Issues](https://github.com/sany2k8/system-design-search-engine/issues) page first to see if it’s already reported.
* **Features:** Have an idea for a new filter, theme, or UX improvement? Open an issue with a clear description of the desired behavior.

### 3. Improving UI/UX
We value responsiveness and accessibility. If you are improving the styling:
* **Styles:** We use Tailwind CSS. Ensure any new components follow the existing design language.
* **Responsiveness:** Test changes against mobile, tablet, and desktop breakpoints.

## 🛠 Development Workflow

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* `npm` or `yarn`

### Setup
1. **Fork** the repository to your GitHub account.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/system-design-search-engine.git
   cd system-design-search-engine
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a branch:**
   ```bash
   git checkout -b feature/your-awesome-feature
   ```

### Commands
* `npm run dev` - Start the local development server.
* `npx tsc --noEmit` - Check for type errors.
* `npm run build` - Create a production-ready build.

## 📝 Guidelines

* **Project Descriptions:** Ensure prompts are practical and achievable within 4-8 hours.
* **Code Style:** Keep code clean, modular, and type-safe (TypeScript).
* **Commit Messages:** Use clear, descriptive messages (e.g., `feat: add database migration project` or `fix: improve mobile responsiveness of project cards`).

## 🤝 Code of Conduct
By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and constructive in all interactions.

---

*Once your changes are ready, submit a Pull Request to the `main` branch. We will review it as soon as possible.*
