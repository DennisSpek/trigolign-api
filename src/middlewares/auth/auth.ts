export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const providedApiKey = req.headers['api-key'] || req.query['api_key'];
  if (providedApiKey && providedApiKey === apiKey) {
    next();
  } else {
    res.status(401).send({ error: 'Invalid API key' });
  }
}