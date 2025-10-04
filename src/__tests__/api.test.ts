describe('MSW API', () => {
  it('returns categories from mocked /api/categories', async () => {
    const res = await fetch('http://localhost/api/categories');
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(Array.isArray(data.categories)).toBe(true);
    expect(data.categories.length).toBeGreaterThan(0);
  });
});
