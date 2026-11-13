const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 24;

/**
 * Reads ?page=&limit= from the query string.
 * page starts at 1; limit defaults to 6 and is capped at 24.
 */
exports.getPagination = (query = {}) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT)
  );
  return { page, limit, offset: (page - 1) * limit };
};

/** Builds the pagination block sent alongside the items. */
exports.pageMeta = (total, page, limit) => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});
