module.exports = {
    ci: {
        upload: {
            target: 'temporary-public-storage',
        },
        preset: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'categories:performance': [ 'error', { minScore: 0.9, aggregationMethod: 'median-run'}],
                'categories:accessibility': [ 'error', { minScore: 0.93, aggregationMethod: 'pessimistic' }],
                'categories:best-practices': [ 'error', { minScore: 0.9, aggregationMethod: 'median-run' }],
                'categories:seo': [ 'error', {minScore: 0.95, aggregationMethod: 'pessimistic' }],
            },
        },
    },
};