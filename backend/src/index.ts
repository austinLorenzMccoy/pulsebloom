import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// In-memory store for demo purposes (replace with database in production)
let polls: Record<string, any> = {};

// Authentication middleware
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  // For development/testing only - allow test token
  if (process.env.NODE_ENV === 'development') {
    const testToken = req.headers.authorization?.split(' ')[1];
    if (testToken === 'test-token-123') {
      (req as any).user = { id: 'test-user-id' };
      return next();
    }
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Attach user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "pulsebloom-backend" });
});

// Cast a vote on a poll
app.post("/api/polls/:pollId/vote", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { pollId } = req.params;
    const { optionId } = req.body;
    const userId = (req as any).user.id;

    if (!optionId) {
      return res.status(400).json({ error: 'optionId is required' });
    }

    // In a real app, this would be a database operation
    if (!polls[pollId]) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const poll = polls[pollId];
    const option = poll.options.find((opt: any) => opt.id === optionId);
    
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    // Remove user's vote from any other options in this poll
    poll.options.forEach((opt: any) => {
      if (opt.voters && opt.voters.includes(userId)) {
        opt.votes = Math.max(0, opt.votes - 1);
        opt.voters = opt.voters.filter((voterId: string) => voterId !== userId);
      }
    });

    // Add vote to selected option
    option.votes = (option.votes || 0) + 1;
    if (!option.voters) {
      option.voters = [];
    }
    option.voters.push(userId);

    // Update last modified
    poll.updated_at = new Date().toISOString();

    // In a real app, save to database here
    polls[pollId] = poll;

    res.json(poll);
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).json({ error: 'Failed to cast vote' });
  }
});

// Get poll results
app.get("/api/polls/:pollId/results", async (req: Request, res: Response) => {
  try {
    const { pollId } = req.params;

    // In a real app, this would be a database query
    const poll = polls[pollId];
    
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Return poll without voter details for security
    const { options, ...pollData } = poll;
    const sanitizedOptions = options.map(({ voters, ...option }: any) => option);
    
    res.json({
      ...pollData,
      options: sanitizedOptions
    });
  } catch (error) {
    console.error('Error fetching poll results:', error);
    res.status(500).json({ error: 'Failed to fetch poll results' });
  }
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
  
  // Initialize with a sample poll for testing
  polls['sample-poll'] = {
    id: 'sample-poll',
    question: 'Which framework do you prefer?',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    options: [
      { id: 'option-1', text: 'React', votes: 0 },
      { id: 'option-2', text: 'Vue', votes: 0 },
      { id: 'option-3', text: 'Angular', votes: 0 },
    ]
  };
});
