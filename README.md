AI Content Transformer: Agentic Workflow Integration
A high-performance, full-stack AI application that leverages Next.js 14 and n8n to perform intelligent content transformations (summarization, social media formatting, and text simplification).

🏗️ Architecture Overview
This project follows a decoupled architecture to separate the user interface from the complex AI orchestration logic.

Frontend: Next.js (App Router) with Tailwind CSS for a responsive, "agentic" UI.

Orchestration Layer: n8n (Autonomous Agent Workflow) to manage LLM chaining and memory.

API Layer: Next.js Route Handlers act as a secure proxy to the n8n webhook, protecting internal workflow URLs and managing CORS.

Why this Architecture?
Rapid Iteration: By using n8n for the backend logic, I can update the AI's system prompt, swap LLM models (e.g., from GPT-4 to Claude), or add tools (like web scraping) in real-time without redeploying the frontend.

Maintainability: The frontend remains "dumb" and focused on UX, while the complex state management and prompt engineering are handled by a dedicated orchestration tool.

State Management: Leveraging n8n's Window Buffer Memory allows for persistent conversation context across sessions without manual database management in the Next.js layer.

🚀 Features
Multi-Action Processing: Specialized logic for summarization, tweet generation, and audience-specific rewriting.

Real-time Agentic Feedback: UI reflects the "Thinking" state of the backend agent.

Security First: API calls are proxied through a server-side route to prevent leaking the orchestration endpoint.

Adaptive Error Handling: Graceful handling of empty states and backend connection timeouts.

🛠️ Tech Stack
Framework: Next.js 14

Styling: Tailwind CSS

Icons: Lucide React

Orchestration: n8n

AI Model: OpenAI GPT-4o (via n8n)

🚦 Getting Started
Prerequisites
Node.js 18+

An active n8n workflow with a published webhook.

Installation
Clone the repository.

Install dependencies:

npm install
Configure your environment variables in .env.local:

Code snippet
   N8N_WEBHOOK_URL=https://your-instance.n8n.cloud/webhook/content-transform
Run the development server:

npm run dev
🧠 Technical Decisions & Challenges
The "Silent" Handshake
One challenge was ensuring the n8n Agent node correctly mapped incoming JSON variables. I implemented a robust Expression-based System Prompt in n8n that utilizes null-coalescing logic ({{ $json.body?.text || $json.text }}) to ensure the agent remains functional regardless of the payload structure.

UX for Latency
AI transformations have inherent latency. I implemented a CSS-based bounce-loader and disabled action buttons during the "pending" state to prevent race conditions and improve perceived performance.

🔮 Future Improvements
Streaming Responses: Implementing Server-Sent Events (SSE) for real-time word-by-word AI streaming.

URL Tooling: Integrating an HTTP Request tool in n8n to allow the agent to scrape and transform live web links.

Multi-Modal Support: Allowing users to upload images of text for OCR processing before transformation.