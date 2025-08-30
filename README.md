# ESLint File Ban Plugin

This project contains a custom ESLint plugin that allows you to ban specific files or file patterns from your codebase using glob patterns.

## Project Structure

```
├── rules/
│   ├── file-ban.plugin.mjs    # Plugin wrapper for the rule
│   └── file-ban.rule.mjs      # The file ban rule implementation
├── eslint.config.mjs          # ESLint configuration
└── package.json
```

## Plugin: `file-ban`

The `file-ban` plugin provides a rule that can ban files or directories based on glob patterns. This is useful for enforcing architectural constraints, preventing the use of deprecated files, or maintaining clean project structure.

### Rule: `file-ban/file-ban`

The rule accepts glob patterns as configuration and reports an error when files match those patterns.

### Configuration Options

The rule accepts a single option that can be either:

- **`string`**: A single glob pattern
- **`array`**: An array of glob patterns (minimum 1 item)

### Example Configuration

```javascript
// In eslint.config.mjs
rules: {
  "file-ban/file-ban": ["error", ["**/banned.js", "**/banned/*"]]
}
```

This configuration will ban:

- Any file named `banned.js` in any directory
- Any file or directory inside any `banned/` directory

### How It Works

The rule:

1. Runs on every JavaScript file during ESLint execution
2. Checks if the current file matches any of the configured glob patterns
3. Reports an error with the message "Filename is banned" if a match is found
4. Uses [micromatch](https://github.com/micromatch/micromatch) for glob pattern matching

### Example Usage

With the current configuration, the following files would trigger errors:

- `src/folder1/banned.js` - matches `**/banned.js`
- `src/folder3/banned.js` - matches `**/banned.js`
- `src/folder3/banned/index.js` - matches `**/banned/*`

While these files would pass:

- `src/folder2/accepted.js`
- `src/folder3/accepted.js`

### Running ESLint

```bash
# Check all JavaScript files
npx eslint .

# Check specific file
npx eslint src/folder1/banned.js
```

### Customizing the Rule

To modify the file ban patterns:

1. Update the configuration in `eslint.config.mjs`
2. Modify the `rules` section to include your desired glob patterns

Example patterns you might use:

- `**/legacy/**` - Ban all files in legacy directories
- `**/*.old.js` - Ban all files ending with `.old.js`
- `src/deprecated/**` - Ban all files in the deprecated source directory
- `**/vendor/**` - Ban all vendor files

## Development

This project uses:

- ESLint 9.x with flat config format
- [micromatch](https://github.com/micromatch/micromatch) for glob pattern matching
- pnpm as package manager

## Installation

```bash
# Install dependencies
pnpm install

# Run ESLint
pnpm lint
```

## Contributing

To extend the rule functionality:

1. Modify the `schema` in `file-ban.rule.mjs` to add new configuration options
2. Add logic in the `create` function to handle different validation scenarios
3. Update the plugin configuration in `eslint.config.mjs`
4. Test with various file patterns to ensure correct behavior
