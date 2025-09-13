// AFTER REFACTOR: Efficient vote handler for a polling app
// Key improvements:
// - Avoids deep-cloning the entire polls array (alloc-heavy)
// - Performs a single pass to find previous vote and target option
// - Uses structural sharing: only clones the objects/arrays that change
// - Preserves behavior: one vote per user per poll, move vote if changed

import type { Poll } from "./voteHandler-before";

/**
 * recordVote
 * Efficient, immutable update of a user's vote within a poll.
 *
 * Complexity improvements vs naive:
 * - O(P) to locate poll by id, O(O + V) within the poll to discover prior/target
 * - Avoids O(N) dataset deep-clone; only touches the specific poll and options
 */
export function recordVote(
  polls: Poll[],
  pollId: string,
  optionId: string,
  userId: string
): Poll[] {
  // Locate poll index (O(P))
  const pollIndex = polls.findIndex((p) => p.id === pollId)
  if (pollIndex === -1) return polls

  const poll = polls[pollIndex]

  // Single pass over options to find:
  // - current option (by optionId)
  // - any previous option where user has already voted
  let currentIdx = -1
  let previousIdx = -1

  for (let i = 0; i < poll.options.length; i++) {
    const opt = poll.options[i]
    if (opt.id === optionId) currentIdx = i
    // Early bail if both found, but still O(O) pass which is fine
    if (previousIdx === -1 && opt.voters && opt.voters.includes(userId)) {
      previousIdx = i
    }
    if (currentIdx !== -1 && previousIdx !== -1) break
  }

  if (currentIdx === -1) return polls // invalid option for this poll

  // If user already voted for the same option, no state change
  if (previousIdx === currentIdx) return polls

  // Prepare shallow copies only for changed structures
  const nextPolls = polls.slice()
  const nextOptions = poll.options.slice()

  // Clone the target option (we'll add the user)
  const target = { ...nextOptions[currentIdx] }
  target.voters = (target.voters || []).slice()

  // If the user voted elsewhere before, remove and decrement
  if (previousIdx !== -1) {
    const prev = { ...nextOptions[previousIdx] }
    prev.voters = (prev.voters || []).filter((v) => v !== userId)
    if (prev.votes > 0) prev.votes -= 1
    nextOptions[previousIdx] = prev
  }

  // Add vote to target if not already present (we know previousIdx !== currentIdx)
  if (!target.voters.includes(userId)) {
    target.voters.push(userId)
    target.votes += 1
  }
  nextOptions[currentIdx] = target

  // Write back updated poll
  const nextPoll = { ...poll, options: nextOptions }
  nextPolls[pollIndex] = nextPoll
  return nextPolls
}
