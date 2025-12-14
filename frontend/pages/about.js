// frontend/pages/about.js

import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          color: '#1f2937',
          marginBottom: '12px'
        }}>
          About
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px',
          marginBottom: '40px'
        }}>
          DPDP Compliance Scanner
        </p>

        {/* What is it */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            What is DPDP Scanner?
          </h2>
          <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
            An automated compliance tool that analyzes GitHub repositories for violations of India's Digital Personal Data Protection Act, 2023. Paste a repository URL to get a compliance score (0-100) with actionable remediation steps.
          </p>
        </section>

        {/* How it works */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            How it works
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>1️⃣</div>
              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Fetch</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Retrieves code files from GitHub
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>2️⃣</div>
              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Analyze</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Scans against 10 compliance rules
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>3️⃣</div>
              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Score</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Calculates compliance score (0-100)
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>4️⃣</div>
              <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Report</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Shows violations with fixes
              </div>
            </div>
          </div>
        </section>

        {/* What it checks */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Compliance checks
          </h2>
          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '12px' }}>
            Scans for 10 critical DPDP violations:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}>
            {[
              { emoji: '🔴', name: 'Hardcoded Secrets' },
              { emoji: '🔴', name: 'Missing Encryption' },
              { emoji: '🟠', name: 'No Retention Policy' },
              { emoji: '🟠', name: 'No Consent Tracking' },
              { emoji: '🟠', name: 'Missing Audit Logs' },
              { emoji: '🟠', name: 'Unencrypted Comms' },
              { emoji: '🟡', name: 'No Input Validation' },
              { emoji: '🟡', name: 'Data in Logs' },
              { emoji: '🟡', name: 'Missing Access Control' },
              { emoji: '🔵', name: 'Secrets in Git' },
            ].map((check, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                fontSize: '13px',
                color: '#4b5563'
              }}>
                {check.emoji} {check.name}
              </div>
            ))}
          </div>
        </section>

        {/* DPDP Act */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            About DPDP Act 2023
          </h2>
          <p style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>
            India's Digital Personal Data Protection Act governs data protection, user consent, data retention, and user rights. This scanner helps developers ensure their code complies with these requirements.
          </p>
        </section>

        {/* Tech Stack */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Built with
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {[
              { name: 'Frontend', tech: 'Next.js + React' },
              { name: 'Backend', tech: 'FastAPI + Python' },
              { name: 'Deployment', tech: 'Vercel' },
              { name: 'Scanning', tech: 'Regex Analysis' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '14px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937', marginBottom: '4px' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {item.tech}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Disclaimer */}
        <section style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fcd34d',
          padding: '16px',
          borderRadius: '6px'
        }}>
          <p style={{ 
            fontSize: '13px', 
            color: '#92400e',
            margin: 0,
            lineHeight: '1.6'
          }}>
            <strong>⚠️ Disclaimer:</strong> This tool provides automated scanning and should not be considered a complete compliance audit. For comprehensive DPDP compliance, consult with legal and security professionals.
          </p>
        </section>
      </div>
    </div>
  )
}