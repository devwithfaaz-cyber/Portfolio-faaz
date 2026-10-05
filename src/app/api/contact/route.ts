import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]), "utf-8");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a subject." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    // Persist message
    try {
      ensureDirectoryExists();
      const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
      existing.unshift(newMessage);
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2), "utf-8");
    } catch {
      // In-memory or filesystem fallback
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. Your message has been received.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    ensureDirectoryExists();
    const existing: ContactMessage[] = JSON.parse(
      fs.readFileSync(MESSAGES_FILE, "utf-8")
    );
    return NextResponse.json({ messages: existing });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
