## Roadmap

What we're looking to do to improve the backend.

1. Add a CVE cross-reference engine that generates a search query from the diff and searches the database of CVEs for CVEs in code with similar functionality.
2. Auto-redact passwords and API key from LLM prompting.
3. Add supply chain analysis by generating CPEs for diff dependencies and directly querying for vulnerabilities in those versions of the software.
4. PromptGuard, automatically redact common prompt injection vectors from user API calls.