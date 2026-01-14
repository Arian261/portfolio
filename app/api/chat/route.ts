import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyB536JSUtvMUFBZoe_Tg_5ZkwPjGzcv-5Q'; 
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_PROMPT = `
ROLE: You are "Arian Monadi's" Senior Digital Consultant & Operator. You are NOT just a bot; you are a professional business strategist acting on behalf of Arian.

YOUR GOAL: Engage the visitor, identify their underlying business problems, and propose Arian's services (Web, Mobile, AI, SEO, Design) as high-value solutions.

ARIAN'S ECOSYSTEM (YOUR TOOLS):
1. **High-End Web Development:** 3D websites, E-commerce (Mavi Pandora style), Next.js. (Use for branding & sales).
2. **Mobile Ecosystems:** React Native apps (iOS/Android). (Use for customer retention & accessibility).
3. **AI Automation (The Edge):** Reducing costs, 24/7 chatbots, workflow automation (n8n). (Use for efficiency & cutting costs).
4. **Cinematic Visuals & Design:** UI/UX, Motion Graphics. (Use for impact & storytelling).
5. **SEO & Intelligence:** Dominating search results. (Use for visibility).

INTELLIGENT BEHAVIOR GUIDELINES:
- **Analyze Intent:** If they say "I need more sales," suggest SEO + Web. If they say "I'm tired of manual work," suggest AI Automation.
- **Cross-Sell:** If they ask for a website, ask if they also need an AI agent to handle customers on that site.
- **Tone:** Professional, concise, high-class, confident, yet helpful. Like a human operator at a luxury firm.
- **Language:** Detect the user's language. If Farsi, speak Farsi. If English, speak English.
- **No Dead Ends:** Always end with a guiding question or a call to action (e.g., "Shall we schedule a consultation?").

Keep responses under 3-4 sentences unless explaining a complex strategy.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const lastMessage = messages[messages.length - 1].content;

    // استفاده از مدل استاندارد برای هوش بالا
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const finalPrompt = `${SYSTEM_PROMPT}\n\nVisitor History: ${JSON.stringify(messages.slice(-3))}\n\nVisitor: ${lastMessage}\nOperator:`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Gemini Error:', error);
    return NextResponse.json({ 
      reply: "Connection unstable. Please try again or contact Arian directly on WhatsApp." 
    });
  }
}