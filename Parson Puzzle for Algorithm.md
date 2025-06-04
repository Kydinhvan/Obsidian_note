
### Set up
logic-proof-webapp/
├── frontend/     # React app
└── backend/      # Express server

#### Set up frontend 
Create React App with TypeScript
```bash
cd frontend
npx create-react-app . --template typescript
```
- The `.` tells it to install the React app in the current folder.
- `npx` is a command that **downloads and runs** a package **without installing it globally**.
		It's part of **Node.js** (so it works once you've installed Node).
	- `create-react-app` automatically sets up a complete React project
	- `--template typescript` use the TypeScript template

Tailwind CSS Setup in Create React App
```bash
npm install -D tailwindcss@3.4.1 postcss@8 autoprefixer@10
npx tailwindcss init -p
```
This installs Tailwind CSS with the correct PostCSS version that works with `react-scripts`
1. Configure `tailwind.config.js` to tell tailwind scan your `src/` folder for classes to include in the CSS:
	```js 
	/** @type {import('tailwindcss').Config} */
	module.exports = {
	  content: [
	    "./src/**/*.{js,ts,jsx,tsx}",
	  ],
	  theme: {
	    extend: {},
	  },
	  plugins: [],
	};
```

---
Katex for Math Rendering
`npm install katex react-katex`

