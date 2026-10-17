import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { sampleTrips } from './src/data/sampleTrips.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes

// 1. Get Curated Sample Trips
app.get('/api/sample-trips', (_req, res) => {
  res.json({ success: true, trips: sampleTrips });
});

// 2. Generate Full Trip Plan
app.post('/api/generate-trip', async (req, res) => {
  try {
    const {
      destination,
      durationDays = 5,
      travelGroup = 'couple',
      budgetLevel = 'moderate',
      pace = 'balanced',
      interests = [],
      dietary = '',
      specialPreferences = '',
      startDate = '',
    } = req.body;

    if (!destination || typeof destination !== 'string') {
      return res.status(400).json({ success: false, error: 'Destination is required' });
    }

    const clampedDays = Math.max(1, Math.min(Number(durationDays) || 5, 14));

    const prompt = `
Create an extraordinarily detailed, realistic, and inspiring ${clampedDays}-day travel itinerary for "${destination}".

User Specifications:
- Duration: ${clampedDays} days
- Travel Party: ${travelGroup}
- Budget Tier: ${budgetLevel}
- Pace: ${pace}
- Specific Interests: ${interests.length > 0 ? interests.join(', ') : 'Must-see landmarks, local culture, hidden gems, culinary experiences'}
- Dietary Needs: ${dietary || 'None specified'}
- Custom Notes / Requests: ${specialPreferences || 'None'}
- Travel Timing: ${startDate || 'Optimal season'}

Please return a valid JSON object matching EXACTLY this structure:
{
  "title": "Creative catchy trip title",
  "destination": "${destination}",
  "tagline": "Inspiring subtitle",
  "summary": "Engaging 2-3 sentence overview highlighting what makes this trip special",
  "durationDays": ${clampedDays},
  "travelGroup": "${travelGroup}",
  "budgetLevel": "${budgetLevel}",
  "pace": "${pace}",
  "bestTimeToVisit": "Best months and seasons to visit",
  "weatherForecast": {
    "summary": "Weather overview during this season",
    "tempRange": "e.g. 18°C - 26°C (64°F - 79°F)",
    "clothingAdvice": "Key clothing suggestions"
  },
  "currency": {
    "code": "e.g. JPY / EUR / USD",
    "symbol": "e.g. ¥ / € / $",
    "rateDescription": "Quick exchange rate summary or payment tip"
  },
  "estimatedBudget": {
    "totalMinUSD": 1200,
    "totalMaxUSD": 1800,
    "categories": [
      { "category": "Accommodation", "amountUSD": 600, "percentage": 40, "note": "Mid-tier boutique stays" },
      { "category": "Food & Dining", "amountUSD": 450, "percentage": 30, "note": "Local specialties & casual dining" },
      { "category": "Activities & Entry", "amountUSD": 250, "percentage": 15, "note": "Passes, temples, museum tickets" },
      { "category": "Local Transit", "amountUSD": 100, "percentage": 8, "note": "Metro passes and short taxis" },
      { "category": "Emergency & Misc", "amountUSD": 100, "percentage": 7, "note": "Souvenirs, snacks, buffer" }
    ]
  },
  "days": [
    {
      "dayNumber": 1,
      "theme": "Catchy theme of the day",
      "neighborhood": "Key district or area name",
      "morning": {
        "title": "Activity name",
        "timeSlot": "09:00 AM - 12:00 PM",
        "duration": "3 hours",
        "location": "Specific place name with neighborhood",
        "description": "Engaging description with sensory details and why it fits the travel style",
        "category": "sightseeing", // one of: 'sightseeing', 'cultural', 'adventure', 'relaxation', 'food', 'shopping', 'photo'
        "estimatedCost": "$15 - $25 per person or Free",
        "highlights": ["Key highlight 1", "Key highlight 2"],
        "tips": "Pro tip to avoid queues or get the best view"
      },
      "afternoon": {
        "title": "Activity name",
        "timeSlot": "01:30 PM - 05:00 PM",
        "duration": "3.5 hours",
        "location": "Specific place name",
        "description": "Engaging description",
        "category": "cultural",
        "estimatedCost": "$10 or Free",
        "highlights": ["Highlight 1", "Highlight 2"],
        "tips": "Pro tip"
      },
      "evening": {
        "title": "Evening experience",
        "timeSlot": "06:30 PM - 09:30 PM",
        "duration": "3 hours",
        "location": "Specific place name",
        "description": "Atmospheric evening experience",
        "category": "relaxation",
        "estimatedCost": "$20",
        "highlights": ["Night view", "Local vibe"],
        "tips": "Reservation advice"
      },
      "meals": [
        {
          "mealType": "lunch",
          "name": "Restaurant / Market Name",
          "cuisine": "Local cuisine specialty",
          "estimatedCost": "$$",
          "description": "Why it's renowned and vibe",
          "location": "Neighborhood",
          "recommendedDishes": ["Dish 1", "Dish 2"]
        },
        {
          "mealType": "dinner",
          "name": "Dinner Venue Name",
          "cuisine": "Cuisine type",
          "estimatedCost": "$$$",
          "description": "Atmospheric dinner spot",
          "location": "Neighborhood",
          "recommendedDishes": ["Dish 1"]
        }
      ],
      "transportationTips": "Specific metro line, walking distance, or transit card advice for this day",
      "insiderTip": "A secret viewpoint, timing tip, or local habit"
    }
  ],
  "packingList": [
    {
      "category": "Essentials & Documents",
      "items": [
        { "id": "p1", "name": "Passport & Copies", "checked": false, "essential": true, "reason": "Required for travel" },
        { "id": "p2", "name": "Visa / Entry QR code", "checked": false, "essential": true }
      ]
    },
    {
      "category": "Clothing & Footwear",
      "items": [
        { "id": "p3", "name": "Comfortable Walking Shoes", "checked": false, "essential": true, "reason": "15,000+ daily steps" },
        { "id": "p4", "name": "Weather-appropriate layers", "checked": false }
      ]
    },
    {
      "category": "Electronics & Gear",
      "items": [
        { "id": "p5", "name": "Power Bank & Universal Adapter", "checked": false, "essential": true },
        { "id": "p6", "name": "eSIM or Pocket Wi-Fi", "checked": false }
      ]
    },
    {
      "category": "Health & Comfort",
      "items": [
        { "id": "p7", "name": "Reusable Water Bottle & Electrolytes", "checked": false }
      ]
    }
  ],
  "localEtiquetteAndTips": {
    "tippingCustoms": "Clear rule on tipping in this destination",
    "transportHighlights": "Best way to get around (Pass, rail, taxi app)",
    "culturalDoAndDonts": [
      "Do: Local respectful habit",
      "Do: Dining or greeting custom",
      "Don't: Common tourist faux pas"
    ],
    "emergencyNumbers": [
      { "name": "Police", "number": "110 / 911 / 112" },
      { "name": "Ambulance / Medical", "number": "119 / 112" }
    ],
    "usefulPhrases": [
      { "phrase": "Hello", "translation": "Local word", "pronunciation": "Phonetic" },
      { "phrase": "Thank you", "translation": "Local word", "pronunciation": "Phonetic" },
      { "phrase": "Excuse me / Please", "translation": "Local word", "pronunciation": "Phonetic" },
      { "phrase": "How much is this?", "translation": "Local word", "pronunciation": "Phonetic" }
    ]
  }
}

Ensure there are EXACTLY ${clampedDays} day items in the "days" array, each numbered 1 to ${clampedDays}.
Make recommendations genuine, specific (real streets, authentic places, real dishes), and practically routed so the traveler doesn't waste hours zig-zagging across the city.
Return ONLY valid JSON.
`;

    if (!apiKey) {
      // If API key is not configured, find matching sample or customize template
      console.warn('GEMINI_API_KEY is not set. Providing sample fallback.');
      const fallback = sampleTrips[0];
      return res.json({
        success: true,
        trip: {
          ...fallback,
          id: `trip_${Date.now()}`,
          destination: destination,
          title: `${clampedDays} Days Exploring ${destination}`,
          durationDays: clampedDays,
          createdAt: Date.now(),
        },
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      // Try stripping markdown blocks if present
      const cleaned = text.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
      parsed = JSON.parse(cleaned);
    }

    const tripPlan = {
      ...parsed,
      id: `trip_${Date.now()}`,
      destination: parsed.destination || destination,
      durationDays: parsed.days ? parsed.days.length : clampedDays,
      createdAt: Date.now(),
    };

    res.json({ success: true, trip: tripPlan });
  } catch (error: any) {
    console.error('Error generating trip:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate travel plan. Please try again.',
    });
  }
});

// 3. Trip Concierge Chat
app.post('/api/chat-concierge', async (req, res) => {
  try {
    const { message, tripContext, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    if (!apiKey) {
      return res.json({
        success: true,
        reply: `I'm your AI Travel Concierge! For ${tripContext?.destination || 'your destination'}, I recommend checking local transit apps, booking museum tickets in advance, and exploring local night markets.`,
        suggestions: ['Best coffee shops nearby', 'Transit pass options', 'Rainy day alternatives'],
      });
    }

    const contextStr = tripContext
      ? `You are an expert, friendly local travel concierge assisting a traveler currently viewing their trip to "${tripContext.destination}":
Trip title: "${tripContext.title}"
Travel party: ${tripContext.travelGroup}, Budget: ${tripContext.budgetLevel}, Duration: ${tripContext.durationDays} days.
Current itinerary highlights: ${tripContext.days?.map((d: any) => `Day ${d.dayNumber}: ${d.theme} (${d.neighborhood})`).join('; ')}.`
      : 'You are an expert worldwide AI Travel Concierge assisting travelers with vacation planning, hidden gems, packing tips, food advice, and logistics.';

    const systemInstruction = `${contextStr}
Provide helpful, concise, well-formatted advice with practical tips (pricing, timing, etiquette, specific names).
Respond in a friendly, enthusiastic, and knowledgeable tone.
Also provide 2 to 3 short follow-up questions or prompts the traveler might want to ask next.

Return JSON in this format:
{
  "reply": "Your markdown-formatted helpful response",
  "suggestions": ["Follow-up question 1", "Follow-up question 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `User asks: "${message}"\nPrevious conversation turns: ${JSON.stringify(history.slice(-4))}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        reply: text,
        suggestions: ['Tell me more', 'Any hidden gems?', 'What should I wear?'],
      };
    }

    res.json({
      success: true,
      reply: parsed.reply,
      suggestions: parsed.suggestions || [],
    });
  } catch (error: any) {
    console.error('Concierge chat error:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Concierge service temporarily unavailable.',
    });
  }
});

// 4. Swap or Customize an Activity
app.post('/api/swap-activity', async (req, res) => {
  try {
    const { destination, neighborhood, timeSlot, currentActivityTitle, userPreference } = req.body;

    if (!apiKey) {
      return res.json({
        success: true,
        activity: {
          title: `Alternative Experience in ${neighborhood || destination}`,
          timeSlot: timeSlot || '02:00 PM - 04:30 PM',
          duration: '2.5 hours',
          location: `${neighborhood || destination} Central Quarter`,
          description: `A handpicked alternative tailored to: ${userPreference || 'authentic local exploration'}. Enjoy scenic viewpoints and artisan shops.`,
          category: 'cultural',
          estimatedCost: '$10 - $20',
          highlights: ['Scenic atmosphere', 'Local artisan crafts'],
          tips: 'Visit during late afternoon for golden hour lighting.',
        },
      });
    }

    const prompt = `
Generate a replacement activity for a trip in "${destination}".
Context:
- Neighborhood / Area: ${neighborhood || 'City Center'}
- Time Slot: ${timeSlot || 'Afternoon'}
- Activity being replaced: "${currentActivityTitle || 'General Sightseeing'}"
- User preference / why they want to change it: "${userPreference || 'More unique, relaxed or local'}"

Provide a fresh, exciting alternative that fits into this schedule smoothly.
Return valid JSON:
{
  "title": "Activity Name",
  "timeSlot": "${timeSlot || 'Afternoon'}",
  "duration": "e.g. 2 hours",
  "location": "Specific place name with neighborhood",
  "description": "2-3 vivid sentences describing what to do and experience",
  "category": "cultural", // 'sightseeing' | 'cultural' | 'adventure' | 'relaxation' | 'food' | 'shopping' | 'photo'
  "estimatedCost": "e.g. Free or $15 per person",
  "highlights": ["Highlight 1", "Highlight 2"],
  "tips": "Practical tip for this spot"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, activity: parsed });
  } catch (error: any) {
    console.error('Swap activity error:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to replace activity' });
  }
});

// Start Server & Integrate Vite
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WanderAI Travel Planner running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
