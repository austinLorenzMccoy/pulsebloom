// BEFORE SNAPSHOT: Naive vote handler for a polling app
// Intentionally inefficient for demonstration: deep-clones entire dataset,
// performs repeated linear scans, and manipulates arrays in ways that are O(n^2) in worst-cases.

export type Option = {
  id: string
  text: string
  votes: number
  voters: string[] // list of userIds who voted for this option
}

export type Poll = {
  id: string
  question: string
  options: Option[]
}

/**
 * recordVoteNaive
 * - Deep clones the entire polls array (expensive)
 * - Scans linearly for poll, option, and user across all options
 * - Removes old vote by scanning all options and filtering voters arrays
 * - Re-adds the user to the chosen option
 *
 * Behavior:
 * - A user can have at most one vote per poll
 * - If the user has voted before in the poll, their previous vote is removed and replaced
 */
export function recordVoteNaive(
  polls: Poll[],
  pollId: string,
  optionId: string,
  userId: string
): Poll[] {
  // Deep clone entire dataset (O(N) memory/time)
  const next = JSON.parse(JSON.stringify(polls)) as Poll[]

  // Find the poll (O(P))
  const poll = next.find((p) => p.id === pollId)
  if (!poll) return next

  // Find the target option (O(O))
  const option = poll.options.find((o) => o.id === optionId)
  if (!option) return next

  // Determine if user already voted somewhere in this poll (O(P*O*V))
  let previousOptionIndex = -1
  for (let i = 0; i < poll.options.length; i++) {
    const voters = poll.options[i].voters
    if (voters && voters.indexOf(userId) !== -1) {
      previousOptionIndex = i
      break
    }
  }

  // If user voted previously, remove and decrement votes (O(V) + O(1))
  if (previousOptionIndex !== -1) {
    const prev = poll.options[previousOptionIndex]
    prev.voters = prev.voters.filter((v) => v !== userId) // O(V)
    if (prev.votes > 0) prev.votes -= 1
  }

  // Add vote to the selected option (O(1) amortized push)
  if (option.voters.indexOf(userId) === -1) {
    option.voters.push(userId)
    option.votes += 1
  }

  return next
}
