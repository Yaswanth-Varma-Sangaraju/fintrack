import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
dotenv.config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export const getAdviceFromClaude = async (categories) => {
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_claude_api_key') {
        return "Configure your Anthropic API Key for real advice.\nMock Tip 1: Cook more at home.\nMock Tip 2: Take public transport.";
    }

    try {
        const prompt = `I spent most on ${categories.join(', ')} this month. Give me 3 practical money-saving tips as 3 short bullet points. Be specific and actionable. Return only the 3 bullet points.`;

        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 200,
            messages: [{ role: "user", content: prompt }]
        });

        // Parse format from message
        return msg.content[0].text;
    } catch (error) {
        console.error("Claude API Error:", error);
        throw new Error('Failed to get AI advice');
    }
};
