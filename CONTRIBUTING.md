# Contributing to x402 Solana SDK

Thank you for your interest in contributing to the x402 Solana SDK! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node.js version, OS, etc.)

### Suggesting Features

We love new ideas! Open an issue with:
- Clear description of the feature
- Use cases and benefits
- Potential implementation approach (if you have one)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests if applicable
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your fork (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Use meaningful variable names
- Keep functions focused and small

### Testing

- Add tests for new features
- Ensure existing tests pass
- Test on both devnet and mainnet-beta (with small amounts)

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/x402-solana-sdk.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run examples
npx tsx examples/client-agent.ts
npx tsx examples/server-api.ts
```

## Project Structure

```
/sdk          - Core SDK implementation
/shared       - Shared types and schemas
/examples     - Working examples
/client       - Documentation website
/server       - Express backend
```

## Questions?

Feel free to open an issue for any questions or join our Discord community.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
