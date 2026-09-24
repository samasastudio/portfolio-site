---
name: github-projects-sync
description: Query, inspect, and synchronize GitHub Projects v2 boards and issue trackers using the GitHub CLI (`gh`). Use when updating project tickets, tracking PR progress, or syncing local ticket specs with remote boards.
---

# GitHub Projects v2 CLI Synchronization Workflow

Standardized procedures for interacting with GitHub Projects v2 boards using the `gh` CLI. Governs status updates, item linking, and local ticket synchronization.

---

## 1. Core Principles & Constraints

1. **Explicit Option IDs**: Single-select fields (e.g. `Status`) require their exact opaque `option-id`, not plain text names. Always inspect fields before updating.
2. **Atomic Item Updates**: `gh project item-edit` mutates one field per invocation.
3. **Dual Synchronization**: When updating a GitHub project item, ensure the local master ticket specification (e.g., `docs/tickets/*.md`) reflects the identical status.
4. **Windows Shell Discipline**: When formatting CLI commands in Windows PowerShell, avoid bash-style subshell expansions or unescaped `${}` interpolations.

---

## 2. Standard Discovery & Mutation Commands

### Step 1: Discover Projects
```bash
# List all user/org projects with IDs and numbers
gh project list --owner <owner> --format json
```

### Step 2: Inspect Fields & Single-Select Option IDs
```bash
# Get field IDs and option IDs (e.g. Status: Todo / In Progress / Done)
gh project field-list <project-number> --owner <owner> --format json
```
*Key outputs to record: Project ID (`PVT_...`), Status Field ID (`PVTSSF_...`), Option IDs (`Done: 98236657`, etc.).*

### Step 3: Query Project Items & Draft Issues
```bash
# List all items, draft issues, and item IDs
gh project item-list <project-number> --owner <owner> --format json --limit 50
```
*Locate the target Item ID (`PVTI_...`).*

### Step 4: Update Item Status
```bash
# Update item status to Done / In Progress / Todo
gh project item-edit \
  --id <item-id> \
  --project-id <project-id> \
  --field-id <status-field-id> \
  --single-select-option-id <option-id>
```

### Step 5: Link Pull Request or Issue to Board
```bash
# Add a PR or Issue URL directly to the project board
gh project item-add <project-number> --owner <owner> --url <pr-or-issue-url>
```

---

## 3. Reference: Project 2 (Gridlock) Configuration

| Resource | Identifier / Value |
| :--- | :--- |
| **Owner** | `samasastudio` |
| **Project Number** | `2` (`https://github.com/users/samasastudio/projects/2`) |
| **Project ID** | `PVT_kwHOA0quHM4Bj3Lf` |
| **Status Field ID** | `PVTSSF_lAHOA0quHM4Bj3Lfzhip9oc` |
| **Option: Todo** | `f75ad846` |
| **Option: In Progress** | `47fc9ee4` |
| **Option: Done** | `98236657` |

---

## 4. Verification Checklist

- [ ] Status field option ID confirmed via `gh project field-list`.
- [ ] Item edit command executed with exit code 0.
- [ ] Verified updated item status via `gh project item-list`.
- [ ] Local ticket document (`docs/tickets/gridlock-implementation-tickets.md`) updated with matching `[x]` checkbox.
