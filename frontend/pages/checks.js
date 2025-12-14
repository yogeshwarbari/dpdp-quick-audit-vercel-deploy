// frontend/pages/checks.js

import Navbar from '../components/Navbar'

export default function ChecksPage() {
  const checks = [
    {
      id: 1,
      name: "Hardcoded Secrets",
      severity: "CRITICAL",
      weight: 25,
      description: "Passwords, API keys, tokens hardcoded in source code",
      fix: "Move to environment variables or .env file",
      color: "#dc2626"
    },
    {
      id: 2,
      name: "Missing Password Encryption",
      severity: "CRITICAL",
      weight: 25,
      description: "Passwords stored without bcrypt or similar hashing",
      fix: "Use bcrypt.hashpw() for password hashing",
      color: "#dc2626"
    },
    {
      id: 3,
      name: "No Data Retention Policy",
      severity: "HIGH",
      weight: 15,
      description: "Code lacks automated data deletion after retention period",
      fix: "Add expires_at field with auto-delete policy",
      color: "#ea580c"
    },
    {
      id: 4,
      name: "No Consent Tracking",
      severity: "HIGH",
      weight: 15,
      description: "User consent not tracked before data collection",
      fix: "Record UserConsent with timestamp and user_id",
      color: "#ea580c"
    },
    {
      id: 5,
      name: "Missing Audit Logging",
      severity: "HIGH",
      weight: 15,
      description: "Database operations not logged for audit trails",
      fix: "Create AuditLog entries for all data access",
      color: "#ea580c"
    },
    {
      id: 6,
      name: "Unencrypted Communication",
      severity: "HIGH",
      weight: 15,
      description: "HTTP used instead of HTTPS/TLS 1.2+",
      fix: "Enforce SSL/TLS on all endpoints",
      color: "#ea580c"
    },
    {
      id: 7,
      name: "Missing Input Validation",
      severity: "MEDIUM",
      weight: 8,
      description: "User inputs not validated against schemas",
      fix: "Use Pydantic schemas or validators",
      color: "#eab308"
    },
    {
      id: 8,
      name: "Sensitive Data in Logs",
      severity: "MEDIUM",
      weight: 8,
      description: "PII (email, password, SSN) logged without sanitization",
      fix: "Sanitize sensitive fields before logging",
      color: "#eab308"
    },
    {
      id: 9,
      name: "Missing Access Controls",
      severity: "MEDIUM",
      weight: 8,
      description: "API endpoints lack authentication/authorization",
      fix: "Add @require_auth decorator or middleware",
      color: "#eab308"
    },
    {
      id: 10,
      name: "Secrets Not in .gitignore",
      severity: "LOW",
      weight: 2,
      description: ".env and secret files not ignored in git",
      fix: "Add .env to .gitignore",
      color: "#3b82f6"
    },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          color: '#1f2937',
          marginBottom: '12px'
        }}>
          Compliance Checks
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px',
          marginBottom: '40px'
        }}>
          The 10 DPDP compliance rules with scoring details
        </p>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            padding: '16px',
            borderRadius: '6px',
            borderLeft: '3px solid #dc2626'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626', marginBottom: '4px' }}>
              2
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              CRITICAL (50 pts)
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            padding: '16px',
            borderRadius: '6px',
            borderLeft: '3px solid #ea580c'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ea580c', marginBottom: '4px' }}>
              4
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              HIGH (60 pts)
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            padding: '16px',
            borderRadius: '6px',
            borderLeft: '3px solid #eab308'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#eab308', marginBottom: '4px' }}>
              3
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              MEDIUM (24 pts)
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            padding: '16px',
            borderRadius: '6px',
            borderLeft: '3px solid #3b82f6'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>
              1
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              LOW (2 pts)
            </div>
          </div>
        </div>

        {/* Scoring Formula */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '40px'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            🧮 Scoring Formula
          </h2>
          <p style={{ color: '#4b5563', fontSize: '13px', marginBottom: '10px' }}>
            <strong>Base Score:</strong> 100 points
          </p>
          <p style={{ color: '#4b5563', fontSize: '13px', marginBottom: '10px' }}>
            <strong>Deductions:</strong>
          </p>
          <ul style={{ color: '#4b5563', fontSize: '13px', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>🔴 CRITICAL violation: -25 points</li>
            <li>🟠 HIGH violation: -15 points</li>
            <li>🟡 MEDIUM violation: -8 points</li>
            <li>🔵 LOW violation: -2 points</li>
          </ul>
          <p style={{ color: '#4b5563', fontSize: '13px', marginTop: '12px' }}>
            <strong>Final Score Range:</strong> 0-100 (100 = fully compliant)
          </p>
        </div>

        {/* All Checks */}
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#1f2937',
          marginBottom: '20px'
        }}>
          All Checks
        </h2>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
          {checks.map((check) => (
            <div
              key={check.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderLeft: `3px solid ${check.color}`,
                padding: '16px',
                borderRadius: '6px'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: '#1f2937',
                    marginBottom: '6px'
                  }}>
                    {check.id}. {check.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                      backgroundColor: check.color,
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {check.severity}
                    </span>
                    <span style={{
                      backgroundColor: '#f3f4f6',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#4b5563'
                    }}>
                      -{check.weight} pts
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ 
                color: '#6b7280', 
                marginBottom: '10px', 
                fontSize: '13px'
              }}>
                {check.description}
              </p>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '10px 12px',
                borderRadius: '4px',
                borderLeft: `3px solid ${check.color}`,
                fontSize: '13px'
              }}>
                <strong style={{ color: '#374151' }}>💡 Fix:</strong> <span style={{ color: '#6b7280' }}>{check.fix}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          padding: '16px',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '13px', 
            color: '#6b7280',
            margin: 0
          }}>
            💾 Each check is performed on real code fetched from your GitHub repository
          </p>
        </div>
      </div>
    </div>
  )
}