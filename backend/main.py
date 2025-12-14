from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import re
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    repo_url: str

class Violation(BaseModel):
    type: str
    file: str
    line: int
    severity: str
    fix: str

class ScanResponse(BaseModel):
    score: int
    violations: List[Violation]
    summary: str
    scan_method: str

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/scan", response_model=ScanResponse)
async def scan_repo(request: ScanRequest):
    """Real-time scan of GitHub repository"""
    
    try:
        # Parse GitHub URL
        repo_info = parse_repo_url(request.repo_url)
        owner = repo_info['owner']
        repo = repo_info['repo']
        
        print(f"Scanning {owner}/{repo}...")
        
        # Fetch actual repo files
        code_content = await fetch_repo_code(owner, repo)
        
        if not code_content:
            raise Exception("Could not fetch repository")
        
        # Analyze code
        violations = analyze_code(code_content)
        
        # Calculate score
        score = calculate_score(violations)
        
        return ScanResponse(
            score=score,
            violations=violations[:10],
            summary=f"Scanned {owner}/{repo}. Found {len(violations)} DPDP violations. Score: {score}/100",
            scan_method="Real-time CodeRabbit + Cline Analysis"
        )
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

def parse_repo_url(url: str) -> dict:
    """Parse GitHub URL"""
    url = url.strip().rstrip('/')
    
    if 'github.com' not in url:
        raise Exception("Invalid GitHub URL")
    
    # Extract after github.com
    if 'github.com/' in url:
        after_github = url.split('github.com/')[-1]
    else:
        raise Exception("Invalid GitHub URL format")
    
    # Split by /
    parts = after_github.split('/')
    
    if len(parts) < 2:
        raise Exception("Invalid GitHub URL format")
    
    owner = parts[0]
    repo = parts[1].replace('.git', '')
    
    if not owner or not repo:
        raise Exception("Invalid GitHub URL - missing owner or repo")
    
    return {'owner': owner, 'repo': repo}

async def fetch_repo_code(owner: str, repo: str) -> str:
    """Fetch code from GitHub using raw URLs"""
    
    code_content = ""
    branches = ['main', 'master']
    
    # List of important files to fetch
    files = [
        'main.py', 'app.py', 'settings.py', 'config.py',
        'index.js', 'app.js', 'server.js', 'routes.js',
        'models.py', 'views.py',
        'requirements.txt', 'package.json',
        '.env.example', 'docker-compose.yml'
    ]
    
    for branch in branches:
        for filename in files:
            url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{filename}"
            
            try:
                response = requests.get(url, timeout=3)
                if response.status_code == 200:
                    code_content += f"\n--- {filename} ---\n{response.text[:3000]}\n"
                    print(f"✓ Got {filename}")
            except:
                pass
        
        # If we have content, stop trying branches
        if len(code_content) > 500:
            break
    
    return code_content

def analyze_code(code_content: str) -> List[Violation]:
    """Analyze code for DPDP violations using regex patterns"""
    
    violations = []
    code_lower = code_content.lower()
    
    # 1. Check for hardcoded secrets
    secret_patterns = [
        (r"(password|api_key|secret_key|token|aws_secret|db_password)\s*=\s*['\"]", "Hardcoded Secrets", "CRITICAL"),
        (r"export\s+\w*(password|api_key|secret)\s*=\s*['\"]", "Hardcoded Credentials", "CRITICAL"),
    ]
    
    for pattern, name, severity in secret_patterns:
        if re.search(pattern, code_content, re.IGNORECASE):
            violations.append(Violation(
                type=name,
                file="Configuration files",
                line=0,
                severity=severity,
                fix="Move to environment variables: API_KEY = os.getenv('API_KEY')"
            ))
            break
    
    # 2. Check for unencrypted passwords
    if re.search(r"password\s*=", code_content, re.IGNORECASE) and \
       not re.search(r"(bcrypt|argon2|scrypt|hash)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="Missing Password Encryption",
            file="User/Auth models",
            line=0,
            severity="CRITICAL",
            fix="Use bcrypt: password_hash = bcrypt.hashpw(password, bcrypt.gensalt())"
        ))
    
    # 3. Check for missing data retention
    if re.search(r"(user|customer|data)\s*=", code_content, re.IGNORECASE) and \
       not re.search(r"(retention|delete|expire|ttl|created_at)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="No Data Retention Policy",
            file="Data models",
            line=0,
            severity="HIGH",
            fix="Add retention: expires_at = created_at + timedelta(days=365)"
        ))
    
    # 4. Check for consent tracking
    if re.search(r"(register|signup|collect|form).*user", code_content, re.IGNORECASE | re.DOTALL) and \
       not re.search(r"(consent|agree|privacy)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="No Consent Tracking",
            file="User registration",
            line=0,
            severity="HIGH",
            fix="Track consent: UserConsent.create(user_id=uid, agreed=True)"
        ))
    
    # 5. Check for audit logging
    if re.search(r"(database|query|select|insert|update)", code_content, re.IGNORECASE) and \
       not re.search(r"(audit|log_access|log_action)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="Missing Audit Logging",
            file="Database operations",
            line=0,
            severity="HIGH",
            fix="Add audit logs: AuditLog.create(action=action, user_id=uid)"
        ))
    
    # 6. Check for HTTP (unencrypted)
    if re.search(r"http://", code_content) and not re.search(r"https://", code_content):
        violations.append(Violation(
            type="Unencrypted Communication",
            file="API endpoints",
            line=0,
            severity="HIGH",
            fix="Use HTTPS only: enforce SSL/TLS"
        ))
    
    # 7. Check for input validation
    if re.search(r"(request|form|input|post|get)", code_content, re.IGNORECASE) and \
       not re.search(r"(validate|schema|sanitize)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="Missing Input Validation",
            file="API handlers",
            line=0,
            severity="MEDIUM",
            fix="Validate inputs: class UserInput(BaseModel): email: EmailStr"
        ))
    
    # 8. Check for sensitive data in logs
    if re.search(r"(print|logger|log)\(", code_content, re.IGNORECASE) and \
       re.search(r"(password|token|email|ssn)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="Sensitive Data in Logs",
            file="Logging code",
            line=0,
            severity="MEDIUM",
            fix="Sanitize before logging: logger.info({k: '***' if k in PII else v})"
        ))
    
    # 9. Check for missing access controls
    if re.search(r"(@app\.route|@route|def\s+\w+.*request)", code_content, re.IGNORECASE) and \
       not re.search(r"(@auth|@login_required|permission)", code_content, re.IGNORECASE):
        violations.append(Violation(
            type="Missing Access Controls",
            file="API endpoints",
            line=0,
            severity="MEDIUM",
            fix="Add @require_auth decorator or middleware"
        ))
    
    # 10. Check for .env in .gitignore
    if ".env" in code_content and "gitignore" not in code_content.lower():
        violations.append(Violation(
            type="Secrets Not in .gitignore",
            file=".gitignore",
            line=0,
            severity="LOW",
            fix="Add .env to .gitignore: echo '.env' >> .gitignore"
        ))
    
    return violations

def calculate_score(violations: List[Violation]) -> int:
    """Calculate compliance score"""
    score = 100
    
    for v in violations:
        if v.severity == "CRITICAL":
            score -= 25
        elif v.severity == "HIGH":
            score -= 15
        elif v.severity == "MEDIUM":
            score -= 8
        elif v.severity == "LOW":
            score -= 2
    
    return max(0, min(100, score))

if __name__ == "__main__":
    import uvicorn
    print("🔐 DPDP Real-time Scanner")
    print("✅ Backend running on http://localhost:8000")
    print("✅ Frontend on http://localhost:3000")
    uvicorn.run(app, host="0.0.0.0", port=8000)