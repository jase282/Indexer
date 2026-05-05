{
  "manifest_version": 3,
  "name": "Indexer",
  "version": "0.1",
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["src/app.js"],
      "run_at": "document_end"
    }
  ]
}