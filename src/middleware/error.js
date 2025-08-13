export function errorHandler(err, req, res, next) {
  if (err?.name === 'ZodError') {
    return res.status(400).json({ success: false, error: 'VALIDATION_ERROR', details: err.errors });
  }
  if (err?.message === 'NOT_FOUND') {
    return res.status(404).json({ success: false, error: 'NOT_FOUND' });
  }
  console.error(err);
  return res.status(500).json({ success: false, error: 'INTERNAL_ERROR' });
}
