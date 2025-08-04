# **App Name**: PhishGuard

## Core Features:

- Main Menu: Main menu with navigation to 'Game', 'News', and 'Report Phish' modules.
- Phishing Game: Presents simulated email/SMS phishing attempts in a quiz-like game format.
- Phishing Detection: Analyzes user input (email/SMS content) using the Gemini API to determine if it is a phishing attempt.  Gemini will act as a tool deciding when elements of the provided text indicate a phishing attempt.
- Score Tracking: Provides a score based on correct identification of phishing attempts within the game.
- USOM News Feed: Displays news fetched from USOM (National Cyber Incident Response Center) via API.
- Manual Report: Allows users to manually input email or SMS content for phishing analysis.

## Style Guidelines:

- Primary color: A vibrant safety-orange (#FF6B00) to convey security and alertness.
- Background color: A light, desaturated tint of the primary color, like (#FFD5B3), to keep the UI bright but not overpowering.
- Accent color: A contrasting teal (#008080) for interactive elements and calls to action, offering balance.
- Font: 'Inter' (sans-serif) for a modern, clean, and readable interface. Suitable for both headlines and body text.
- Use clear, simple icons from a set like FontAwesome to represent different modules and actions.
- A clean, modern layout with a sidebar navigation for the modules and a main content area.  The modules are 'Game', 'News', and 'Report Phish'.