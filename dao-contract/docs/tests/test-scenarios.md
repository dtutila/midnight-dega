Test Case 1: Valid Payment Received
Description:
Ensure a transaction is received from a registered agent with the correct amount.
Requirements:

On-chain transaction with expected amount

Sender must be a registered agent

Test Case 2: Payment With Wrong Amount
Description:
Test behavior when a transaction is received from a valid sender but the amount is incorrect.
Requirements:

On-chain transaction with incorrect amount

Amount mismatch should be detected in off-chain logic

Test Case 3: Payment From Unknown Sender
Description:
Simulate a transaction from a wallet that has not registered as an agent.
Requirements:

On-chain transaction from unknown public key

Contract check for registration should fail

Test Case 4: No Payment Received
Description:
Validate system behavior when no transaction matching the criteria is found.
Requirements:

On-chain query returns no results

Should handle timeout or failure gracefully

Test Case 5: Valid Identity Match
Description:
Verify that the sender of the on-chain transaction matches the identity stored in the registration contract.
Requirements:

Transaction sender address equals registered identity for the agent

Test Case 6: Agent Not Registered
Description:
Validate that the system properly rejects a sender address that is not found in the registration contract.
Requirements:

Contract check returns no entry for the sender

Test Case 7: Sender Mismatch With Off-chain Session
Description:
Ensure the sender of the on-chain transaction does not match the off-chain session identity (e.g. mismatched agent pubkey).
Requirements:

Agent is registered but does not match the off-chain caller

Test Case 8: Duplicate Transaction Detection
Description:
Ensure the system detects and ignores repeated processing of the same transaction.
Requirements:

Track already-processed transaction IDs

Reject duplicates to avoid double processing

Test Case 9: Stale or Expired Transaction
Description:
Validate that old or out-of-window transactions are ignored.
Requirements:

Transaction timestamp or block number is older than allowed window

Must be checked at validation time

Test Case 10: Multiple Transactions From Same Sender
Description:
Check behavior when the same registered sender submits more than one transaction in the same flow (e.g. retry, duplicate payment).
Requirements:

Only one transaction should be accepted per context (e.g. per service request)