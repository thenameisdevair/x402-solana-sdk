import { CodeBlock } from '../CodeBlock';

const sampleCode = `import { x402Fetch } from '@x402/solana-sdk';

const response = await x402Fetch('https://api.example.com/data', {
  wallet: yourWallet,
  network: 'mainnet-beta'
});`;

export default function CodeBlockExample() {
  return (
    <div className="p-8 max-w-2xl">
      <CodeBlock code={sampleCode} language="typescript" />
    </div>
  );
}
