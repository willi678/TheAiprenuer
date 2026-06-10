import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  post?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic, platform, goal } = req.body;

  if (!topic || !topic.trim()) {
    return res.status(400).json({ error: "Topic is required" });
  }

  // Platform-specific writing guides (same as original)
  const platformGuide: Record<string, string> = {
    "X (Twitter)":
      "a punchy Twitter/X thread with 5-7 tweets, each under 280 characters. Start with a hook tweet, end with a CTA to follow @TheAIpreneur.",
    Instagram:
      "an Instagram caption under 200 words with line breaks, 1-2 emojis per paragraph, and 10 relevant hashtags at the end.",
    LinkedIn:
      "a LinkedIn post with a bold opening line, 3-5 short paragraphs, personal tone, and a question at the end to drive comments.",
    TikTok:
      "a TikTok video script with a 3-second hook, main content in bullet points, and a CTA to follow TheAIpreneur.",
    YouTube:
      "a YouTube video description: one punchy paragraph summary, 5 timestamps, 3 key takeaways, and SEO tags.",
    Facebook:
      "a Facebook post that's conversational, 100-150 words, ends with a question, and feels like it's from a real person sharing a story.",
  };

  const guide = platformGuide[platform] || platformGuide["LinkedIn"];

  const prompt = `You are TheAIpreneur — a bold, practical, no-fluff content creator who helps entrepreneurs use AI to build faster and earn smarter. Your tone is confident, direct, and inspiring without being hype-y.

Write ${guide}

Topic: "${topic}"
Goal: ${goal} the audience

Brand voice rules:
- Speak like a smart friend, not a guru
- Lead with value, not ego
- Use real examples and numbers where possible
- End every post with momentum toward following TheAIpreneur`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307", // cheapest & fast – you can change to sonnet
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API error:", data);
      return res.status(500).json({ error: "AI service error. Check API key or quota." });
    }

    const postText = data.content?.[0]?.text || "Unable to generate post. Please try again.";
    res.status(200).json({ post: postText });
  } catch (error) {
    console.error("Request failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
                      }
