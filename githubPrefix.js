var prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const isGithubActions = process.env.GITHUB_ACTIONS || false;

if(isGithubActions)
{
    prefix = 'portfolio';
}

export { prefix };