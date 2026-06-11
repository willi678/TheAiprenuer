<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>TheAIpreneur | AI-Powered Entrepreneur Tools</title>
    <!-- Google Fonts & simple reset -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            margin: 0;
            background: #0A0A14;
        }
        /* custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #13132A;
        }
        ::-webkit-scrollbar-thumb {
            background: #6C3AFF;
            border-radius: 4px;
        }
        button {
            background: none;
            border: none;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <!-- React & ReactDOM (modern) -->
    <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/babel-standalone@6.26.0/babel.min.js"></script>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // ----- CONSTANTS (identical to original + synthetic post generator) -----
        const BRAND = {
            name: "TheAIpreneur",
            tagline: "Where Entrepreneurs Meet AI",
            mission: "Helping everyday entrepreneurs use AI to build faster, earn smarter, and live freer.",
            bios: {
                instagram: "🤖 AI tools & entrepreneur mindset\n💡 Building in public\n🚀 Helping you work smarter with AI\n👇 New video every week",
                twitter: "Entrepreneur using AI to build faster. Sharing what works (and what doesn't). Building in public → @TheAIpreneur",
                youtube: "TheAIpreneur teaches everyday entrepreneurs how to leverage AI tools to save time, build products, and grow income. New videos weekly.",
                tiktok: "AI tools for entrepreneurs 🤖💼 | Building in public | Tips that actually work",
                linkedin: "Founder & AI Strategist | I help entrepreneurs use AI tools to build smarter businesses. Follow for weekly insights on AI, startups & building in public.",
                facebook: "TheAIpreneur is your go-to community for entrepreneurs learning to use AI tools to grow faster. Tips, tutorials, and honest build-in-public stories.",
            },
            colors: {
                primary: "#6C3AFF",
                accent: "#00E5FF",
                dark: "#0A0A14",
                mid: "#13132A",
                light: "#F0EDFF",
                muted: "#8B8BAA",
            },
        };

        const CALENDAR = [
            { week: 1, theme: "Establish Who You Are", posts: [
                { day: "Mon", platform: "LinkedIn", type: "Text Post", idea: "Introduce yourself: who you are, why you started, what you'll share" },
                { day: "Tue", platform: "X (Twitter)", type: "Thread", idea: "5 AI tools I use every single day as an entrepreneur" },
                { day: "Wed", platform: "Instagram", type: "Reel", idea: "What is TheAIpreneur? 30-second channel trailer" },
                { day: "Thu", platform: "TikTok", type: "Video", idea: "POV: You just discovered AI can write your emails for you" },
                { day: "Fri", platform: "YouTube", type: "Long-form", idea: "Why every entrepreneur NEEDS to learn AI in 2025 (my story)" },
                { day: "Sat", platform: "Facebook", type: "Post", idea: "Share your YouTube video to Facebook page + group" },
            ]},
            { week: 2, theme: "Deliver Quick Wins", posts: [
                { day: "Mon", platform: "LinkedIn", type: "Carousel", idea: "7 AI tools under $20/month that replace expensive software" },
                { day: "Tue", platform: "X (Twitter)", type: "Thread", idea: "How I built a landing page in 2 hours using only AI tools" },
                { day: "Wed", platform: "Instagram", type: "Reel", idea: "Use this ChatGPT prompt to write a week of content in 10 mins" },
                { day: "Thu", platform: "TikTok", type: "Video", idea: "This AI tool saved me 5 hours this week (not ChatGPT)" },
                { day: "Fri", platform: "YouTube", type: "Long-form", idea: "Full workflow: How I run my business with AI (step by step)" },
                { day: "Sat", platform: "Facebook", type: "Post", idea: "Community question: What task do you hate most? AI can fix it." },
            ]},
            { week: 3, theme: "Build Social Proof", posts: [
                { day: "Mon", platform: "LinkedIn", type: "Story Post", idea: "A real win from this week using AI — numbers included" },
                { day: "Tue", platform: "X (Twitter)", type: "Thread", idea: "I used AI to write 30 days of content. Here's what happened." },
                { day: "Wed", platform: "Instagram", type: "Reel", idea: "Before vs After: My content process without AI vs with AI" },
                { day: "Thu", platform: "TikTok", type: "Video", idea: "React to a viral entrepreneur take with your AI lens" },
                { day: "Fri", platform: "YouTube", type: "Long-form", idea: "I gave AI my business idea — here's what it built in 1 hour" },
                { day: "Sat", platform: "Facebook", type: "Post", idea: "Share community poll: Which AI tool do you want me to review next?" },
            ]},
            { week: 4, theme: "Go Viral With Value", posts: [
                { day: "Mon", platform: "LinkedIn", type: "List Post", idea: "10 things I stopped doing when I started using AI" },
                { day: "Tue", platform: "X (Twitter)", type: "Thread", idea: "The AI entrepreneur stack: what I pay, what it does, what it replaced" },
                { day: "Wed", platform: "Instagram", type: "Reel", idea: "Watch me build a product using only AI tools (60 secs)" },
                { day: "Thu", platform: "TikTok", type: "Video", idea: "This one AI prompt made me $X — steal it" },
                { day: "Fri", platform: "YouTube", type: "Long-form", idea: "Month 1 recap: Followers, lessons, and what's coming next" },
                { day: "Sat", platform: "Facebook", type: "Post", idea: "Celebrate 1 month milestone with your audience" },
            ]},
        ];

        const PLATFORM_COLORS = {
            "Instagram": "#E1306C",
            "X (Twitter)": "#1DA1F2",
            "YouTube": "#FF0000",
            "TikTok": "#00E5FF",
            "LinkedIn": "#0077B5",
            "Facebook": "#1877F2",
        };

        const TABS = ["Brand", "Strategy", "Calendar", "Post Writer"];

        // ---------- realistic post simulator (no API key needed) ----------
        const generateMockPost = (topic, platform, goal) => {
            const goals = {
                Educate: "teach you something useful",
                Inspire: "push you to take action",
                Entertain: "make you smile while learning",
                Convert: "get you to try a tool"
            };
            const goalPhrase = goals[goal] || "share value";

            const platformTemplates = {
                "X (Twitter)": `🧵 THREAD: ${topic}\n\n1/${topic} isn't just hype – it's changing how entrepreneurs work. Let me break down what actually works.\n\n2/ I started using ${topic} 3 months ago. Saved 8+ hours/week on repetitive tasks.\n\n3/ The biggest myth: you need to be technical. Wrong. Here's the 3-step framework:\n• Step 1: Define the outcome\n• Step 2: Pick the right AI tool\n• Step 3: Iterate with prompts\n\n4/ Example: last week I built [specific result] in under 20 mins.\n\n5/ Your turn: What's one task you'd automate first? 👇\n\n6/ Follow @TheAIpreneur for daily AI workflows. Repost to help others build smarter.`,
                "Instagram": `${topic} 🔥\n\nLet's be real – most people overcomplicate AI.\n\nHere’s the truth: you don't need a PhD. You just need 3 simple habits:\n\n✨ Start small – automate one boring task\n✨ Use plain English prompts\n✨ Remix – don't start from zero\n\nI used ${topic} to write this caption in 10 seconds. Save this for later.\n\nWhich AI tool do you use daily? Comment below 👇\n\n#AIforEntrepreneurs #TheAIpreneur #AItools #BuildInPublic #productivityhacks`,
                "LinkedIn": `🚨 Stop overthinking AI. Here's what ${topic} actually means for founders:\n\nI wasted months trying to perfect my AI workflow. Then I realized: speed > perfection.\n\nHere's the simple framework that works:\n→ Identify one repetitive task\n→ Find an AI tool that solves it\n→ Test, tweak, repeat\n\nThis week alone, I used ${topic} to:\n✅ Write 5 emails in 6 minutes\n✅ Summarize 3 client calls\n✅ Draft this post (took 12 seconds)\n\nAsk yourself: what's one thing you'd automate if you had the time?\n\nLet's discuss in comments 👇\n\n#AI #Entrepreneurship #TheAIpreneur`,
                "TikTok": `[HOOK: 3 sec] POV: You just discovered ${topic} 🤯\n\n[0:03-0:10] Most entrepreneurs are sleeping on this.\n[0:10-0:20] Here’s how I use it daily → saves 2 hours every morning.\n[0:20-0:28] Prompt I use: "Act as my AI assistant..."\n[0:28-0:35] One small change → massive output.\n\n🎵 trending sound\n#aitools #entrepreneurhacks #theaipreneur\n\n👉 Follow for more AI workflows!`,
                "YouTube": `In this video, I break down exactly how I use ${topic} to grow my business faster.\n\n📌 TIMESTAMPS:\n0:00 - Why ${topic} matters\n1:30 - My exact setup\n3:45 - Real example (before vs after)\n6:20 - Mistakes to avoid\n8:10 - Actionable next steps\n\n🔑 3 KEY TAKEAWAYS:\n1. Start with your biggest time-waster\n2. Use AI to remix, not replace your brain\n3. Consistency > complexity\n\n#TheAIpreneur #AItools #Entrepreneurship\n\n📧 Join 3k+ readers: [link in bio]`,
                "Facebook": `Hey everyone! 👋\n\nLet's talk about ${topic}.\n\nI know AI feels overwhelming, but here's the truth: you already use it (Google Maps, spam filters, Grammarly). The next step is just being intentional.\n\nLast month I automated my entire invoice follow-up system. 4 hours/month → 4 minutes.\n\nWhat's ONE boring task you'd love to automate? Drop it below and I'll reply with an AI tool suggestion.\n\nLet's grow together 🚀\n\n— TheAIpreneur`
            };
            let base = platformTemplates[platform] || platformTemplates["LinkedIn"];
            // adjust goal tone slightly
            if (goal === "Inspire") base = base.replace(/teach you/, "inspire you to").replace(/break down/, "show you the magic of");
            if (goal === "Entertain") base = "😂 Okay but seriously: " + base.slice(0, 200) + " 😎\n\n" + base.slice(200);
            return base;
        };

        // main component
        const TheAIpreneur = () => {
            const [activeTab, setActiveTab] = useState("Brand");
            const [selectedPlatform, setSelectedPlatform] = useState("instagram");
            const [postTopic, setPostTopic] = useState("");
            const [postPlatform, setPostPlatform] = useState("X (Twitter)");
            const [postGoal, setPostGoal] = useState("Educate");
            const [generatedPost, setGeneratedPost] = useState("");
            const [isGenerating, setIsGenerating] = useState(false);
            const [expandedWeek, setExpandedWeek] = useState(1);
            const [copied, setCopied] = useState("");
            const [isMobile, setIsMobile] = useState(false);

            useEffect(() => {
                const check = () => setIsMobile(window.innerWidth < 640);
                check();
                window.addEventListener("resize", check);
                return () => window.removeEventListener("resize", check);
            }, []);

            const copyText = (text, label) => {
                navigator.clipboard.writeText(text);
                setCopied(label);
                setTimeout(() => setCopied(""), 2000);
            };

            const generatePost = () => {
                if (!postTopic.trim()) {
                    setGeneratedPost("✏️ Please enter a topic first.");
                    return;
                }
                setIsGenerating(true);
                // simulate slight delay for realism
                setTimeout(() => {
                    const mock = generateMockPost(postTopic, postPlatform, postGoal);
                    setGeneratedPost(mock);
                    setIsGenerating(false);
                }, 600);
            };

            // styling object (same as original, but adapted as plain object)
            const s = {
                wrap: { fontFamily: "'Inter', sans-serif", background: "#0A0A14", minHeight: "100vh", color: "#F0EDFF" },
                header: { background: "linear-gradient(135deg, #13132A 0%, #1a1040 100%)", borderBottom: "1px solid #6C3AFF44", padding: isMobile ? "14px 16px" : "20px 24px" },
                headerInner: { maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 },
                logo: { width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: 10, background: "linear-gradient(135deg, #6C3AFF, #00E5FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 16 : 18, flexShrink: 0 },
                brandName: { fontWeight: 800, fontSize: isMobile ? 17 : 20, letterSpacing: "-0.5px" },
                tagline: { color: "#00E5FF", fontSize: isMobile ? 11 : 12, fontWeight: 500 },
                main: { maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 12px" : "0 24px" },
                tabBar: { display: "flex", gap: isMobile ? 2 : 4, padding: "12px 0", borderBottom: "1px solid #ffffff11", overflowX: "auto", scrollbarWidth: "none" },
                tab: (active) => ({
                    padding: isMobile ? "8px 12px" : "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                    fontWeight: 600, fontSize: isMobile ? 13 : 14, whiteSpace: "nowrap",
                    background: active ? "#6C3AFF" : "transparent",
                    color: active ? "#fff" : "#8B8BAA", transition: "all 0.2s", flexShrink: 0,
                }),
                section: { padding: isMobile ? "20px 0 40px" : "24px 0 48px" },
                h2: { fontSize: isMobile ? 18 : 22, fontWeight: 700, marginBottom: 4, marginTop: 0 },
                sub: { color: "#8B8BAA", marginBottom: 20, fontSize: 13, marginTop: 4 },
                card: { background: "#13132A", borderRadius: 12, padding: isMobile ? 14 : 20, marginBottom: 14 },
                label: { fontSize: 11, fontWeight: 700, color: "#8B8BAA", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 },
                copyBtn: { padding: "7px 14px", borderRadius: 8, border: "1px solid #6C3AFF44", background: "transparent", color: "#6C3AFF", fontWeight: 600, fontSize: 12, cursor: "pointer", marginTop: 10 },
                input: { width: "100%", background: "#0A0A14", border: "1px solid #ffffff22", borderRadius: 8, color: "#F0EDFF", padding: "12px 14px", fontSize: 14, lineHeight: 1.6, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
                select: { width: "100%", background: "#0A0A14", border: "1px solid #ffffff22", borderRadius: 8, color: "#F0EDFF", padding: "10px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" },
            };

            return React.createElement("div", { style: s.wrap },
                // header
                React.createElement("div", { style: s.header },
                    React.createElement("div", { style: s.headerInner },
                        React.createElement("div", { style: s.logo }, "🤖"),
                        React.createElement("div", null,
                            React.createElement("div", { style: s.brandName }, "TheAIpreneur"),
                            React.createElement("div", { style: s.tagline }, BRAND.tagline)
                        )
                    )
                ),
                React.createElement("div", { style: s.main },
                    // tabs
                    React.createElement("div", { style: s.tabBar },
                        TABS.map(tab => React.createElement("button", { key: tab, onClick: () => setActiveTab(tab), style: s.tab(activeTab === tab) }, tab))
                    ),
                    React.createElement("div", { style: s.section },
                        // Brand Tab
                        activeTab === "Brand" && React.createElement("div", null,
                            React.createElement("h2", { style: s.h2 }, "Brand Identity"),
                            React.createElement("p", { style: s.sub }, "Your visual identity, mission, and platform bios — ready to copy."),
                            React.createElement("div", { style: { background: "linear-gradient(135deg, #6C3AFF22, #00E5FF11)", border: "1px solid #6C3AFF44", borderRadius: 12, padding: isMobile ? 14 : 20, marginBottom: 14 } },
                                React.createElement("span", { style: s.label }, "Mission"),
                                React.createElement("div", { style: { fontSize: isMobile ? 14 : 16, fontWeight: 500, lineHeight: 1.6 } }, BRAND.mission)
                            ),
                            React.createElement("div", { style: s.card },
                                React.createElement("span", { style: s.label }, "Color Palette"),
                                React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
                                    Object.entries(BRAND.colors).map(([name, hex]) =>
                                        React.createElement("div", { key: name, style: { display: "flex", alignItems: "center", gap: 7 } },
                                            React.createElement("div", { style: { width: 28, height: 28, borderRadius: 7, background: hex, border: "1px solid #ffffff22" } }),
                                            React.createElement("div", null,
                                                React.createElement("div", { style: { fontSize: 12, fontWeight: 600 } }, name),
                                                React.createElement("div", { style: { fontSize: 11, color: "#8B8BAA" } }, hex)
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement("div", { style: s.card },
                                React.createElement("span", { style: s.label }, "Platform Bios"),
                                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 } },
                                    Object.keys(BRAND.bios).map(p =>
                                        React.createElement("button", { key: p, onClick: () => setSelectedPlatform(p), style: {
                                            padding: isMobile ? "5px 10px" : "6px 14px", borderRadius: 20, border: "1px solid",
                                            cursor: "pointer", fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                            borderColor: selectedPlatform === p ? "#6C3AFF" : "#ffffff22",
                                            background: selectedPlatform === p ? "#6C3AFF22" : "transparent",
                                            color: selectedPlatform === p ? "#6C3AFF" : "#8B8BAA",
                                        } }, p.charAt(0).toUpperCase() + p.slice(1))
                                    )
                                ),
                                React.createElement("div", { style: { background: "#0A0A14", borderRadius: 8, padding: 14, whiteSpace: "pre-line", fontSize: 14, lineHeight: 1.7 } }, BRAND.bios[selectedPlatform]),
                                React.createElement("button", { onClick: () => copyText(BRAND.bios[selectedPlatform], "bio"), style: s.copyBtn }, copied === "bio" ? "✓ Copied!" : "Copy Bio")
                            )
                        ),
                        // Strategy Tab
                        activeTab === "Strategy" && React.createElement("div", null,
                            React.createElement("h2", { style: s.h2 }, "90-Day Growth Strategy"),
                            React.createElement("p", { style: s.sub }, "Your roadmap from 0 to thousands of followers."),
                            ...[
                                { phase: "Month 1", title: "Plant the Flag", color: "#6C3AFF", items: [
                                    "Post 5–6x per week across all platforms",
                                    "Focus on introduction + quick-win content",
                                    "Repurpose every YouTube video into 4 short-form clips",
                                    "Engage with 10 creators in your niche daily",
                                    "Build your email list — offer a free AI tools cheatsheet",
                                    "Goal: 200–500 followers per platform",
                                ]},
                                { phase: "Month 2", title: "Build Authority", color: "#00E5FF", items: [
                                    "Start a weekly 'AI Tool of the Week' series",
                                    "Do 2 collabs or shoutout swaps with similar creators",
                                    "Post at least 1 viral-format post per week",
                                    "Launch a free community (Facebook Group or Discord)",
                                    "Double down on the platform showing best growth",
                                    "Goal: 1,000–2,000 followers per platform",
                                ]},
                                { phase: "Month 3", title: "Scale & Monetize", color: "#FF6B9D", items: [
                                    "Launch your first digital product (AI tools guide, template pack)",
                                    "Partner with 1–2 AI tool brands for sponsorships",
                                    "Start a weekly newsletter to own your audience",
                                    "Run a giveaway tied to following all your platforms",
                                    "Go live at least once — Q&A or tool walkthrough",
                                    "Goal: 5,000–10,000+ followers across platforms",
                                ]}
                            ].map(phase => 
                                React.createElement("div", { key: phase.phase, style: { ...s.card, borderLeft: `3px solid ${phase.color}` } },
                                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" } },
                                        React.createElement("div", { style: { background: phase.color + "22", color: phase.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 } }, phase.phase),
                                        React.createElement("div", { style: { fontWeight: 700, fontSize: isMobile ? 15 : 17 } }, phase.title)
                                    ),
                                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
                                        phase.items.map((item, i) => 
                                            React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start" } },
                                                React.createElement("div", { style: { color: phase.color, marginTop: 2, flexShrink: 0 } }, "→"),
                                                React.createElement("div", { style: { fontSize: 13, lineHeight: 1.5, color: "#D0CCFF" } }, item)
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement("div", { style: { background: "linear-gradient(135deg, #6C3AFF22, #00E5FF11)", border: "1px solid #6C3AFF33", borderRadius: 12, padding: isMobile ? 14 : 20 } },
                                React.createElement("div", { style: { fontWeight: 700, marginBottom: 8 } }, "🔑 The Golden Rule"),
                                React.createElement("div", { style: { fontSize: 13, lineHeight: 1.7, color: "#D0CCFF" } }, "Consistency beats perfection. One imperfect post published beats ten perfect posts never made. Show up every day for 90 days and the algorithm will reward you.")
                            )
                        ),
                        // Calendar Tab
                        activeTab === "Calendar" && React.createElement("div", null,
                            React.createElement("h2", { style: s.h2 }, "Content Calendar"),
                            React.createElement("p", { style: s.sub }, "4-week content plan. One post per platform per day."),
                            CALENDAR.map(week =>
                                React.createElement("div", { key: week.week, style: { background: "#13132A", borderRadius: 12, marginBottom: 10, overflow: "hidden" } },
                                    React.createElement("button", { onClick: () => setExpandedWeek(expandedWeek === week.week ? null : week.week), style: {
                                        width: "100%", padding: isMobile ? "14px" : "16px 20px", background: "transparent", border: "none", cursor: "pointer",
                                        display: "flex", justifyContent: "space-between", alignItems: "center", color: "#F0EDFF", gap: 8
                                    } },
                                        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
                                            React.createElement("div", { style: { background: "#6C3AFF", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 } }, `Week ${week.week}`),
                                            React.createElement("div", { style: { fontWeight: 600, fontSize: isMobile ? 13 : 15, textAlign: "left" } }, week.theme)
                                        ),
                                        React.createElement("div", { style: { color: "#8B8BAA", fontSize: 14 } }, expandedWeek === week.week ? "▲" : "▼")
                                    ),
                                    expandedWeek === week.week && React.createElement("div", { style: { padding: isMobile ? "0 14px 14px" : "0 20px 20px" } },
                                        week.posts.map((post, i) =>
                                            React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderTop: "1px solid #ffffff0a" } },
                                                React.createElement("div", { style: { width: 30, flexShrink: 0, fontSize: 12, fontWeight: 700, color: "#8B8BAA", paddingTop: 3 } }, post.day),
                                                React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: PLATFORM_COLORS[post.platform] || "#6C3AFF", marginTop: 5, flexShrink: 0 } }),
                                                React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                                    React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 3, flexWrap: "wrap" } },
                                                        React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: PLATFORM_COLORS[post.platform] || "#6C3AFF" } }, post.platform),
                                                        React.createElement("span", { style: { fontSize: 11, color: "#8B8BAA", background: "#ffffff0a", padding: "1px 7px", borderRadius: 10 } }, post.type)
                                                    ),
                                                    React.createElement("div", { style: { fontSize: 13, color: "#D0CCFF", lineHeight: 1.5 } }, post.idea)
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        // POST WRITER TAB (simulated but fully functional)
                        activeTab === "Post Writer" && React.createElement("div", null,
                            React.createElement("h2", { style: s.h2 }, "AI Post Writer"),
                            React.createElement("p", { style: s.sub }, "Generate platform‑optimised content instantly (simulated AI – ready to use without API key)."),
                            React.createElement("div", { style: s.card },
                                React.createElement("div", { style: { marginBottom: 14 } },
                                    React.createElement("div", { style: s.label }, "Topic / Idea"),
                                    React.createElement("textarea", { rows: 2, placeholder: "e.g., How to use ChatGPT for market research", value: postTopic, onChange: e => setPostTopic(e.target.value), style: s.input })
                                ),
                                React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 } },
                                    React.createElement("div", { style: { flex: 1, minWidth: 140 } },
                                        React.createElement("div", { style: s.label }, "Platform"),
                                        React.createElement("select", { value: postPlatform, onChange: e => setPostPlatform(e.target.value), style: s.select },
                                            ["X (Twitter)", "Instagram", "LinkedIn", "TikTok", "YouTube", "Facebook"].map(p => React.createElement("option", { key: p, value: p }, p))
                                        )
                                    ),
                                    React.createElement("div", { style: { flex: 1, minWidth: 140 } },
                                        React.createElement("div", { style: s.label }, "Goal"),
                                        React.createElement("select", { value: postGoal, onChange: e => setPostGoal(e.target.value), style: s.select },
                                            ["Educate", "Inspire", "Entertain", "Convert"].map(g => React.createElement("option", { key: g, value: g }, g))
                                        )
                                    )
                                ),
                                React.createElement("button", { onClick: generatePost, style: { background: "#6C3AFF", border: "none", borderRadius: 30, padding: "10px 20px", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 18 } }, 
                                    isGenerating ? "Generating..." : "✍️ Generate Post"
                                ),
                                generatedPost && React.createElement("div", null,
                                    React.createElement("div", { style: { background: "#0A0A14", borderRadius: 8, padding: 16, whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.6, border: "1px solid #6C3AFF33" } }, generatedPost),
                                    React.createElement("button", { onClick: () => copyText(generatedPost, "generatedPost"), style: s.copyBtn }, copied === "generatedPost" ? "✓ Copied!" : "Copy to Clipboard")
                                )
                            ),
                            React.createElement("div", { style: { background: "#13132A44", borderRadius: 12, padding: 14, border: "1px dashed #6C3AFF66", textAlign: "center", fontSize: 12, color: "#8B8BAA" } },
                                "💡 Tip: You can edit the generated post right here before copying. This mock AI works offline — no API key required."
                            )
                        )
                    )
                )
            );
        };

        ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(TheAIpreneur));
    </script>
</body>
</html>
