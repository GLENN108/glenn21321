import { useState } from 'react'

interface EducationTopic {
  id: string
  title: string
  content: string
  icon: string
}

const Education = () => {
  const [activeTab, setActiveTab] = useState('basics')

  const educationTopics: EducationTopic[] = [
    {
      id: 'basics',
      title: 'Cryptocurrency Basics',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      content: `
        <h3 class="text-lg font-semibold mb-3">What is Cryptocurrency?</h3>
        <p class="mb-4">Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on a technology called blockchain. Unlike traditional currencies issued by governments (fiat currencies), cryptocurrencies are typically decentralized and operate on distributed networks.</p>
        
        <h3 class="text-lg font-semibold mb-3">Key Characteristics of Cryptocurrencies</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Decentralization:</strong> Most cryptocurrencies operate on decentralized networks using blockchain technology, meaning they're not controlled by a single entity like a central bank.</li>
          <li><strong>Limited Supply:</strong> Many cryptocurrencies have a capped supply (like Bitcoin's 21 million), creating scarcity that can affect value.</li>
          <li><strong>Transparency:</strong> Blockchain technology provides a public ledger where all transactions are recorded and can be verified.</li>
          <li><strong>Security:</strong> Cryptocurrencies use advanced cryptographic techniques to secure transactions and control the creation of new units.</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Common Cryptocurrency Terms</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Blockchain:</strong> A distributed digital ledger that records transactions across many computers.</li>
          <li><strong>Wallet:</strong> Software that stores private keys needed to access and manage your cryptocurrency.</li>
          <li><strong>Mining:</strong> The process of validating transactions and adding them to the blockchain, often rewarded with new coins.</li>
          <li><strong>Token:</strong> A unit of value issued by a blockchain project, which may represent assets or utilities beyond simple currency.</li>
          <li><strong>Altcoin:</strong> Any cryptocurrency other than Bitcoin.</li>
        </ul>
      `
    },
    {
      id: 'market',
      title: 'Market Analysis',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      content: `
        <h3 class="text-lg font-semibold mb-3">Understanding Cryptocurrency Market Analysis</h3>
        <p class="mb-4">Market analysis in cryptocurrency involves evaluating assets to make informed investment decisions. There are two primary approaches:</p>
        
        <h4 class="text-md font-semibold mb-2">Fundamental Analysis</h4>
        <p class="mb-4">Evaluates a cryptocurrency's intrinsic value based on:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Team & Development:</strong> The experience and track record of the development team.</li>
          <li><strong>Technology:</strong> The underlying technology, its uniqueness, and potential for solving real problems.</li>
          <li><strong>Adoption:</strong> Current usage, partnerships, and potential for mainstream adoption.</li>
          <li><strong>Tokenomics:</strong> Supply mechanisms, distribution, and economic model.</li>
          <li><strong>Community:</strong> Strength and engagement of the community supporting the project.</li>
        </ul>
        
        <h4 class="text-md font-semibold mb-2">Technical Analysis</h4>
        <p class="mb-4">Studies price movements and trading volumes to identify patterns and predict future price movements:</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Chart Patterns:</strong> Recognizable patterns that may indicate future price movements.</li>
          <li><strong>Support & Resistance:</strong> Price levels where a cryptocurrency tends to stop and reverse direction.</li>
          <li><strong>Indicators:</strong> Mathematical calculations based on price and volume that help identify trends (e.g., Moving Averages, RSI, MACD).</li>
          <li><strong>Volume Analysis:</strong> Trading volume can confirm trends or signal potential reversals.</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Key Market Metrics to Monitor</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Market Capitalization:</strong> Total value of all coins in circulation (price × circulating supply).</li>
          <li><strong>Trading Volume:</strong> Amount of cryptocurrency traded in a given period.</li>
          <li><strong>Liquidity:</strong> How easily an asset can be bought or sold without affecting its price.</li>
          <li><strong>Volatility:</strong> Measure of price fluctuations over time.</li>
          <li><strong>Market Dominance:</strong> Percentage of total market cap held by a specific cryptocurrency.</li>
        </ul>
      `
    },
    {
      id: 'investing',
      title: 'Investment Strategies',
      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      content: `
        <h3 class="text-lg font-semibold mb-3">Cryptocurrency Investment Strategies</h3>
        <p class="mb-4">There are various approaches to investing in cryptocurrencies, each with different risk profiles and time horizons:</p>
        
        <h4 class="text-md font-semibold mb-2">HODL (Hold On for Dear Life)</h4>
        <p class="mb-4">A long-term investment strategy where investors buy and hold cryptocurrencies regardless of price fluctuations.</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Pros:</strong> Simple strategy, less time-consuming, potential for significant long-term gains.</li>
          <li><strong>Cons:</strong> Requires patience through market volatility, opportunity cost during bear markets.</li>
          <li><strong>Best for:</strong> Investors who believe in the long-term potential of specific cryptocurrencies.</li>
        </ul>
        
        <h4 class="text-md font-semibold mb-2">Dollar-Cost Averaging (DCA)</h4>
        <p class="mb-4">Investing a fixed amount at regular intervals, regardless of price.</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Pros:</strong> Reduces impact of volatility, removes emotional decision-making, disciplined approach.</li>
          <li><strong>Cons:</strong> May not maximize profits during bull markets, requires consistent investment.</li>
          <li><strong>Best for:</strong> Risk-averse investors or those with regular income to invest.</li>
        </ul>
        
        <h4 class="text-md font-semibold mb-2">Trading</h4>
        <p class="mb-4">Actively buying and selling cryptocurrencies to profit from price movements.</p>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Pros:</strong> Potential for profits in both bull and bear markets, can capitalize on short-term opportunities.</li>
          <li><strong>Cons:</strong> Time-intensive, requires technical knowledge, higher risk, tax implications.</li>
          <li><strong>Best for:</strong> Experienced investors with time to monitor markets and strong emotional discipline.</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Risk Management Principles</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Diversification:</strong> Spread investments across different cryptocurrencies to reduce risk.</li>
          <li><strong>Position Sizing:</strong> Only invest what you can afford to lose, typically 1-5% of your portfolio per position.</li>
          <li><strong>Stop-Loss Orders:</strong> Set predetermined exit points to limit potential losses.</li>
          <li><strong>Research:</strong> Always conduct thorough research before investing in any cryptocurrency.</li>
          <li><strong>Security:</strong> Use secure wallets and exchanges, enable two-factor authentication, and be vigilant about phishing attempts.</li>
        </ul>
      `
    },
    {
      id: 'technology',
      title: 'Blockchain Technology',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      content: `
        <h3 class="text-lg font-semibold mb-3">Understanding Blockchain Technology</h3>
        <p class="mb-4">Blockchain is the underlying technology that powers most cryptocurrencies. It's a distributed ledger that records transactions across a network of computers.</p>
        
        <h4 class="text-md font-semibold mb-2">How Blockchain Works</h4>
        <ol class="list-decimal pl-5 mb-4 space-y-2">
          <li><strong>Transaction Initiation:</strong> A user initiates a transaction (e.g., sending cryptocurrency to another user).</li>
          <li><strong>Transaction Verification:</strong> The transaction is broadcast to a network of computers (nodes) for verification.</li>
          <li><strong>Block Creation:</strong> Verified transactions are grouped into a block.</li>
          <li><strong>Block Validation:</strong> Nodes validate the block through a consensus mechanism.</li>
          <li><strong>Block Addition:</strong> The validated block is added to the existing blockchain, creating a permanent record.</li>
          <li><strong>Transaction Completion:</strong> The transaction is complete and visible to all network participants.</li>
        </ol>
        
        <h4 class="text-md font-semibold mb-2">Key Blockchain Concepts</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Decentralization:</strong> No single entity controls the entire network, making it resistant to censorship and single points of failure.</li>
          <li><strong>Immutability:</strong> Once data is recorded on the blockchain, it cannot be altered without consensus from the network.</li>
          <li><strong>Transparency:</strong> All transactions are visible to network participants, creating an auditable trail.</li>
          <li><strong>Consensus Mechanisms:</strong> Methods by which the network agrees on the state of the blockchain (e.g., Proof of Work, Proof of Stake).</li>
        </ul>
        
        <h4 class="text-md font-semibold mb-2">Types of Blockchains</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Public Blockchains:</strong> Open to anyone, fully decentralized (e.g., Bitcoin, Ethereum).</li>
          <li><strong>Private Blockchains:</strong> Access restricted to specific participants, often used by enterprises.</li>
          <li><strong>Consortium Blockchains:</strong> Controlled by a group of organizations rather than a single entity.</li>
          <li><strong>Hybrid Blockchains:</strong> Combine features of both public and private blockchains.</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Beyond Cryptocurrencies: Blockchain Applications</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Smart Contracts:</strong> Self-executing contracts with terms written in code.</li>
          <li><strong>Decentralized Finance (DeFi):</strong> Financial services without traditional intermediaries.</li>
          <li><strong>Supply Chain Management:</strong> Tracking products from origin to consumer.</li>
          <li><strong>Digital Identity:</strong> Secure and user-controlled identity verification.</li>
          <li><strong>Voting Systems:</strong> Transparent and tamper-resistant election processes.</li>
        </ul>
      `
    },
    {
      id: 'security',
      title: 'Security & Best Practices',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      content: `
        <h3 class="text-lg font-semibold mb-3">Cryptocurrency Security Essentials</h3>
        <p class="mb-4">Security is paramount in cryptocurrency. Unlike traditional banking, there's often no central authority to recover lost funds or reverse fraudulent transactions.</p>
        
        <h4 class="text-md font-semibold mb-2">Wallet Security</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Hardware Wallets:</strong> Physical devices that store private keys offline, offering the highest security (e.g., Ledger, Trezor).</li>
          <li><strong>Software Wallets:</strong> Applications on computers or smartphones that provide convenient access but with increased exposure to online threats.</li>
          <li><strong>Paper Wallets:</strong> Physical documents containing private keys, completely offline but vulnerable to physical damage.</li>
          <li><strong>Seed Phrases:</strong> Backup recovery phrases (typically 12-24 words) that should be stored securely offline in multiple locations.</li>
        </ul>
        
        <h4 class="text-md font-semibold mb-2">Exchange Security</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Two-Factor Authentication (2FA):</strong> Always enable 2FA, preferably using an authenticator app rather than SMS.</li>
          <li><strong>Withdrawal Whitelisting:</strong> Restrict withdrawals to pre-approved addresses only.</li>
          <li><strong>Regular Audits:</strong> Use exchanges that undergo regular security audits and have insurance policies.</li>
          <li><strong>"Not Your Keys, Not Your Coins":</strong> Consider moving significant holdings off exchanges to personal wallets.</li>
        </ul>
        
        <h4 class="text-md font-semibold mb-2">Common Threats & How to Avoid Them</h4>
        <ul class="list-disc pl-5 mb-4 space-y-2">
          <li><strong>Phishing:</strong> Verify website URLs, never click suspicious links, and check email sender addresses carefully.</li>
          <li><strong>Malware:</strong> Use reputable antivirus software, avoid downloading unknown files, and consider a dedicated device for crypto activities.</li>
          <li><strong>SIM Swapping:</strong> Use authentication apps instead of SMS for 2FA and consider a separate phone number for financial accounts.</li>
          <li><strong>Social Engineering:</strong> Be skeptical of unsolicited messages, never share private keys or seed phrases, and verify information through official channels.</li>
        </ul>
        
        <h3 class="text-lg font-semibold mb-3">Best Practices Checklist</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Research:</strong> Thoroughly investigate projects before investing.</li>
          <li><strong>Diversify:</strong> Don't put all your investments in a single cryptocurrency.</li>
          <li><strong>Secure Backups:</strong> Create multiple backups of wallet information stored in different physical locations.</li>
          <li><strong>Regular Updates:</strong> Keep all software, wallets, and security tools updated.</li>
          <li><strong>Test Transactions:</strong> Send small amounts first when using new addresses or services.</li>
          <li><strong>Tax Compliance:</strong> Keep detailed records of all transactions for tax purposes.</li>
          <li><strong>Privacy Awareness:</strong> Consider the public nature of blockchain transactions and take steps to protect your privacy when needed.</li>
        </ul>
      `
    }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Cryptocurrency Education Center</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Learn about cryptocurrencies, blockchain technology, and investment strategies
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="card sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Topics</h2>
            <nav className="space-y-1">
              {educationTopics.map((topic) => (
                <button
                  key={topic.id}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                    activeTab === topic.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(topic.id)}
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={topic.icon} />
                  </svg>
                  {topic.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4">
          <div className="card">
            {educationTopics.map((topic) => (
              <div
                key={topic.id}
                className={`${activeTab === topic.id ? 'block' : 'hidden'}`}
              >
                <h2 className="text-2xl font-bold mb-6">{topic.title}</h2>
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: topic.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education