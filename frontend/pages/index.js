// frontend/pages/index.js

import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Home() {
  const [repoUrl, setRepoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleScan = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl })
      })
      
      if (!response.ok) {
        throw new Error('Could not scan repository. Make sure it is public.')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setError('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    if (score >= 40) return '#ef4444'
    return '#991b1b'
  }

  const severityColor = (severity) => {
    switch(severity.toUpperCase()) {
      case 'CRITICAL': return '#dc2626'
      case 'HIGH': return '#ea580c'
      case 'MEDIUM': return '#eab308'
      default: return '#3b82f6'
    }
  }

  const severityEmoji = (severity) => {
    switch(severity.toUpperCase()) {
      case 'CRITICAL': return '🔴'
      case 'HIGH': return '🟠'
      case 'MEDIUM': return '🟡'
      default: return '🔵'
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: '#1f2937',
            marginBottom: '12px' 
          }}>
            DPDP Compliance Scanner
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px',
            marginBottom: '5px'
          }}>
            Scan GitHub repositories for data protection violations
          </p>
        </div>

        {/* Requirements Box */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          padding: '16px',
          borderRadius: '6px',
          marginBottom: '30px'
        }}>
          <p style={{ 
            color: '#1e40af', 
            fontSize: '13px',
            margin: 0,
            lineHeight: '1.6'
          }}>
            <strong>📌 Important:</strong> Repository must be <strong>PUBLIC</strong> for scanning. Private repositories cannot be accessed.
          </p>
        </div>

        {/* Scan Form */}
        <form onSubmit={handleScan} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="https://github.com/owner/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontFamily: 'monospace',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: loading ? '#d1d5db' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
            >
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
            Example: https://github.com/yogeshwarbari/dpdp-quick-audit
          </p>
        </form>

        {/* Supported Project Types */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Supported Project Types
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px'
          }}>
            {[
              { emoji: '🐍', name: 'Python Projects', desc: 'Flask, Django, FastAPI' },
              { emoji: '⚙️', name: 'Node.js Projects', desc: 'Express, Next.js' },
              { emoji: '📱', name: 'Full Stack Apps', desc: 'React, Vue, Angular' },
              { emoji: '☁️', name: 'Cloud Apps', desc: 'AWS, GCP, Azure' },
              { emoji: '🗄️', name: 'Data Applications', desc: 'Databases, APIs' },
              { emoji: '🔐', name: 'Any Web Project', desc: 'With user data' },
            ].map((type, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                padding: '12px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>
                  {type.emoji}
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>
                  {type.name}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#6b7280'
                }}>
                  {type.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '13px'
          }}>
            ⚠️ {error}
            <p style={{ fontSize: '12px', marginTop: '8px', color: '#dc2626' }}>
              💡 Tip: Make sure the repository is <strong>PUBLIC</strong> and the URL is correct.
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Score Card */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '30px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '64px',
                fontWeight: '700',
                color: scoreColor(result.score),
                marginBottom: '8px'
              }}>
                {result.score}
              </div>
              <div style={{ 
                fontSize: '16px', 
                color: '#6b7280',
                marginBottom: '8px'
              }}>
                Compliance Score
              </div>
              <div style={{
                display: 'inline-block',
                backgroundColor: scoreColor(result.score) + '15',
                color: scoreColor(result.score),
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                {result.score >= 80 ? '✅ Compliant' : 
                 result.score >= 60 ? '⚠️ Mostly Compliant' : 
                 result.score >= 40 ? '🔶 Needs Work' :
                 '❌ Non-Compliant'}
              </div>
            </div>

            {/* Summary */}
            <p style={{ 
              color: '#4b5563', 
              fontSize: '14px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              {result.summary}
            </p>

            {/* Violations List */}
            {result.violations.length > 0 && (
              <div>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#1f2937'
                }}>
                  Found {result.violations.length} Violation{result.violations.length !== 1 ? 's' : ''}
                </h2>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                  {result.violations.map((v, i) => (
                    <div key={i} style={{
                      backgroundColor: 'white',
                      padding: '16px',
                      borderRadius: '6px',
                      borderLeft: `3px solid ${severityColor(v.severity)}`,
                      border: `1px solid #e5e7eb`,
                      borderLeft: `3px solid ${severityColor(v.severity)}`
                    }}>
                      <div style={{ 
                        fontWeight: '600', 
                        marginBottom: '6px',
                        fontSize: '14px',
                        color: '#1f2937'
                      }}>
                        {severityEmoji(v.severity)} {v.type}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#6b7280',
                        marginBottom: '8px'
                      }}>
                        {v.file} {v.line > 0 ? `(Line ${v.line})` : ''}
                      </div>
                      <div style={{
                        backgroundColor: '#f9fafb',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        color: '#374151'
                      }}>
                        <strong>Fix:</strong> {v.fix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.violations.length === 0 && (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #86efac',
                padding: '20px',
                borderRadius: '6px',
                textAlign: 'center',
                color: '#166534'
              }}>
                ✅ No violations found! Repository appears compliant.
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '60px 40px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
              Enter a public GitHub repository URL above to scan
            </p>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>
              The scanner will analyze the code and provide a DPDP compliance score
            </p>
          </div>
        )}
      </div>
    </div>
  )
}