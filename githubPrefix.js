var prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const isGithubActions = process.env.GITHUB_ACTIONS || false

if (isGithubActions) {
    prefix = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
}

export { prefix };