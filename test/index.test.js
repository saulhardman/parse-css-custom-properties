const { default: async, sync } = require('../');

describe('async', () => {
  it('works', async () => {
    const result = await async(['test/fixtures/example.css']);

    expect(result).toStrictEqual({
      '--example-custom-property': '2rem',
    });
  });

  it('works with multiple patterns and files', async () => {
    const result = await async([
      'test/fixtures/example.css',
      'test/fixtures/settings/settings.*.css',
    ]);

    expect(result).toStrictEqual({
      '--example-custom-property': '2rem',
      '--baseline-font-size': '16px',
      '--color-black': 'rgb(0, 0, 0)',
      '--color-white': 'rgb(255, 255, 255)',
      '--font-size-0': '12px',
      '--font-size-1': '14px',
      '--font-size-2': '16px',
      '--font-size-3': '18px',
      '--font-size-4': '20px',
      '--font-size-5': '24px',
      '--font-size-6': '32px',
      '--spacing-0': '0',
      '--spacing-1': '2px',
      '--spacing-2': '4px',
      '--spacing-3': '8px',
      '--spacing-4': '12px',
      '--spacing-5': '16px',
      '--spacing-6': '20px',
      '--spacing-7': '24px',
      '--spacing-8': '32px',
    });
  });

  it('returns an empty object when no args are passed', async () => {
    const result = await async();

    expect(result).toEqual({});
  });

  it('throws when args of the wrong type passed', async () => {
    await Promise.all([
      expect(async({ some: 'object' })).rejects.toThrow(),
      expect(async(null)).rejects.toThrow(),
    ]);
  });
});

describe('sync', () => {
  it('works', () => {
    const result = sync(['test/fixtures/example.css']);

    expect(result).toStrictEqual({
      '--example-custom-property': '2rem',
    });
  });

  it('works with multiple patterns and files', () => {
    const result = sync([
      'test/fixtures/example.css',
      'test/fixtures/settings/settings.*.css',
    ]);

    expect(result).toStrictEqual({
      '--example-custom-property': '2rem',
      '--baseline-font-size': '16px',
      '--color-black': 'rgb(0, 0, 0)',
      '--color-white': 'rgb(255, 255, 255)',
      '--font-size-0': '12px',
      '--font-size-1': '14px',
      '--font-size-2': '16px',
      '--font-size-3': '18px',
      '--font-size-4': '20px',
      '--font-size-5': '24px',
      '--font-size-6': '32px',
      '--spacing-0': '0',
      '--spacing-1': '2px',
      '--spacing-2': '4px',
      '--spacing-3': '8px',
      '--spacing-4': '12px',
      '--spacing-5': '16px',
      '--spacing-6': '20px',
      '--spacing-7': '24px',
      '--spacing-8': '32px',
    });
  });

  it('returns an empty object when no args are passed', () => {
    const result = sync();

    expect(result).toEqual({});
  });

  it('throws when args of the wrong type passed', () => {
    expect(() => sync({ some: 'object' })).toThrow();

    expect(() => sync(null)).toThrow();
  });
});
