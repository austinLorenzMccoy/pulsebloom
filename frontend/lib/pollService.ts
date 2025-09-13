import { createClient } from './supabase/client';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters?: string[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  created_at: string;
  updated_at: string;
}

export interface VoteRequest {
  pollId: string;
  optionId: string;
}

const API_BASE_URL = '/api';

/**
 * Casts a vote for a specific poll option
 * @param vote - Object containing pollId and optionId
 * @returns The updated poll data
 * @throws {Error} If the vote could not be cast
 */
export async function castVote(vote: VoteRequest): Promise<Poll> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('User must be authenticated to vote');
  }

  const response = await fetch(`${API_BASE_URL}/polls/${vote.pollId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ optionId: vote.optionId })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to cast vote');
  }

  return response.json();
}

/**
 * Retrieves poll results for a specific poll
 * @param pollId - The ID of the poll to get results for
 * @returns The poll data with current vote counts
 * @throws {Error} If the poll results could not be fetched
 */
export async function getPollResults(pollId: string): Promise<Poll> {
  const response = await fetch(`${API_BASE_URL}/polls/${pollId}/results`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch poll results');
  }

  return response.json();
}

// Example usage:
/*
async function exampleUsage() {
  try {
    // Cast a vote
    const updatedPoll = await castVote({
      pollId: '123',
      optionId: 'option-1'
    });
    console.log('Vote cast successfully:', updatedPoll);

    // Get updated results
    const results = await getPollResults('123');
    console.log('Current results:', results);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
*/
